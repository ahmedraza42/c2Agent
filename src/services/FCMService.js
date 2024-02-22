import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {localNotificationService} from './LocalNotificationService';

class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      console.log("setting up ios")
      //await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = onRegister => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          // User has permission
          this.getToken(onRegister);
        } else {
          // User don't have permission
          this.requestPermission(onRegister);
        }
      })
      .catch(error => {
        console.log('[FCMService] Permission Rejected', error);
      });
  };

  getToken = onRegister => {
    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log('[FCMService] User does not have a devices token');
        }
      })
      .catch(error => {
        console.log('[FCMService] getToken Rejected', error,onRegister);
      });
  };

  requestPermission = onRegister => {
    messaging()
      .requestPermission()
      .then(() => {
        // this.getToken(onRegister);
      })
      .catch(error => {
        console.log('[FCMService] Request Permission Rejected', error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    // When Application Running on Background
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        const notification = remoteMessage;
        onOpenNotification(notification.data, 'background');
      } else {
        console.log('error onNotificationOpenedApp');
      }
    });

    //When Application open from quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          const notification = remoteMessage;
          localNotificationService.cancelAllLocalNotification();
          onOpenNotification(notification.data, 'quit');
        } else {
          console.log('error getInitialNotification');
        }
      });

    //Forground state message
    this.messageListener = messaging().onMessage(async remoteMessage => {
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage;
        } else {
          notification = remoteMessage;
        }
        onNotification(notification, 'foreground');
      }
    });
  };

  unRegister = () => {
    this.messageListener();
  };

  subscribeToTopic = topic => {
    messaging().subscribeToTopic(topic);
  };

  unsubscribeFromTopic = topic => {
    messaging().unsubscribeFromTopic(topic);
  };

  stopAlarmRing = async () => {
    if (Platform.OS != 'ios') {
      await messaging().stopAlarmRing();
    }
  };
}

export const fcmService = new FCMService();
