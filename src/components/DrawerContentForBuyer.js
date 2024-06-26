import React, { useContext } from 'react'
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Linking,
  } from "react-native";
import Text from './Text'
import { ProfileContext } from '../context/ProfileContext';
import { isEmpty } from "lodash";
import { drawerBuyerList } from '../staticData/drawerArray';
import { moderateScale } from 'react-native-size-matters';
import { fontFamily } from '../theme/Fonts';
import DrawerMenuButton from './DrawerMenuButton';
import colors from '../theme/Colors';
import { remove } from '../utils/storage';
import TokenStorageService from '../services/tokenService';
import { UserContext } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const _tokenStorageService = TokenStorageService.getService();
const DrawerContentForBuyer=({})=> {
 const navigation= useNavigation();
    const [userProfile, setUserProfile] = useContext(ProfileContext);
    const [user, setUser] = useContext(UserContext);
    const handleLogout=async()=>{
      await remove("current_user");
      await _tokenStorageService.clearToken();
      setUser((state) => ({
        isLoggedIn: false,
      }));
    }
  return (
    <View style={{flex:1}}>

        {/* <ScrollView
          bounces={false}
          style={{ backgroundColor: "transparent" }}
          {...props}
        > */}
          <View
            style={{
              ...styles.drawerContent,
              backgroundColor: "transparent",
            }}
          >
            <View style={styles.drawerTopView}>
              {userProfile?.profileImage ?<Image
                style={styles.userImage}
                resizeMode="cover"
                source={{
                  uri: userProfile?.profileImage || "https://",
                }}
              />:<Image
                style={styles.userImage}
                resizeMode="cover"
                source={require('../assets/drawerBuyerAssets/profileCircle.png')}
              />}
                <Text style={styles.firstName}>
                  {!isEmpty(userProfile)? userProfile?.name:'---'}
                </Text>
                {/* <TouchableOpacity onPress={() => {navigation.navigate('Profile')}}>
                  <Text style={styles.email}>Edit Profile</Text>
                </TouchableOpacity> */}
              
            </View>

            <View style={{height:moderateScale(20)}}/>
              {drawerBuyerList?.map((item, index) => {
                return (
                  <View   
                  key={`ite ${index}`}>
                  <DrawerMenuButton
                    image={
                      <Image
                        resizeMode="contain"
                        style={styles.drawerImageStyle}
                        source={item.image}
                      />
                    }
                    title={item.title}
                    onPress={() => {
                      try {
                        if (item.title === "Contact Us") {
                          Linking.openURL(
                            `whatsapp://send?phone=${"971502258431"}&text=${"Hello!!"}`
                          );
                        } 
                        else if (item.title === "Logout") {
                          console.log('dssd')
                          handleLogout()
                        } 
                        else {
                          navigation.navigate(item.route);
                        }
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  />
                    </View>
                );
              })}
          </View>
         
        {/* </ScrollView> */}
    </View>
  )
}

export default DrawerContentForBuyer

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
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
    bottomView: {
      padding: moderateScale(20),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    touchablelogout: {
      flexDirection: "row",
      padding: moderateScale(12),
      alignItems: "center",
    },
    logout: {
      marginLeft: moderateScale(8),
      color: "white",
      fontFamily: fontFamily.gilroyMedium,
      fontSize: moderateScale(16),
    },
    drawerImageStyle: {
      width: moderateScale(35),
      height: moderateScale(35),
    },
    innerView: {
      paddingVertical: moderateScale(10),
      justifyContent: "center",
      alignItems: "center",
    },
    logoutImage: {
      height: moderateScale(150),
      width: moderateScale(150),
    },
    textView: {
      paddingHorizontal: moderateScale(60),
      marginTop: moderateScale(10),
    },
    logoutText: {
      textAlign: "center",
      fontFamily: fontFamily.Medium,
      fontSize: moderateScale(14),
    },
    buttonView: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: moderateScale(20),
    },
    touchableLogout: {
      width: moderateScale(110),
      height: moderateScale(40),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: moderateScale(4),
      borderColor: "#807F7F",
      borderWidth: moderateScale(0.8),
    },
    yesText: {
      fontFamily: fontFamily.Medium,
      fontSize: moderateScale(12),
      color: "#000000",
    },
    noTextView: {
      width: moderateScale(110),
      height: moderateScale(40),
      backgroundColor: "#0082EA",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: moderateScale(4),
    },
    noText: {
      fontFamily: fontFamily.Medium,
      fontSize: moderateScale(12),
      color: "#ffffff",
    },
    drawerTopView: {
      // padding: moderateScale(25),
      backgroundColor: colors.primary,
      height:moderateScale(230),
      
      // justifyContent: "center",
      alignItems: "center",
      justifyContent:'center'
    },
    drawerImageView: {
      justifyContent: "center",
      alignItems: "center",
    },
    userImage: {
      width: moderateScale(120),
      height: moderateScale(120),
      borderRadius: moderateScale(60),
      backgroundColor: "#F4F4F4",
    },
    firstName: {
      fontFamily: fontFamily.Medium,
      fontSize: moderateScale(16),
      color: "#ffff",
      marginTop: moderateScale(5),
      // width:moderateScale(135)
    },
    email: {
      fontFamily: fontFamily.Medium,
      fontSize: moderateScale(12),
      color: "#ffff",
      textDecorationLine:'underline'
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
  });