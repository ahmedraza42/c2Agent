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
const Home = ({ navigation, route }) => {
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

  const getPopularProducts = async () => {
    try {
      const response = await API_CALLS.popularProducts(`?page_no=${1}`);
      if (response.status === true) {
        console.log("getPopularProducts", response);
        setProduct(response.data || []);
      }
    } catch (error) {
      console.log("getPopularProducts error", error);
    }
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

  if (loading) {
    return <Loader />;
  }
  return (
    <View style={styles.container}>
      <Header showBackButton={false} navigation={navigation} />
      <View
        style={{
          width: "100%",
          height: moderateScale(75),
          borderRadius: moderateScale(8),
          padding: moderateScale(4),
          marginTop: moderateScale(10),
          backgroundColor: "white",
          flexDirection: "row",
          paddingHorizontal: moderateScale(20),
          shadowColor: "rgba(0, 26, 77, 0.5)",
          shadowOpacity: 0.1,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 5,

          justifyContent: "space-between",
          alignItems: "center",
          elevation: 8,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{
              width: moderateScale(50),
              backgroundColor: "grey",
              height: moderateScale(50),
              borderRadius: moderateScale(25),
            }}
            source={{
              uri: "https://media.istockphoto.com/id/1440149723/photo/happy-man-social-media-phone-and-living-room-relax-typing-smartphone-and-online-communication.jpg?s=2048x2048&w=is&k=20&c=CcX1kHlcOLFpb5Mt1zYZMfujEFpn3a6vMvn3eQmwiVA=",
            }}
          />
          <View style={{ marginLeft: moderateScale(10) }}>
            <Text
              style={{
                fontFamily: fontFamily.Bold,
                fontSize: moderateScale(15),
              }}
            >
              Welcome
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.Medium,
                color: "rgba(21, 21, 21, 0.4)",
                fontSize: moderateScale(15),
              }}
            >
              {!isEmpty(userProfile) ? userProfile?.name : "---"}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: moderateScale(2) }}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.top10} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Qrcode");
            }}
          >
            <Image
              source={require("../assets/vectors/qrView.png")}
              resizeMode="contain"
              style={{ height: moderateScale(110), width: "100%" }}
            />
          </TouchableOpacity>

          <View style={{ height: moderateScale(160) }} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

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
});
