import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { getCsrfToken } from './csrf';
const CameraScan = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraPress = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      const photo = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!photo.cancelled) {
        setSelectedPhoto(photo.uri);
      }
    }
  };
  const imageToBase64 = async (photoUri) => {
    const response = await fetch(photoUri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(',')[1]); // Get only the base64 data without the data:image/jpeg;base64 prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  const handleSendToApi = async () => {
    if (!selectedPhoto) return;
    const csrfToken = await getCsrfToken();

    if (!csrfToken) {
      console.error('CSRF token not available.');
      return;
    }
    const base64Image = await imageToBase64(selectedPhoto);

    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint to which you want to send the photo
    const formData = new FormData();
    formData.append('image', {
      uri: selectedPhoto,
      type: 'image/jpeg', // Modify according to the image type captured
      name: 'photo.jpg', // Provide a filename for the image
    });

    const apiUrl = '  https://a370-2401-4900-54eb-4fca-11f2-58bc-486d-36a7.ngrok-free.app/upload_image';

    
      // Prepare the photo to be sent to the API (optional)
      // You may want to resize or compress the image before sending it.

      // Prepare the FormData object to send the photo as a multipart form data

      // Send the photo to the API using Axios or any other networking library of your choice
      try {
        axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
        const response = await axios.post(apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrfToken,
          },
        });
      // Handle the API response here (if needed)
      console.log('API Response:', response.data);
    } catch (error) {
      // Handle error in API request
      console.error('Error sending photo to API:', error);
    }
}
  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {selectedPhoto && (
        <Image
          source={{ uri: selectedPhoto }}
          style={styles.image}
        />
      )}

      <TouchableOpacity onPress={handleCameraPress} style={styles.button}>
        <Button title="Take Photo" onPress={handleCameraPress} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSendToApi} style={styles.button}>
        <Button
          title="Send to API"
          onPress={handleSendToApi}
          disabled={!selectedPhoto}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CameraScan;
