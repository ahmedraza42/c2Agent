// import ConnectyCube from 'react-native-connectycube';
import {Notifications} from 'react-native-notifications';
import {getUniqueId} from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import RNNotificationCall from "react-native-full-screen-notification-incoming-call";
// import VoipPushNotification from 'react-native-voip-push-notification';

// import {_setNotofcationStatus} from '../../ConstantFile';
class PushNotificationsService {
  constructor() {
    console.log('[PushNotificationsService][constructor]');
    this._registerBackgroundTasks();
  }

  init() {
    console.log('[PushNotificationsService][init]');

    if (Platform.OS === 'ios') {
      Notifications.ios.checkPermissions().then(currentPermissions => {
        console.log('Badges enabled: ' + !!currentPermissions.badge);
        console.log('Sounds enabled: ' + !!currentPermissions.sound);
        console.log('Alerts enabled: ' + !!currentPermissions.alert);
        console.log('Car Play enabled: ' + !!currentPermissions.carPlay);
        console.log(
          'Critical Alerts enabled: ' + !!currentPermissions.criticalAlert,
        );
        console.log('Provisional enabled: ' + !!currentPermissions.provisional);
        console.log(
          'Provides App Notification Settings enabled: ' +
            !!currentPermissions.providesAppNotificationSettings,
        );
        console.log(
          'Announcement enabled: ' + !!currentPermissions.announcement,
        );
      });
      // // --- NOTE: You still need to subscribe / handle the rest events as usuall.
      //   // --- This is just a helper whcih cache and propagate early fired events if and only if for
      //   // --- "the native events which DID fire BEFORE js bridge is initialed",
      //   // --- it does NOT mean this will have events each time when the app reopened.


      //   // ===== Step 1: subscribe `register` event =====
      //   // --- this.onVoipPushNotificationRegistered
      //   VoipPushNotification.addEventListener('register', (token) => {
      //     // --- send token to your apn provider server
      //     console.log('fdfdf',token)
      // });

      // // ===== Step 2: subscribe `notification` event =====
      // // --- this.onVoipPushNotificationiReceived
      // VoipPushNotification.addEventListener('notification', (notification) => {
      //     // --- when receive remote voip push, register your VoIP client, show local notification ... etc
      //     // this.doSomething();
      //     console.log('show noti VOIP')
        
      //     // --- optionally, if you `addCompletionHandler` from the native side, once you have done the js jobs to initiate a call, call `completion()`
      //     VoipPushNotification.onVoipNotificationCompleted(notification?.uuid);
      // });
      //   // ===== Step 3: subscribe `didLoadWithEvents` event =====
      //   VoipPushNotification.addEventListener('didLoadWithEvents', (events) => {
      //     // --- this will fire when there are events occured before js bridge initialized
      //     // --- use this event to execute your event handler manually by event type
      //     console.log('event occur')
      //     if (!events || !Array.isArray(events) || events.length < 1) {
      //         return;
      //     }
      //     for (let voipPushEvent of events) {
      //         let { name, data } = voipPushEvent;
      //         if (name === VoipPushNotification.RNVoipPushRemoteNotificationsRegisteredEvent) {
      //             // this.onVoipPushNotificationRegistered(data);
      //         } else if (name === VoipPushNotification.RNVoipPushRemoteNotificationReceivedEvent) {
      //             // this.onVoipPushNotificationiReceived(data);
      //         }
      //     }
      // });

      // // ===== Step 4: register =====
      // // --- it will be no-op if you have subscribed before (like in native side)
      // // --- but will fire `register` event if we have latest cahced voip token ( it may be empty if no token at all )
      // VoipPushNotification.registerVoipToken();

    }

    // Notifications.getInitialNotification()
    //   .then(notification => {
    //     console.log(
    //       'Initial notification was:',
    //       notification ? notification.payload : 'N/A',
    //     );

    //   })
    //   .catch(err => console.error('getInitialNotifiation() failed', err));

    // Notifications.events().registerRemoteNotificationsRegistered(event => {
    //   // TODO: Send the token to my server so it could send back push notifications...
    //   console.log(
    //     '[PushNotificationService] Device Token Received',
    //     event.deviceToken,
    //   );

    //  this.subscribeToPushNotifications(event.deviceToken);
    // });

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)

      onRegister: token => {
        console.log('NOTIFICATIONTOKEN:', token.token);
        //alert(token.token);
        // _setNotofcationStatus('Accept');
        // alert(token.token);
        //   this.subscribeToPushNotifications()
        this.subscribeToPushNotifications(token.token);
      },
      popInitialNotification: true,
      onAction: function (notification) {
        // process
        // alert('call onAction');
        PushNotification.invokeApp(notification);
      },
      onNotification: function (notification) {
        //   alert(JSON.stringify(notification?.action));

        if (notification?.action == 'Accept') {
          // _setNotofcationStatus('Accept');

          // invokeApp();
          // alert('usamammaam');
          // const selectedOpponentsIds = '6738203';
          // // 1. initiate a call
          // //
          // //alert('123');
          // const callSession = CallService.startCall(
          //   selectedOpponentsIds,
          //   ConnectyCube.videochat.CallType.AUDIO,
          // );
        } else if (notification?.action == 'Reject') {
          // _setNotofcationStatus('Reject');
        }

        //const {dispatch, User} = context.props;
        //   let type = notification.type;

        //   if (notification.userInteraction) {
        // switch (notification.type) {
        //     case 'venue':
        //         alert('Go to Venue View')
        //         break;
        // }
        //  }
      },
    });
    //

    // Notifications.events().registerRemoteNotificationsRegistrationFailed(
    //   event => {
    //     console.error(
    //       '[PushNotificationService] Failed to get Device Token',
    //       event,
    //     );
    //   },
    // );

    // VoIP
    if (Platform.OS === 'ios') {
      Notifications.ios.events().registerPushKitRegistered(event => {
        console.log(
          '[PushNotificationService] Push Kit received',
          event.pushKitToken,
        );
        this.subscribeToVOIPPushNotifications(event.pushKitToken);
      });
      // This is handled via iOS native code AppDelegate.m file
      //
      // Notifications.ios.events().registerPushKitNotificationReceived((payload, complete) => {
      //   complete();
      // });
    }

    // Notifications.events().registerNotificationReceivedForeground(
    //   async (notification, completion) => {
    //     console.log(
    //       `[PushNotificationService] Notification received in foreground`,
    //       notification.payload,
    //       notification?.payload?.message,
    //     );

    // if (Platform.OS === 'android') {
    //   PushNotificationsService.displayNotification(notification.payload);
    // }

    //     completion({alert: false, sound: false, badge: false});
    //   },
    // );

    // Notifications.events().registerNotificationReceivedBackground(
    //   async (notification, completion) => {
    //     alert('killed satate');
    //     console.log(
    //       '[PushNotificationService] Notification Received - Background',
    //       notification.payload,
    //       notification?.payload?.message,
    //     );

    //     if (Platform.OS === 'android') {
    //       if (await PermissionsService.isDrawOverlaysPermisisonGranted()) {
    //         invokeApp();

    //         const dummyCallSession = {
    //           initiatorID: notificationBundle.initiatorId,
    //           opponentsIDs: notificationBundle.opponentsIds.split(','),
    //           ID: notificationBundle.uuid,
    //         };
    //         store.dispatch(setCallSession(dummyCallSession, true, true));
    //       } else {
    //         PushNotificationsService.displayNotification(notification.payload);
    //       }
    //     }

    //     // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
    //     completion({alert: true, sound: true, badge: false});
    //   },
    // );

    messaging().setBackgroundMessageHandler(
      async (notification, completion) => {
        // alert('dgffgds');
        console.log(
          '[PushNotificationService] Notification Received - Background',
          notification
        );

        const extra = {
          dialog_id: notification?.payload?.dialog_id,
          isLocal: true,
        };
        PushNotification.createChannel(
          {
            channelId: 'MENTOGA_CHANNEL', // (required)
            channelName: 'MENTOGA_CHANNEL', // (required)
            channelDescription: 'Order related Notification', // (optional) default: undefined.
            playSound: true, // (optional) default: true
            soundName: 'default',  // (optional) See `soundName` parameter of `localNotification` function
            importance: 5, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true,
            importance: Importance.HIGH, // (optional) default: true. Creates the default vibration patten if true.
            
          },
          created =>{
            // if( notification?.notification?.sound=='samsung.wav'){
            //   console.log('RNNotificationCall')
            //   RNNotificationCall.displayNotification(
            //     "22221a97-8eb4-4ac2-b2cf-0a3c0b9100ad",
            //     null,
            //     30000,
            //     {
            //       channelId: "com.abc.incomingcall",
            //       channelName: "Incoming video call",
            //       notificationIcon: "ic_launcher",//mipmap
            //       notificationTitle: notification?.notification?.title,
            //       notificationBody: notification?.notification?.body,
            //       answerText: "Answer",
            //       declineText: "Decline",
            //       notificationColor:"colorAccent",
            //       notificationSound: 'skype_ring',//raw 
            //       mainComponent:'Mentoga'//AppRegistry.registerComponent('MyReactNativeApp', () => CustomIncomingCall);
            //     }
            //   )
            // }
            // else{
            
              console.log('localNotification')
              // PushNotification.localNotification({
              //   channelId: 'MENTOGA_CHANNEL',
              //   title: notification?.notification?.title,
              //   message: notification?.notification?.body,
              //   playSound: true, // (optional) default: true
              //   soundName: 'default', 
              //   vibrate: true, // (optional) default: true
              //   vibration: 3000000,
              //   // data: {key: '123', name: 'osama'},
              //   importance:'high',
              //   messageId: '123',
              //   id: 10,
              //   // actions: ['Accept', 'Reject'],
              //   invokeApp: true,
              //   when:1000000,
              //   showWhen:1000000,
              //   body: notification?.payload?.message,
              //   silent: false,
              //   // category: 'SOME_CATEGORY',
              //   userInfo: extra,
              //   //extra,
              // }); // (optional) callback returns whether the channel was created, false means it already existed.
            // }
         
           
            
        });
        //  console.log(JSON.stringify(message?.message))
      },
    );

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );

      console.log('data  quit state Moddle ware:', remoteMessage.data.Module);

      //navigation.navigate(remoteMessage.data.type);
    });

    messaging().onNotificationOpenedApp(async remoteMessage => {
      // alert(JSON.stringify(remoteMessage));
      console.log(
        'Notification caused app to open from background state:' +
          remoteMessage?.notification,
      );
    });

    // Notifications.events().registerNotificationOpened(
    //   async (notification, completion) => {
    //     console.log(
    //       `[PushNotificationService] Notification opened`,
    //       notification.payload,
    //     );

    //     await this.onNotificationOpened(notification.payload);

    //     completion();
    //   },
    // );

    //Notifications.registerRemoteNotifications();

    if (Platform.OS === 'ios') {
      console.log('registerPushKit');
      Notifications.ios.registerPushKit();
    }

    //return 'Login';
  }

   displayNotification(payload) {
    console.log('-------------display nofti9cation----------',payload.notification);
    console.log('sound',payload.notification.android.sound);


    const extra = {
      dialog_id: payload?.dialog_id,
      isLocal: true,
    };
    PushNotification.createChannel(
      {
        channelId: 'MENTOGA_CHANNEL', // (required)
        channelName: 'MENTOGA_CHANNEL', // (required)
        channelDescription: 'Order related Notification', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default',   //'samsung', // (optional) See `soundName` parameter of `localNotification` function
        importance: 5, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true,
        importance: Importance.HIGH, // (optional) default: true. Creates the default vibration patten if true.
      },
      created =>{
        console.log('gggggggggggggggg')
       
          // if(payload.notification.android.sound=='samsung' || payload.notification.android.sound=='samsung.wav')
          
          // {
          //   RNNotificationCall.displayNotification(
          //     "22221a97-8eb4-4ac2-b2cf-0a3c0b9100ad",
          //     null,
          //     30000,
          //     {
          //       channelId: "com.abc.incomingcall",
          //       channelName: "Incoming video call",
          //       notificationIcon: "ic_launcher",//mipmap
          //       notificationTitle: payload.notification?.title,
          //       notificationBody: payload.notification?.body,
          //       answerText: "Answer",
          //       declineText: "Decline",
          //       notificationColor:"colorAccent",
          //       notificationSound: 'skype_ring',//raw 
          //       mainComponent:'Mentoga'//AppRegistry.registerComponent('MyReactNativeApp', () => CustomIncomingCall);
          //     }
          //   ),
          //   // invokeApp(),
          //   RNNotificationCall.addEventListener('answer', async () => {
          //   console.log('dsf')
          //   const yourObject = { route: 'Dashboard' };
    
          //   invokeApp({
          // data: yourObject,
          //   })
          //   }),
          //   RNNotificationCall.addEventListener('endCall', () => {
          //     console.log('cvcvcvcv')
          //     invokeApp()
          //   });
          //   // RNNotificationCall.backToApp(),
          //   // PushNotification.invokeApp(),
          // }
          // else{
            
            // console.log('ggg localNotification',payload.notification.android.sound)
            // PushNotification.localNotification({
            //   channelId: 'MENTOGA_CHANNEL',
            //   title: payload.notification?.title,
            //   message: payload.notification?.body,
            //   playSound: true, // (optional) default: true
            //   soundName: 'default', 
            //   vibrate: true, // (optional) default: true
            //   vibration: 300000,
            //   // data: {key: '123', name: 'osama'},
            //   messageId: '123',
            //   id: 10,
            //   // actions: ['Accept', 'Reject'],
            //   invokeApp: true,
            //   //foreground: true,
            //   // when:1000000,
            //   // showWhen:1000000,
            //   body: payload?.message,
            //   silent: false,
            //   category: 'SOME_CATEGORY',
            //   userInfo: extra,
            //   //   userInteraction: false,
            //   //  foreground: false,
            //   //extra,
            // }); // (optional) callback returns whether the channel was created, false means it already existed.
          // }
      
        
      });
  }

  _registerBackgroundTasks() {
    if (Platform.OS === 'ios') {
      return;
    }

    const {AppRegistry} = require('react-native');

    // https://reactnative.dev/docs/headless-js-android
    //
    AppRegistry.registerHeadlessTask('JSNotifyWhenKilledTask', () => {
      return async notificationBundle => {
        alert('killed satate');
        console.log(
          '[JSNotifyWhenKilledTask] notificationBundle',
          notificationBundle,
        );

       
          console.log('osama background',notificationBundle);
          PushNotificationsService.displayNotification(notificationBundle);
        
      };
    });
  }

  subscribeToPushNotifications(deviceToken) {
    // alert(deviceToken);
    const params = {
      notification_channel: Platform.OS === 'ios' ? 'apns' : 'gcm',
      device: {
        platform: Platform.OS,
        udid: getUniqueId(),
      },
      push_token: {
        //environment: __DEV__ ? 'development' : 'production',
        environment: 'development',
        client_identification_sequence: deviceToken,
        // bundle_identifier: 'com.nowbuysell',
      },
    };

    // ConnectyCube.pushnotifications.subscriptions
    //   .create(params)
    //   .then(result => {
    //     //   alert('push');
    //     console.log(
    //       '[PushNotificationsService][subscribeToPushNotifications] Ok',
    //     );
    //   })
    //   .catch(error => {
    //     console.warn(
    //       '[PushNotificationsService][subscribeToPushNotifications] Error',
    //       error,
    //     );
    //   });
  }

  subscribeToVOIPPushNotifications(deviceToken) {
    const params = {
      notification_channel: 'apns_voip',
      device: {
        platform: Platform.OS,
        udid: getUniqueId(),
      },
      push_token: {
        environment: __DEV__ ? 'development' : 'production',
        client_identification_sequence: deviceToken,
      },
    };

    // ConnectyCube.pushnotifications.subscriptions
    //   .create(params)
    //   .then(result => {
    //     console.log(
    //       '[PushNotificationsService][subscribeToVOIPPushNotifications] Ok',
    //     );
    //   })
    //   .catch(error => {
    //     console.warn(
    //       '[PushNotificationsService][subscribeToVOIPPushNotifications] Error',
    //       error,
    //     );
    //   });
  }

  deleteSubscription() {
    const deviceUdid = getUniqueId();
    // ConnectyCube.pushnotifications.subscriptions
    //   .list()
    //   .then(result => {
    //     for (let item of result) {
    //       const subscription = item.subscription;
    //       if (
    //         subscription.device.platform === Platform.OS &&
    //         subscription.device.udid === deviceUdid
    //       ) {
    //         ConnectyCube.pushnotifications.subscriptions
    //           .delete(subscription.id)
    //           .then(result => {
    //             console.log(
    //               '[PushNotificationsService][deleteSubscription] Ok',
    //               subscription.id,
    //             );
    //           })
    //           .catch(error => {
    //             console.warn(
    //               '[PushNotificationsService][deleteSubscription] Error1',
    //               error,
    //             );
    //           });
    //       }
    //     }
    //   })
    //   .catch(error => {
    //     console.warn(
    //       '[PushNotificationsService][deleteSubscription] Error2',
    //       error,
    //     );
    //   });
  }

//   sendPushNotification(recipientsUsersIds, params) {
//     const payload = JSON.stringify(params);
//     const pushParameters = {
//       notification_type: 'push',
//       user: {ids: recipientsUsersIds},
//       // environment: __DEV__ ? 'development' : 'production',
//       environment: 'development',
//       message: ConnectyCube.pushnotifications.base64Encode(payload),
//     };

//     ConnectyCube.pushnotifications.events
//       .create(pushParameters)
//       .then(result => {
//         //  alert(JSON.stringify(recipientsUsersIds));
//         console.log('[PushNotificationsService][sendPushNotification] Ok');
//       })
//       .catch(error => {
//         // alert('error');
//         console.warn(
//           '[PushNotificationsService][sendPushNotification] Error',
//           error,
//         );
//       });
//   }
}

const pushnotificationsservicecopy = new PushNotificationsService();
export default pushnotificationsservicecopy;
