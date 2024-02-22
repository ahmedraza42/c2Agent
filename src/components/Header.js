import React, { useContext } from "react";
import {
  Image,
  Keyboard,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { ProfileContext } from "../context/ProfileContext";
import { BASE_URL_FOR_IMAGES } from "../services/constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Text from "./Text";
import { fontFamily } from "../theme/Fonts";
import colors from "../theme/Colors";

const Header = ({ showBackButton = true, showDrawerButton = true, name ,showNoti=true,navigation }) => {
  // const navigation = useNavigation();
  const [userProfile, setUserProfile] = useContext(ProfileContext);
  return (
    <View
      style={{
        width: "100%",
        height: moderateScale(70),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: moderateScale(10),
        backgroundColor:colors.primary
      }}
    >
      <View style={{ }}>
        {showBackButton ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{ width: moderateScale(22), height: moderateScale(22) ,marginLeft:moderateScale(5)}}
              resizeMode="contain"
              source={require("../assets/vectors/backarrow.png")}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              navigation.openDrawer();
            }}
          >
            <MaterialIcons name="menu" color="white" size={moderateScale(30)}/>
          </TouchableOpacity>
        )}
        
      </View>

      <Image source={require('../assets/drawerBuyerAssets/headerIcon.png')} resizeMode="contain" style={{width:moderateScale(40),height:moderateScale(40)}}/>
      <MaterialIcons name="menu" color={colors.primary} size={moderateScale(30)}/>
    </View>
  );
};

export default Header;
