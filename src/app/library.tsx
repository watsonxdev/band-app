import { View, Text, FlatList, Image, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { getScans } from '../services/storage';

type Scan = {
  id: string;
  title: string;
  instrument: string;
  image: string;
};

export default function Library() {
  const [scans, setScans] = useState<Scan[]>([]);

  async function load() {
    const data: Scan[] = await getScans();
    setScans(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Library
      </Text>

      {/* 🔥 ADD REFRESH BUTTON */}
      <Button title="Refresh Library" onPress={load} />

      <FlatList
        data={scans}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
            <Text style={{ color: 'gray' }}>{item.instrument}</Text>

            <Image
              source={{ uri: item.image }}
              style={{ width: 200, height: 300, marginTop: 10 }}
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
}