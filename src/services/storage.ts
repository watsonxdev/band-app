import AsyncStorage from '@react-native-async-storage/async-storage';

export type Scan = {
  id: string;
  title: string;
  instrument: string;
  image: string;
};

const KEY = 'band_scans';

export async function saveScan(scan: Scan) {
  const existing = await getScans();

  const updated = [...existing, scan];

  await AsyncStorage.setItem(
    'band-scans',
     JSON.stringify(updated));
}

export async function getScans(): Promise<Scan[]> {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}