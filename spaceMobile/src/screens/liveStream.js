import React , {useState}from 'react';
import AgoraUIKit from  'agora-rn-uikit'; 
import { Dimensions ,StyleSheet } from 'react-native';
import { UserMuteRemoteAudio } from 'agora-rn-uikit/src/Reducer';

const dimensions={
  width:Dimensions.get('window').width,
  height:Dimensions.get('window').height,
}
function LiveStreamScreen(){
  const [live , setLive] =useState(true);

  const rtcProps={
   
    channel:'test',
  }
  const callback={
    onEndLive:()=> setLive(false)
  };
 const customBtnStyle ={
  borderRadius:23,
  borderWidth:4 * StyleSheet.hairlineWidth,
  borderColor:"#007aff",
  backgroundColor:'#111',
  marginfHorizantal :8 * StyleSheet.hairlineWidth,
 };
 const backgroundColor={
  backgroundColor:'#111'
 }

 const styleProps={
  minViewStyles :{
    width:200,
    height:150
  },
  maxViewStyle:{
    height:dimensions.height - 20 ,
  },
  localControlStyles:{
    bottom:0,
    height:100,
    backgroundColor:'#111',

  },
  minCloseBtnStyles:{
   width:34,
   height:34,
   borderRadius:17,
   position:'absolute',
   backgroundColor:'#111',
   borderWidth:4* StyleSheet.hairlineWidth,
   borderColor:'#007aff',
  },
  BtnStyles:CustomBtnSyle,
  remoteBtnStyle:{
    muteRemoteAudio:customBtnStyle,
    muteRemoteVideo:customBtnStyle,
    remoteSwap:customBtnStyle,

  },
  loaclBtnStyles:{
    muteLocalAudio:backgroundColor,
    muteLocalVideo:backgroundColor,
    switchCmera:backgroundColor,
    endCall:backgroundColor,
    fullScreen:backgroundColor,
  },
  theme:'#fff',
 }

  return live ?<AgoraUIKit rtcProps={rtcProps}  callback={callback} styleProps={styleProps} /> : <></>
}

export default LiveStreamScreen;