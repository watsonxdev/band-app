import { useState } from 'react';
import {
  View,
  Button,
  Image,
  Text,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { saveScan } from '../services/storage';
import { router } from 'expo-router';

export default function ScanScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [instrument, setInstrument] = useState('');

  async function takePhoto() {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Camera permission required');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }
  async function handleSave() {
  console.log("SAVE CLICKED");

  if (!image) return;

  await saveScan({
    id: Date.now().toString(),
    title,
    instrument,
    image: image!,
  });

  console.log("SAVED");

  // 🔥 THIS IS THE FIX
  router.replace('/library');
}

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>
        Scan Sheet Music
      </Text>

      <TextInput
        placeholder="Piece Title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          width: '100%',
          padding: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Instrument"
        value={instrument}
        onChangeText={setInstrument}
        style={{
          borderWidth: 1,
          width: '100%',
          padding: 10,
          marginBottom: 20,
        }}
      />

      <Button title="Take Photo" onPress={takePhoto} />

      {image && (
        <>
          <Text style={{ marginTop: 20, fontSize: 18 }}>
            Captured Image
          </Text>

          <Image
            source={{ uri: image }}
            style={{ width: 300, height: 450, marginTop: 20 }}
            resizeMode="contain"
          />

          <View style={{ marginTop: 20 }}>
            <Button title="Save to Library" onPress={handleSave} />
          </View>
        </>
      )}
    </ScrollView>
  );
}