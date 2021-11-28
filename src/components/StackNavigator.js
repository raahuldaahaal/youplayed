import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthProvider';
import Home from '../screens/Home';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { Image } from 'react-native';

export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  const [user] = useAuth();
  const options = {
    headerTitle: () => (
      <Image
        source={require('../assets/icon.png')}
        style={{ width: 48, height: 32 }}
      />
    ),
    headerStyle: {
      backgroundColor: '#ff0000',
    },
  };

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen name="Home" component={Home} options={options} />
      ) : (
        <>
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={options}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={options}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
