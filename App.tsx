import React, { useEffect } from 'react';
import * as Notifications from  'expo-notifications';
import AppLoading from  'expo-app-loading';
import * as Permissions from 'expo-permissions';
import Routes from './src/routes';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost'
import { PlantProps } from './src/libs/storage';
import { Platform, View, Text, Button } from 'react-native';
import { usePermissions } from 'expo-permissions';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  const [permission, askForPermission] = usePermissions(Permissions.NOTIFICATIONS, { ask: true });

  if (!permission || permission.status !== 'granted') {
    return (
      <View>
        <Text>Permission is not granted</Text>
        <Button title="Grant permission" onPress={askForPermission} />
      </View>
    );
  }

  useEffect(() => {

    // (async() => {
    //   if (Platform.OS == 'ios') {
    //     const {status} = 
    //   }
    // })


    // const subscription = Notifications.addNotificationReceivedListener(
    //   async notifications => {
    //     const data = notifications.request.content.data.plant as PlantProps;
    //     console.log(data);
    //   }
    // );
    // return () => subscription.remove();

    console.log('Open App');


    async function notifications() {
      console.log('Open notifications');
      // await Notifications.cancelAllScheduledNotificationsAsync();
      const data = await Notifications.getAllScheduledNotificationsAsync();
      console.log(data);
    }

    notifications();
  }, [])

  if (!fontsLoaded)
    return <AppLoading />

  return (
   <Routes />
  )
}
