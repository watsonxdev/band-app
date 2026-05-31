import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import ScanScreen from './screens/ScanScreen';
import MusicDetailScreen from './screens/MusicDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Library"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Scan Music"
          component={ScanScreen}
        />

        <Stack.Screen
          name="Music Details"
          component={MusicDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}