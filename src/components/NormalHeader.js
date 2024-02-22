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

const NormalHeader = ({ showBackButton = true, showDrawerButton = true, name ,showNoti=true }) => {
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useContext(ProfileContext);
  return (
    <View
      style={{
        width: "100%",
        height: moderateScale(55),
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: moderateScale(10),
        backgroundColor:colors.primary
      }}
    >
      <View style={{flexDirection:'row',alignItems:'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{ width: moderateScale(22), height: moderateScale(22) ,marginLeft:moderateScale(5)}}
              resizeMode="contain"
              source={require("../assets/vectors/backarrow.png")}
            />
          </TouchableOpacity>
       
        <Text style={{fontFamily:fontFamily.Bold,fontSize:moderateScale(16),color:colors.white,marginLeft:moderateScale(20)}}>{name}</Text>
      </View>
    </View>
  );
};

export default NormalHeader;
