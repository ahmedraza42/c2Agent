import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "../components/Text";
import colors from "../theme/Colors";
import Header from "../components/Header";
import { moderateScale } from "react-native-size-matters";
import { fontFamily } from "../theme/Fonts";
import { Switch } from "react-native-paper";
import API_CALLS from "../services/constants";
import { useCurrentUser } from "../CustomHooks";
import Loader from "../components/Loader";
import { UserCredentialContext } from "../context/UserCredentialContext";
import Retry from "../components/Retry";
import { showToast } from "../components/Toast";
import NormalHeader from "../components/NormalHeader";

const Discounts = ({ navigation, route }) => {
  const [userCredential, setUserCredential] = useContext(UserCredentialContext);
  const [credit, setCredit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [switchLoading, setSwitchLoading] = useState(false);
  const [payment, setPayment] = useState([]);
  useEffect(() => {
    // getCredit();
  }, []);

  const getCredit = async () => {
    setError(null)
    setLoading(true);
    try {
      let data = {
        id: userCredential.id,
        emailAddress: userCredential.emailAddress,
      };
      console.log({data})
      const response = await API_CALLS.creditState(data);
      if (response.status === true) {
        setCredit(response.payload);
        // let dataa = [
        //   response.payload.CreditTotal,
        //   response.payload.CreditTotal,
        // ];
        // console.log({ dataa });
        // setCredit(dataa);
      }
    } catch (error) {
      setError("f");
      console.log("getCredit error", error);
    } finally {
      setLoading(false);
    }
  };


  // if (loading) {
  //   return <Loader />;
  // }

  // if (error) {
  //   return (
  //     <Retry
  //       onPress={() => {
  //         getCredit();
  //         getPyamentMethod();
  //       }}
  //     />
  //   );
  // }

  return (
    <View style={styles.container}>
      <NormalHeader name={"Discounts"} />

    </View>
  );
};

export default Discounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  walletRootView: {
    backgroundColor: colors.darkPink,
    height: moderateScale(130),
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
  },
  heading: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(18),
  },
  creditHeading: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(16),
    letterSpacing: moderateScale(0.48),
  },
  credit: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(30),
    letterSpacing: moderateScale(0.58),
  },
  paymentText: {
    fontSize: moderateScale(14),
    fontFamily: fontFamily.SemiBold,
  },
  paymentSubText: {
    fontSize: moderateScale(14),
    fontFamily: fontFamily.Regular,
  },
  paymentIcon: {
    width: moderateScale(45),
    height: moderateScale(45),
    marginHorizontal: moderateScale(10),
  },
  paymentButton: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    marginTop: moderateScale(10),
    width: "100%",
    height: moderateScale(60),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
