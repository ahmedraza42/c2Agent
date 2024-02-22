
import React, { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { isReadyRef, navigationRef } from "./src/navigations/RootNavigation";
import colors from "./src/theme/Colors";
import { UserProvider } from "./src/context/UserContext";
import { MyDrawer, StackNavigation } from "./src/navigations/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import SplashScreen from "react-native-splash-screen";
import { ModalProvider } from "./src/context/ModalContext";
import { LoaderProvider } from "./src/context/LoaderContext";
import NetInfo from "@react-native-community/netinfo";
import { moderateScale } from "react-native-size-matters";
import { fontFamily } from "./src/theme/Fonts";
import Text from "./src/components/Text";
import { ProfileProvider } from "./src/context/ProfileContext";
// import {persistor, store} from "./src/redux/store";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { UserCredentialProvider } from "./src/context/UserCredentialContext";
import {PersistGate} from 'redux-persist/integration/react';
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 40 : StatusBar.currentHeight;
const App = () => {
  const [netInfo, setNetInfo] = useState(true);
  const isDarkMode = useColorScheme() === "dark";
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected == true) {
        setNetInfo(true);
      } else {
        setNetInfo(false);
      }
    });
  }, []);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
     {/* <PersistGate loading={null} persistor={persistor}> */}
     <UserCredentialProvider>
        <UserProvider>
          <ProfileProvider>
            <ModalProvider>
            <LoaderProvider>
            <RootSiblingParent>
                <NavigationContainer
                  ref={navigationRef}
                  onReady={() => {
                    isReadyRef.current = true;
                  }}
                >
                  <View style={styles.statusBarHeight}>
                    <StatusBar
                      translucent
                      backgroundColor={colors.primary}
                      barStyle="dark-content"
                    />
                  </View>
                  {!netInfo ? (
                    <View style={styles.internetView}>
                      <Text style={styles.text}>
                        Please Check Your Internet Connection
                      </Text>
                    </View>
                  ) : null}
                  <StackNavigation />
                </NavigationContainer>
              </RootSiblingParent>
            </LoaderProvider>
           
            </ModalProvider>
          </ProfileProvider>
        </UserProvider>
      </UserCredentialProvider>
     {/* </PersistGate> */}
      
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  statusBarHeight: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: colors.primary,
  },
  internetView: {
    paddingVertical: moderateScale(10),
    width: "100%",
    backgroundColor: colors.white,
  },
  text: {
    color: colors.input,
    fontSize: moderateScale(14),
    fontFamily: fontFamily.Medium,
    textAlign: "center",
  },
});
