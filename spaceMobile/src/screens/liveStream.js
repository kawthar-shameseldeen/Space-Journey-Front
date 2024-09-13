import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const LiveStreamScreen = () => {
  const [imageUri, setImageUri] = useState(null);

  const openCameraLib = async () => {
    // Request camera permission from the user
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Camera access is required to take photos.');
      return;
    }

    // Launch the camera
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      // Set the image URI if the user took a picture
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Open Camera" onPress={openCameraLib} />
      
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

export default LiveStreamScreen;
