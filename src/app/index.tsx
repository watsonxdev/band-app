import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Band App</Text>

      <Button
        title="Scan Sheet Music"
        onPress={() => {
        console.log('Button pressed');
        router.push('/scan');
      }}
    />
    </View>
  );
}