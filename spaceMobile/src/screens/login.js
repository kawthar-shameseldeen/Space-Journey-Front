import React, { Component } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import RtcEngine, { RtcLocalView, RtcRemoteView, VideoRenderMode } from 'react-native-agora';
import requestCameraAndAudioPermission from '../components/permission';
import styles from '../components/style.js';

const appId = '5d738bf6b7934aeda2aa620986395bda'; // Replace with your Agora App ID
const channelName = 'sapcelive'; // Replace with your Agora channel name

export default class Livestream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joinSucceed: false,
      peerIds: [],
    };

    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission().then(() => {
        console.log('Requested!');
      });
    }
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    try {
      this._engine = await RtcEngine.create(appId);
      await this._engine.enableVideo();

      this._engine.addListener('Warning', (warn) => {
        console.log('Warning', warn);
      });

      this._engine.addListener('Error', (err) => {
        console.log('Error', err);
      });

      this._engine.addListener('UserJoined', (uid) => {
        console.log('UserJoined', uid);
        const { peerIds } = this.state;
        if (peerIds.indexOf(uid) === -1) {
          this.setState({
            peerIds: [...peerIds, uid],
          });
        }
      });

      this._engine.addListener('UserOffline', (uid) => {
        console.log('UserOffline', uid);
        const { peerIds } = this.state;
        this.setState({
          peerIds: peerIds.filter((id) => id !== uid),
        });
      });

      this._engine.addListener('JoinChannelSuccess', (channel, uid) => {
        console.log('JoinChannelSuccess', channel, uid);
        this.setState({
          joinSucceed: true,
        });
      });
    } catch (error) {
      console.error('Error initializing Agora: ', error);
    }
  };

  startCall = async () => {
    try {
      console.log('Starting call...');
      await this._engine.joinChannel(null, channelName, null, 0);
    } catch (error) {
      console.error('Error joining the channel: ', error);
    }
  };

  endCall = async () => {
    try {
      console.log('Ending call...');
      await this._engine.leaveChannel();
      this.setState({ peerIds: [], joinSucceed: false });
    } catch (error) {
      console.error('Error leaving the channel: ', error);
    }
  };

  render() {
    return (
      <View style={styles.max}>
        <Text style={styles.roleText}>You are live in the stream</Text>
        <View style={styles.buttonHolder}>
          <TouchableOpacity onPress={this.startCall} style={styles.button}>
            <Text style={styles.buttonText}> Start Call </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.endCall} style={styles.button}>
            <Text style={styles.buttonText}> End Call </Text>
          </TouchableOpacity>
        </View>
        {this._renderVideos()}
      </View>
    );
  }

  _renderVideos = () => {
    const { joinSucceed } = this.state;
    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView style={styles.max} channelId={channelName} renderMode={VideoRenderMode.Hidden} />
        {this._renderRemoteVideos()}
      </View>
    ) : null;
  };

  _renderRemoteVideos = () => {
    const { peerIds } = this.state;
    return (
      <ScrollView style={styles.remoteContainer} contentContainerStyle={styles.remoteContainerContent} horizontal>
        {peerIds.map((value) => (
          <RtcRemoteView.SurfaceView key={value} style={styles.remote} uid={value} channelId={channelName} renderMode={VideoRenderMode.Hidden} />
        ))}
      </ScrollView>
    );
  };
}
