import { useEffect, useState } from 'react';
import {
  View,
  Button,
  FlatList,
  Text
} from 'react-native';

import {
  initializeDatabase,
  getMusic
} from '../database/database';

export default function HomeScreen({
  navigation
}) {
  const [music, setMusic] = useState([]);

  function loadMusic() {
    setMusic(getMusic());
  }

  useEffect(() => {
    initializeDatabase();
    loadMusic();

    const unsubscribe =
      navigation.addListener(
        'focus',
        loadMusic
      );

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button
        title="Scan Sheet Music"
        onPress={() =>
          navigation.navigate('Scan Music')
        }
      />

      <FlatList
        data={music}
        keyExtractor={item =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <Text
            style={{
              marginTop: 15,
              fontSize: 18
            }}
          >
            {item.title}
          </Text>
        )}
      />
    </View>
  );
}