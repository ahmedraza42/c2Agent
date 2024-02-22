import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import { Drawer, Text } from "react-native-paper";
import DrawerMenuButton from "./DrawerMenuButton";
import { moderateScale } from "react-native-size-matters";
import Modal from "react-native-modal";
import {
  getItemFromStorage,
  remove,
  saveItemToStorage,
} from "../utils/storage";
import { UserContext } from "../context/UserContext";
import { fontFamily } from "../theme/Fonts";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import API_CALLS, { BASE_URL_FOR_IMAGES } from "../services/constants";
import { ProfileContext } from "../context/ProfileContext";
import deviceInfoModule from "react-native-device-info";
import colors from "../theme/Colors";
import TokenStorageService from "../services/tokenService";
import { mentorDrawerMenuList } from "../staticData/drawerArray";
import { Switch } from "react-native-paper";
import { isEmpty } from "lodash";
const _tokenStorageService = TokenStorageService.getService();

export function DrawerContent(props) {
  const [user, setUser] = useContext(UserContext);
  const [userProfile, setUserProfile] = useContext(ProfileContext);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [btnloading, setbtnLoading] = React.useState(false);
  console.log({ userProfile });
  console.log('dfdfd');
  const Creator = 1;
  const Fan = 2;
  const removeToken = async () => {
    await remove("current_user");
    await remove("mentee");
    await _tokenStorageService.clearToken();
    setVisible(false);
    setLoading(false);
    setUser((state) => ({
      isLoggedIn: false,
    }));
  };
  const handleLogout = async () => {
    setLoading(true);
    let userIsMentee = await getItemFromStorage("mentee");
    try {
      let data = {
        userId: userProfile.id,
        accountType: userIsMentee === "true" ? "Fan" : "Creator",
        deviceID: deviceInfoModule.getDeviceId() || "",
      };
      const res = await API_CALLS.logout(data);
      setVisible(false);
      console.log("logout", res);
     
      await GoogleSignin.signOut();
      setUserProfile((state) => ({}));
      await remove("current_user");
      await remove('mentee')
      await remove('showCompleteProfile')
      await removeToken();
    } catch (error) {
      setVisible(false);
      removeToken();
    } finally {
      await removeToken();
      setUserProfile((state) => ({}));
      await remove('current_user')
      await remove('mentee')
      await remove('showCompleteProfile')
       setLoading(false);
    }
  };

  const switchAccount = async () => {
    try {
      let userIsMentee = await getItemFromStorage("mentee");
      console.log(userIsMentee);
      let data = {
        userId: userProfile.id,
        userTypeId: userIsMentee === "false" ? Fan : Creator,
      };
      setbtnLoading(true);
      const res = await API_CALLS.switchAccount(data);
      if (res[0]?.email != null) {
        await remove("current_user")
        await saveItemToStorage("current_user", res);
        await _tokenStorageService.setAccessToken(res[1]?.token);
        await _tokenStorageService.setRefreshToken(res[1]?.refreshToken);
          if (userIsMentee == false || userIsMentee == "false") {
          let userIsMentee = await saveItemToStorage("mentee", "true");
          setUser((state) => ({
            ...state,
            isLoggedIn: true,
            isUserFirstTime: false,
            isMentee: true,
            isSplash: false,
          }));
        }
        // setUserStack(res)
      }  else {
        throw res.userMessage;
      }
    } catch (error) {
      console.log({error});
    } finally {
      setbtnLoading(false);
    }

    // setLoading(true);
    // let userIsMentee = await getItemFromStorage("mentee");
    // try {

    //   const userData = await getItemFromStorage("current_user");
    //   console.log(userData," current user Data")

    //   let data = {
    //     userId: userData[0].id,
    //     userTypeId: userIsMentee === "true" ? Creator : Fan,
    //   };
    //  console.log({data})
    //   const res = await API_CALLS.switchAccount(data);

    //   userData[0].userTypeId = res.model.userTypeId;

    //   await saveItemToStorage("current_user",userData);
    //   setUserStack()
    // } catch (error) {
    //   setVisible(false);
    // } finally {
    //   setLoading(false);
    // }
  };

  const showModal = () => {
    return (
      <View>
        <Modal
          animationIn={"fadeIn"}
          isVisible={visible}
          animationInTiming={300}
          onBackButtonPress={() => setVisible(false)}
          backdropOpacity={0.8}
        >
          <TouchableOpacity
            // onPress={() => setVisible(false)}
            activeOpacity={1}
            style={styles.modalRootView}
          >
            <View
              style={{
                ...styles.modalInnerViewWithButton,
                backgroundColor: "white",
              }}
            >
              <View style={styles.modalImageView}>
                <View>
                  <Image
                    style={styles.modalImageStyle}
                    source={require("../assets/images/logoutpic.png")}
                  />
                </View>
                <View style={styles.logoutView}>
                  <Text style={styles.logoutTextmodal}>
                    Are you sure you want to Logout
                  </Text>
                </View>

                <View style={styles.logoutButtonView}>
                  <TouchableOpacity
                    onPress={() => {
                      handleLogout();
                    }}
                    style={styles.logoutButton}
                  >
                    {loading ? (
                      <ActivityIndicator size={"small"} color={colors.input} />
                    ) : (
                      <Text style={styles.yesButtonText}>Yes</Text>
                    )}
                  </TouchableOpacity>
                  <View style={{ width: moderateScale(10) }}></View>
                  <TouchableOpacity
                    onPress={() => {
                      setVisible(false);
                    }}
                    style={styles.noButton}
                  >
                    <Text style={styles.noButtonText}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };

  return (
    <>
      <ImageBackground
        style={{ flex: 1 }}
        // source={require("../assets/vectors/drawerBackground.png")}
      >
        <ScrollView
          bounces={false}
          style={{ backgroundColor: "transparent" }}
          {...props}
        >
          <View
            style={{
              ...styles.drawerContent,
            }}
          >
            <View style={styles.drawerTopView}>
              <Image
                style={styles.userImage}
                resizeMode="cover"
                source={{
                  uri: userProfile?.profileImage || "https://",
                }}
              />
              <View style={{ paddingLeft: moderateScale(10) }}>
                <Text style={styles.firstName}>
                  {!isEmpty(userProfile)? userProfile?.company:'--'}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("MentorPersonalInfo");
                  }}
                >
                  <Text style={styles.email}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Drawer.Section style={styles.drawerSection}>
              {mentorDrawerMenuList.map((item, index) => {
                return (
                  <View   
                  key={`ite ${index}`}>
                  <DrawerMenuButton
                    image={
                      <Image
                        resizeMode="contain"
                        style={item.title==='Connected Accounts'?styles.iconStyleEx:styles.iconStyle}
                        source={item.image}
                      />
                    }
                    title={item.title}
                    onPress={() => navigation.navigate(item.route)}
                  />
                  </View>
                  
                );
              })}
            </Drawer.Section>
          </View>
          <TouchableOpacity
            style={styles.availablityView}
            onPress={() => {
              switchAccount();
            }}
          >
            <Image
              style={styles.drawerImageStyle}
              source={require("../assets/vectors/fanswitch.png")}
            />
            <View style={{ marginLeft: moderateScale(10)}}>
              {btnloading ? (
                <ActivityIndicator style={{}} size={"small"} color={"white"} />
              ) : (
                <Text
                  style={{
                    ...styles.medium12,
                    color: "#ffffff",
                  }}
                >
                  Switch to Fan
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.bottomLogoutView}>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
            style={styles.logoutInnerView}
          >
            <Image
              style={{ width: moderateScale(15), height: moderateScale(15) }}
              source={require("../assets/vectors/logout.png")}
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        {showModal()}
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    // padding:moderateScale(25),
  },
  title: {
    marginTop: moderateScale(20),
    fontWeight: "bold",
    textAlign: "center",
  },
  drawerSection: {
    marginTop: moderateScale(10),
  },
  modalRootView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
  },
  modalInnerViewWithButton: {
    width: "100%",
    borderRadius: moderateScale(8),
    padding: moderateScale(15),
    alignItems: "center",
    justifyContent: "center",
  },
  modalImageView: {
    paddingVertical: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  modalImageStyle: {
    height: moderateScale(150),
    width: moderateScale(150),
  },
  logoutView: {
    paddingHorizontal: moderateScale(60),
    marginTop: moderateScale(10),
  },
  logoutText: {
    marginLeft: moderateScale(8),
    color: "white",
    fontFamily: fontFamily.gilroyMedium,
    fontSize: moderateScale(16),
  },
  logoutButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateScale(20),
  },
  logoutButton: {
    width: moderateScale(110),
    height: moderateScale(40),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(4),
    borderColor: "#807F7F",
    borderWidth: moderateScale(0.8),
  },
  noButton: {
    width: moderateScale(110),
    height: moderateScale(40),
    backgroundColor: "#0082EA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(4),
  },
  noButtonText: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(12),
    color: "#ffffff",
  },
  yesButtonText: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(12),
    color: "#000000",
  },
  drawerTopView: {
    padding: moderateScale(25),
    // backgroundColor: "rgba(0, 130, 234, 1)",
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  drawerImageView: {
    justifyContent: "center",
    alignItems: "center",
  },
  drawerImageStyle: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  firstName: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(16),
    color: "#ffff",
    marginTop: moderateScale(5),
    width:moderateScale(135)
  },
  email: {
    fontFamily: fontFamily.Light,
    fontSize: moderateScale(12),
    color: "#ffff",
    textDecorationLine:'underline'
  },
  iconStyle: {
    width: moderateScale(22),
    height: moderateScale(22),
  },
  iconStyleEx: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  bottomLogoutView: {
    padding: moderateScale(20),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoutInnerView: {
    flexDirection: "row",
    padding: moderateScale(12),
    alignItems: "center",
  },
  logoutText: {
    marginLeft: moderateScale(8),
    color: "white",
    fontFamily: fontFamily.Medium,
  },
  availablityView: {
    width: "85%",
    alignSelf: "center",
    height: moderateScale(50),
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginTop: moderateScale(20),
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(12),
  },
  medium12: {
    fontFamily: fontFamily.gilroyMedium,
    fontSize: moderateScale(16),
  },
  userImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(16),
    backgroundColor: "#F4F4F4",
  },
  logoutTextmodal: {
    textAlign: "center",
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(14),
  },
});
