import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera"; // Correct import from expo-camera
import { Video } from "expo-av";

const EventDetailsScreen = ({ route, navigation }) => {
  const { eventName, eventDescription } = route.params || {}; // Ternary for safe access to route.params
  const [hasPermission, setHasPermission] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);
  const [videoUri, setVideoUri] = useState(null);

  // Request Camera Permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Start live streaming (or recording) function
  const startLive = async () => {
    setIsLive(true);
    if (cameraRef.current && !isRecording) {
      setIsRecording(true);
      const video = await cameraRef.current.recordAsync();
      setVideoUri(video.uri);
      setIsRecording(false);
      setIsLive(false);
    }
  };

  const stopLive = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsLive(false);
      setIsRecording(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cameraRef.current && isRecording) {
        cameraRef.current.stopRecording();
      }
    };
  }, [isRecording]);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {eventName ? eventName : "Event Name Not Available"}{" "}
        {/* Ternary for eventName */}
      </Text>

      <View style={styles.rectangle}>
        <Text style={styles.description}>
          {eventDescription ? eventDescription : "Description Not Available"}{" "}
          {/* Ternary for eventDescription */}
        </Text>
      </View>

      {isLive ? (
        <>
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.front}
            ref={cameraRef}
          />
          <TouchableOpacity style={styles.goLiveButton} onPress={stopLive}>
            <Text style={styles.goLiveText}>Stop Live</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.goLiveButton} onPress={startLive}>
          <Text style={styles.goLiveText}>Go live</Text>
        </TouchableOpacity>
      )}

      {/* Show the recorded video */}
      {videoUri ? (
        <Video
          source={{ uri: videoUri }}
          style={{ width: 300, height: 300 }}
          useNativeControls
          resizeMode="contain"
        />
      ) : (
        <Text>No video recorded</Text> // Ternary for videoUri
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  rectangle: {
    backgroundColor: "#2C2C2C",
    width: "100%",
    height: 150,
    borderRadius: 15,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    color: "#fff",
    fontSize: 16,
    padding: 10,
    textAlign: "center",
  },
  goLiveButton: {
    backgroundColor: "#61dbfb",
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  goLiveText: {
    color: "#fff",
    fontSize: 18,
  },
  camera: {
    width: "100%",
    height: 300,
    borderRadius: 15,
  },
});

export default EventDetailsScreen;
