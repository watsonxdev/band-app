import { useState } from 'react';

import {
  View,
  Button,
  Image,
  TextInput
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { addMusic } from '../database/database';

export default function ScanScreen({
  navigation
}) {
  const [image, setImage] =
    useState(null);

  const [title, setTitle] =
    useState('');

  const [instrument, setInstrument] =
    useState('');

  async function pickImage() {
    const result =
      await ImagePicker.launchCameraAsync({
        quality: 1
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  function saveMusic() {
    addMusic(
      title,
      instrument,
      image
    );

    navigation.goBack();
  }

  return (
    <View style={{ padding: 20 }}>
      <Button
        title="Take Photo"
        onPress={pickImage}
      />

      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 250,
            height: 300,
            marginTop: 20
          }}
        />
      )}

      <TextInput
        placeholder="Piece Title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          padding: 10,
          marginTop: 20
        }}
      />

      <TextInput
        placeholder="Instrument"
        value={instrument}
        onChangeText={setInstrument}
        style={{
          borderWidth: 1,
          padding: 10,
          marginTop: 10
        }}
      />

      <Button
        title="Save"
        onPress={saveMusic}
      />
    </View>
  );
}