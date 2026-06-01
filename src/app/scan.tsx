import { useState } from 'react';
import {
  View,
  Button,
  Image,
  Text,
  ScrollView,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export default function ScanScreen() {
  const [image, setImage] = useState<string | null>(null);

  async function takePhoto() {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      alert('Camera permission required');
      return;
    }

    const result =
      await ImagePicker.launchCameraAsync({
        quality: 1,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        Scan Sheet Music
      </Text>

      <Button
        title="Take Photo"
        onPress={takePhoto}
      />

      {image && (
        <>
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
            }}
          >
            Captured Image
          </Text>

          <Image
            source={{ uri: image }}
            style={{
              width: 300,
              height: 450,
              marginTop: 20,
            }}
            resizeMode="contain"
          />
        </>
      )}
    </ScrollView>
  );
}