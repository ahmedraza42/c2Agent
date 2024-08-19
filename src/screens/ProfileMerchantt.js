import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "../components/Text";
import colors from "../theme/Colors";
import { moderateScale } from "react-native-size-matters";
import { fontFamily } from "../theme/Fonts";
import Button from "../components/Button";
import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoding";
import Input from "../components/Input";
import SelectDropdown from "react-native-select-dropdown";
import Dropdown from "../components/Dropdown";
import { UserContext } from "../context/UserContext";
import API_CALLS from "../services/constants";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MultiSelect from "react-native-multiple-select";
// import Geolocation from '@react-native-community/geolocation';
import { requestLocationPermission } from "../utils/permission";
import { showToast } from "../components/Toast";
import { ModalContext } from "../context/ModalContext";
import { isEmpty } from "lodash";
const ProfileMerchantt = ({ navigation, route }) => {
  let emiratesData = route.params.emiratesData || {};
  let drivingLisenceData = route.params.drivingLisenceData || {};
console.log({emiratesData})
console.log({drivingLisenceData})
  let arr = [];
  if (!isEmpty(emiratesData)) {
    for (let key in emiratesData) {
      var keys = emiratesData[key].keyName;
      arr.push({ [keys]: emiratesData[key].value });
    }
  }
  if (!isEmpty(drivingLisenceData)) {
    for (let key in drivingLisenceData) {
      var keys = drivingLisenceData[key].keyName;
      arr.push({ [keys]: drivingLisenceData[key].value });
    }
  }
  const [pop, setModal] = useContext(ModalContext);
  const [btnloading, setBtnloading] = useState(false);
  const [_, setUser] = useContext(UserContext);
  const [data, setData] = useState([{ title: "Relevance", id: 8 }]);
  const [segment, setSegment] = useState([]);
  const [subsegment, setsubSegment] = useState([]);
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsid, setSelectedItemsid] = useState([]);
  const [name, setName] = useState(emiratesData.Name || "");
  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = async () => {
    try {
      const response = await API_CALLS.appsetting();
      if (response.success === true) {
        setSegment(response?.merchant?.segments || []);
        setsubSegment(response?.merchant?.subSegments || []);
        setCountry(response?.country || []);
        setCity(response?.city || []);
      }
    } catch (error) {
      console.log("user profile error", error);
    }
  };
  const addMerchant = async () => {
    Keyboard.dismiss();
    if (name === "") {
      showToast("Full Name is required");
      return;
    } else if (selectedCountry === "") {
      showToast("Country is required");
      return;
    } else if (selectedCity === "") {
      showToast("City is required");
      return;
    } else {
      setBtnloading(true);
      try {
        let data = {
          name: name || "",
          country_id: selectedCountry,
          city_id: selectedItemsid,
          emirates_id:emiratesData,
          driving_license:drivingLisenceData
          // emirates_drivingLisence_data:arr,
          // emirates_id: arr[0]["Emirates ID"],
          // nationality: arr[2].Nationality,
          // driving_license_no: arr[4].LICENSE_NO,
          // place_of_issue: arr[5].PLACE_OF_ISSUE,
          // dob: arr[6].DATE_OF_BIRTH,
          // issue_date: arr[7].EXPIRY_DATE,
          // expiry_date: arr[8].ISSUE_DATE,
        };
        console.log({ data });
        const response = await API_CALLS.salesOnboardingv2(data);
        console.log({ response });
        if (response.status === true) {
          // showToast(response.message||'Merchant Added')
          setModal((state) => ({
            ...state,
            heading: "Registration complete",
            subHeading: "Your account setup is now complete",
            visible: true,
            gotoHome: true,
          }));
        }
      } catch (error) {
        console.log("addMerchant error", error);
        showToast(
          error?.message ||
            error.response.message ||
            error.response.data.message ||
            "Something went wrong"
        );
      }
      setBtnloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <Image
          source={require("../assets/icons/round.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            top: moderateScale(10),
            left: moderateScale(10),
          }}
        >
          <Image
            style={{
              width: moderateScale(20),
              height: moderateScale(20),
              marginLeft: moderateScale(5),
            }}
            resizeMode="contain"
            source={require("../assets/vectors/backarrow.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <Text style={styles.heading}>COMPLETE YOUR PROFILE</Text>

        <View style={styles.rowTopView}>
          <View style={styles.rowCenter}>
            <View style={styles.primaryRound}>
              <Text style={styles.primaryNumber}>1</Text>
            </View>
            <Text style={styles.categoryText}>Emirates ID</Text>
          </View>

          <View style={styles.rowCenter}>
            <View style={styles.primaryRound}>
              <Text style={styles.primaryNumber}>2</Text>
            </View>
            <Text style={styles.categoryText}>Driving License</Text>
          </View>

          <View style={styles.rowCenter}>
            <View style={styles.primaryRound}>
              <Text style={styles.primaryNumber}>3</Text>
            </View>
            <Text style={styles.categoryText}>Info</Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          style={{ flex: 1 }}
        >
          <View style={styles.top10} />
          <Text style={styles.emailPassword}>Full Name</Text>
          <Input
            placeholder={"Type Here"}
            value={name}
            onChangeText={(t) => {
              setName(t);
            }}
          />

          <View style={styles.cityCountryRowView}>
            <View style={{ flex: 1 }}>
              <Text style={styles.emailPassword}>Country</Text>
              <Dropdown
                data={country}
                onSelect={(item, index) => {
                  setSelectedCountry(item.id);
                }}
              />
            </View>
            {/* <View style={{width:moderateScale(15)}}/> */}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.emailPassword}>City</Text>
            <Dropdown
              data={city}
              onSelect={(item, index) => {
                let copy = [...selectedItems];
                let copyid = [...selectedItemsid];
                let indexs = copy.indexOf(item.name);
                console.log({ indexs });
                if (indexs == -1) {
                  copy.push(item.name);
                  copyid.push(item.id);
                  setSelectedItems(copy);
                  setSelectedItemsid(copyid);
                  setSelectedCity(item.id);
                } else {
                  showToast("Already Added");
                }
              }}
            />
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {selectedItems.map((item, index) => {
              return (
                <View
                  style={{
                    padding: moderateScale(5),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(237, 237, 237, 1)",
                    margin: moderateScale(5),
                    borderRadius: moderateScale(10),
                  }}
                >
                  <Text>{item}</Text>
                </View>
              );
            })}
          </View>

          <View style={styles.top10} />
          <Button
            loading={btnloading}
            text={"NEXT"}
            onPress={() => {
              addMerchant();
            }}
          />
          <View style={styles.top10} />
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileMerchantt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: moderateScale(15),
    backgroundColor: colors.white,
  },
  container2: {
    flex: 1.7,
    padding: moderateScale(15),
    backgroundColor: colors.white,
  },
  emailPassword: {
    fontFamily: fontFamily.SemiBold,
    color: colors.black,
    fontSize: moderateScale(14),
    marginBottom: moderateScale(4),
    marginLeft: moderateScale(4),
  },
  forgetPassword: {
    color: colors.input,
    fontFamily: fontFamily.SemiBold,
    fontSize: moderateScale(14),
  },
  forgotView: {
    marginVertical: moderateScale(13),
    alignItems: "flex-end",
  },
  top20: {
    marginTop: moderateScale(20),
  },
  justifyCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  top10: {
    marginTop: moderateScale(10),
  },
  clickableText: {
    color: colors.primary,
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(14),
    // textDecorationLine: "underline",
  },
  heading: {
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(20),
    color: colors.input,
  },
  goodToSee: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(13),
    color: colors.input,
    marginBottom: moderateScale(10),
  },
  icon: {
    width: moderateScale(80),
    height: moderateScale(80),
  },
  cityCountryRowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: moderateScale(5),
  },
  iconView: {
    flex: 0.5,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryRound: {
    width: moderateScale(24),
    height: moderateScale(24),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(12),
    backgroundColor: colors.primary,
  },
  greyRound: {
    width: moderateScale(24),
    height: moderateScale(24),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(12),
    backgroundColor: "rgba(237, 237, 237, 1)",
  },
  primaryNumber: {
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(15),
    color: "white",
  },
  greyNumber: {
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(15),
    color: "rgba(21, 21, 21, 0.34)",
  },
  rowTopView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: moderateScale(10),
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryText: {
    marginLeft: moderateScale(5),
    fontFamily: fontFamily.SemiBold,
    fontSize: moderateScale(13),
  },
  map: {
    height: "100%",
    ...StyleSheet.absoluteFillObject,
  },
});
