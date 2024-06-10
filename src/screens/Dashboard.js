import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "../components/Text";
import colors from "../theme/Colors";
import { moderateScale } from "react-native-size-matters";
import { fontFamily } from "../theme/Fonts";
import { ModalContext } from "../context/ModalContext";
import API_CALLS from "../services/constants";
import { ProfileContext } from "../context/ProfileContext";
import Header from "../components/Header";
import { MemoizedProducts } from "../components/MemoizedProducts";
import SearchInput from "../components/SearchInput";
import Loader from "../components/Loader";
import { isEmpty } from "lodash";
const Dashboard = ({ navigation, route }) => {
  let mainflatListRef = useRef(null);
  const [_, setModal] = useContext(ModalContext);
  const [userProfile, setUserProfile] = useContext(ProfileContext);
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // getProfile();
  }, []);
  useEffect(() => {
    callHomeApis();
  }, []);

  const callHomeApis = async () => {
    setLoading(true);
    //  await getPopularProducts()
    await getProfile();
    setLoading(false);
  };

  const getProfile = async () => {
    try {
      const response = await API_CALLS.getProfile();
      console.log("getProfile", response);
      if (response.status === true) {
        console.log("getProfile", response);
        setUserProfile((state) => ({
          ...state,
          ...response?.data?.user,
        }));
      }
    } catch (error) {
      console.log("getProfile error", error);
    }
  };
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.backArrow}
              resizeMode="contain"
              source={require("../assets/vectors/arrowBackBlack.png")}
            />
          </TouchableOpacity>
          <Text
            style={styles.headerText}
          >
            Dashboard
          </Text>
        </View>
      </View>
    );
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <View style={styles.container}>
     {renderHeader()}
      
      <View style={{ paddingHorizontal: moderateScale(15) }}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.top10} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ReferQr");
            }}
            style={styles.buttonView}
          >
            <Image
              source={require("../assets/vectors/dashboard.png")}
              resizeMode="contain"
              style={{ height: moderateScale(45), width:moderateScale(45)}}
            />

            <View style={{marginHorizontal:moderateScale(5)}}>
              <Text style={styles.firstText}>Dashboard</Text>
              <Text style={styles.secondText}>Share your referral QR code with the onboarding merchant</Text>
            </View>

            <Image
              source={require("../assets/vectors/homearrow.png")}
              resizeMode="contain"
              style={{ height: moderateScale(30), width:moderateScale(30)}}
            />
          </TouchableOpacity>
          
          <View style={{ height: moderateScale(160) }} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  creditLimit: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(17),
    color: colors.input,
    lineHeight: moderateScale(34),
  },
  ViewAllOpacity: {
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(30),
    width: moderateScale(65),
  },
  viewAll: {
    fontFamily: fontFamily.Bold,
    color: colors.primary,
    fontSize: moderateScale(15),
  },
  viewAllRowView: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: moderateScale(8),
  },
  sectionName: {
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(18),
  },

  top10: {
    marginTop: moderateScale(10),
  },
  buttonView:{
    flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:colors.primary,borderRadius:moderateScale(10),height:moderateScale(70),paddingHorizontal:moderateScale(10),marginBottom:moderateScale(10)
  },
  firstText:{
    fontSize:moderateScale(14),fontFamily:fontFamily.Bold,color:'white'
  },
  secondText:{
    fontSize:moderateScale(12),fontFamily:fontFamily.SemiBold,color:'rgba(255, 255, 255, 0.4)',width:moderateScale(200)
  },
  headerText:{
    marginLeft: moderateScale(15),
              fontFamily: fontFamily.Bold,
              fontSize: moderateScale(15),
              color: colors.white,
  },
  header: {
    width: "100%",
    height: moderateScale(60),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(10),
    backgroundColor: colors.primary,
  },
  backArrow: {
    width: moderateScale(22),
    height: moderateScale(22),
  },
});
