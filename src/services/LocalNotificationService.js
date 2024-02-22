import {Platform} from 'react-native';

import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import pushnotificationsservicecopy from './PushNotificationsServicecopy';
class LocalNotificationService {
  configure = onOpenNotification => {
    PushNotification.configure({
      //   onRegister: function (token) {
      //     console.log('[LocalNotificationService] onRegister:', token);
      //   },
      onNotification: function (notification) {
        console.log('[LocalNotificationService] onNotification:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
        if (!notification?.data) {
          console.log('notification?.data',notification?.data)
          return;
        }
        onOpenNotification(notification.data, notification.userInteraction);
      },
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  };

  unregister = () => {
    PushNotification.unregister();
  };

  showNotification = (id, title, message, data = {}, options = {}) => {
    // PushNotification.createChannel(
    //   {
    //     channelId: 'KHAZANY_CHANNEL', // (required)
    //     channelName: 'KHAZANY_CHANNEL', // (required)
    //     soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    //     importance: 5, // (optional) default: 4. Int value of the Android notification importance
    //     vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    //   },
    //   created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    // );
    // pushnotificationsservicecopy.displayNotification(message)
console.log('show ing noti')
console.log({options})
    PushNotification.localNotification({
      /* Android Only Properties */
      /* iOS Only Properties */
      ...this.buildIOSNotification(id, title, message, data, options),
      //common properties both android iOS
      title: title || '',
      message: message || '',
      playSound: options.playSound || false,
      soundName: options.soundName || 'default',
      foreground: true,
      userInteraction: false, // BOOLEAN : If notification was opened by the user from notification
      channelId: 'MENTOGA_CHANNEL',
      // badge: true,
    });
  };

  //for android
  buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
    return {
      id: 'MENTOGA_CHANNEL',
      autoCancel: true,
      largeIcon: options.largeIcon || 'ic_launcher',
      smallIcon: options.smallIcon || 'ic_launcher',
      bigText: message || '',
      priority: options.priority || 'high',
      importance: options.importance || 'high',
      data: data,
    };
  };

  //for iOS
  buildIOSNotification = (id, title, message, data = {}, options = {}) => {
    return {
      alertAction: options.alertAction || 'view',
      category: options.category || 'view',
      userInfo: {
        id: id,
        item: data,
      },
    };
  };

  cancelAllLocalNotification = () => {
    if (Platform.OS === 'ios') {
      PushNotification.removeAllDeliveredNotifications();
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
  };

  removeDeliveredNotificationByID = notificationId => {
    PushNotification.cancelLocalNotifications({id: `${notificationId}`});
  };
}

export const localNotificationService = new LocalNotificationService();
