import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet, Alert} from 'react-native';
import {
  RTCView,
  mediaDevices,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
import {PERMISSIONS, request} from 'react-native-permissions';

const pcConfig = {
  iceServers: [
    {urls: 'stun:stun.l.google.com:19302'}, 
    {
      urls: 'turn:turnserver.example.org', 
      username: 'user',
      credential: 'password',
    },
  ],
};

const LiveStreamScreen = () => {
  const [stream, setStream] = useState(null); 
  const [peerConnection, setPeerConnection] = useState(null); 
  const [remoteStream, setRemoteStream] = useState(null); 

  const requestPermissions = async () => {
    try {
      const cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA); 
      const micPermission = await request(PERMISSIONS.ANDROID.RECORD_AUDIO); 

      console.log('Camera Permission:', cameraPermission);
      console.log('Microphone Permission:', micPermission);

      if (cameraPermission !== 'granted' || micPermission !== 'granted') {
        Alert.alert(
          'Permissions not granted',
          'Camera and Microphone permissions are required to start live streaming.',
        );
        return false;
      } else {
        console.log('Permissions granted');
        return true;
      }
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  };

  useEffect(() => {
    const initializeWebRTC = async () => {
      const permissionsGranted = await requestPermissions();
      if (!permissionsGranted) {
        console.log('Permissions were not granted. WebRTC setup aborted.');
        return;
      }

      try {
        const pc = new RTCPeerConnection(pcConfig);
        setPeerConnection(pc);

        console.log('WebRTC PeerConnection created:', pc);

        pc.ontrack = event => {
          console.log('Received remote stream');
          if (event.streams && event.streams[0]) {
            setRemoteStream(event.streams[0]); 
          }
        };

        pc.onicecandidate = event => {
          if (event.candidate) {
            console.log('ICE candidate:', event.candidate);
          
          }
        };
      } catch (error) {
        console.error('Error initializing WebRTC peer connection:', error);
      }
    };

    initializeWebRTC();

    return () => {
 
      if (peerConnection) {
        peerConnection.close();
        console.log('PeerConnection closed');
      }
    };
  }, []);

 
  const startLiveStream = async () => {
    try {
      const constraints = {
        audio: true,
        video: {
          width: {ideal: 640},
          height: {ideal: 480},
          facingMode: 'user', 
        },
      };

      console.log('Requesting media stream with constraints:', constraints);

     
      const localStream = await mediaDevices.getUserMedia(constraints);
      console.log('Local stream obtained:', localStream);

      setStream(localStream); 

      
      localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
      });

      console.log('Local tracks added to peer connection');

  
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      console.log('Offer created and set:', offer);
      console.log('Offer sent to signaling server');
    } catch (error) {
      console.error('Error starting live stream:', error);
      Alert.alert('Error', 'Could not start live stream: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
     
      {stream && <RTCView streamURL={stream.toURL()} style={styles.stream} />}


      {remoteStream && (
        <RTCView streamURL={remoteStream.toURL()} style={styles.stream} />
      )}

      <Button title="Start Live Stream" onPress={startLiveStream} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stream: {
    width: '100%',
    height: '70%',
  },
});

export default LiveStreamScreen;
