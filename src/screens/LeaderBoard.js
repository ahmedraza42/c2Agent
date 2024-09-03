import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { fontFamily } from "../theme/Fonts";
import { moderateScale } from "react-native-size-matters";
import colors from "../theme/Colors";
import Text from "../components/Text";
import API_CALLS from "../services/constants";
import { RadioButton } from "react-native-paper";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { showToast } from "../components/Toast";
import Retry from "../components/Retry";

const LeaderBoard = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = React.useState([]);
  const [checked, setChecked] = React.useState(null);
  const [commission, setCommission] = React.useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    callHomeApis();
  }, []);

  const callHomeApis = async () => {
    setError(null)
    setLoading(true);
    //  await getPopularProducts()
    await getPayment();
    setLoading(false);
  };

  const getPayment = async () => {
    try {
      const response = await API_CALLS.leaderboard();
      console.log("leaderboard", response);
      if (response.status === true) {
        setData(response.data);
      }
    } catch (error) {
      console.log("getPaymentMethods error", error);
      setError('fd')
    }
  };

  const navigateToNextPage = () => {
    console.log("fdfds");
    if (checked == null) {
      showToast("Please select payment method");
      return;
    }
    navigation.navigate("Commission2", { item: checked });
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
            style={{
              marginLeft: moderateScale(15),
              fontFamily: fontFamily.Bold,
              fontSize: moderateScale(15),
              color: colors.white,
            }}
          >
            Leaderboard
          </Text>
        </View>
      </View>
    );
  };
  if (loading) {
    return <Loader />;
  }
  if(error){
    return(
      <Retry  onPress={()=>callHomeApis()}/>
    )
  }
  return (
    <View style={styles.container}>
      {renderHeader()}
      <View style={{ padding: moderateScale(15) }}>
        {data?.length>0&&<View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: moderateScale(8),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={styles.rankText2}
            >
              Rank
            </Text>
            <Text
              style={styles.agent}
            >
              Agent
            </Text>
          </View>

          <Text
            style={styles.onboadingText}
          >
            Onboarding
          </Text>
        </View>}
        <FlatList
          data={data}
          keyExtractor={(item,index)=>{`item ${index}`}}
          renderItem={({ item, index }) => {
            return (
              <View
                style={styles.rootView}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={styles.rankView}
                  >
                    <Text
                      style={styles.rankText}
                    >
                      {item.rank}
                    </Text>
                  </View>
                  <Image
                    style={styles.userImage}
                    source={{ uri: item.image }}
                  />
                  <Text
                    style={styles.name}
                  >
                    {item.agent||"--"}
                  </Text>
                </View>

                <Text
                  style={styles.onBoarded}
                >
                  {item.onboarded}
                </Text>
              </View>
            );
          }}
          ListEmptyComponent={()=>{
            return(
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text>No Data Found</Text>
                </View>
            )
          }}
        />
        <View style={{ height: moderateScale(20) }} />
      </View>
    </View>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: moderateScale(15),
    backgroundColor: colors.white,
  },

  icon: {
    width: moderateScale(130),
    height: moderateScale(110),
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
  rootView:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: moderateScale(8),
    padding: moderateScale(8),
    backgroundColor: "white",
    width: "99%",
    margin: moderateScale(3),
    shadowColor: "rgba(0, 26, 77, 0.5)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    marginTop: moderateScale(5),
    elevation: 5,
  },
  rankView:{
    width: moderateScale(40),
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(40),
    backgroundColor: "rgba(255, 238, 225, 1)",
    borderRadius: moderateScale(20),
  },
  rankText:{
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(14),
    color: colors.primary,
  },
  userImage:{
    width: moderateScale(45),
    borderRadius: moderateScale(22),
    marginLeft: moderateScale(10),
    height: moderateScale(45),
  },
  name:{
    marginLeft: moderateScale(8),
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(14),
    width:moderateScale(170)
  },
  onBoarded:{
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(16),
    color: colors.primary,
  },
  rankText2:{
    marginLeft: moderateScale(8),
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(14),
    color: "rgba(21, 21, 21, 0.4)",
  },
  agent:{
    marginLeft: moderateScale(8),
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(14),
    marginLeft: moderateScale(10),
    color: "rgba(21, 21, 21, 0.4)",
  },
  onboadingText:{
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(14),
    color: "rgba(21, 21, 21, 0.4)",
  }
});
