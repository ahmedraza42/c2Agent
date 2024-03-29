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
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
import { requestLocationPermission } from "../utils/permission";
import { showToast } from "../components/Toast";
import { ModalContext } from "../context/ModalContext";
const ProfileMerchantt = ({ navigation, route }) => {
  let tradeFile=route.params.tradeFile||'';
  let vatFile=route.params.vatFile||{};
console.log({tradeFile})
console.log({vatFile})
const [pop, setModal] = useContext(ModalContext);
  const [btnloading, setBtnloading] = useState(false);
  const [_, setUser] = useContext(UserContext);
  const [data, setData] = useState([{ title: "Relevance", id: 8 }]);
  const [segment, setSegment] = useState([]);
  const [selectedsegment, setSelectedSegment] = useState('');
  const [subsegment, setsubSegment] = useState([]);
  const [selectedsubsegment, setSelectedsubSegment] = useState('');
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState(0.0);
  const [long, setLong] = useState(0.0);
  useEffect(() => {
    requestLocationPermission()
    getSetting();
  }, []);
  useEffect(() => {
    Geocoder.init("AIzaSyDipHIchD79mO4LM_C_54Hu9LkAfjVscUs");
    if (Platform.OS==='android' &&requestLocationPermission() ) {
      getLatLong()
    }
    else{
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization();
        Geolocation.setRNConfiguration({
          skipPermissionRequests: false,
         authorizationLevel: 'whenInUse',
       });

       getLatLong()
      }
    }
  }, []);

  const getLatLong = async () => {
    await Geolocation.getCurrentPosition(
      (position) => {
        console.log({ position });
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
        getAddress(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  console.log({lat})
  console.log({long})

  const getAddress = (lat, long) => {
    Geolocation.getCurrentPosition(info => console.log(info));
    Geocoder.from(lat, long)
      .then((json) => {
        var location = json.results[0].geometry.location;
        console.log(location);
      })
      .catch((error) => console.warn(error));
  };
  const getSetting = async () => {
    try {
      const response = await API_CALLS.appsetting();
      console.log({response})
      if (response.success === true) {
        setSegment(response?.merchant?.segments||[])
        setsubSegment(response?.merchant?.subSegments||[])
        setCountry(response?.country||[])
        setCity(response?.city||[])
      }
    } catch (error) {
      console.log("user profile error", error);
    }
  };
  const addMerchant = async () => {
    Keyboard.dismiss();
    // saveItemToStorage("showCompleteProfile", "true");
    // setUser((state) => ({
    //   ...state,
    //   isLoggedIn: true,
    //   isUserFirstTime: false,
    //   showCompleteProfile: true,
    // }));
    // return
    if (selectedsegment=== "") {
      showToast("Merchant Segment is required");
      return;
    } else if (selectedsubsegment === "") {
      showToast("Merchant Sub Segment is required");
      return;
    }
    else if (selectedCountry === "") {
      showToast("Country is required");
      return;
    }
    else if (selectedCity === "") {
      showToast("City is required");
      return;
    }else if (address.trim() === "") {
      showToast("Address is required");
      return;
    }
    else{
      setBtnloading(true)
      try {
        let data={
          // "name" :contact?.tradeLicenceName,
          // "owner_nationality_no" : contact?.emiratesid,
          // "owner_email" : contact?.email,
          // "representative_nationality_no" : contact?.representativeEmiratesid,
          // "representative_email" :  contact?.representativeEmail,
          "merchant_segment_id" : selectedsegment,
          "merchant_sub_segment_id" : selectedsubsegment,
          "latitude": lat||"0.00",
          "longitude" :long|| "0.00",
          "country_id" : selectedCountry,
          "city_id" : selectedCity,
          "address": address,
          on_boarded:true,
          "vat_filename" : vatFile,
          "trade_license_filename" : tradeFile
        }
        const response = await API_CALLS.merchantOnboarding(data);
        console.log({response})
        if (response.status === true) {
          // showToast(response.message||'Merchant Added')
          setModal((state) => ({
            ...state,
            heading: "Registration complete",
            subHeading:'Your account setup is now complete',
            visible: true,
            gotoHome:true
            // onButtonPress:{()=>{}}
            }));
          // saveItemToStorage("showCompleteProfile", "true");
          // setUser((state) => ({
          //   ...state,
          //   isLoggedIn: true,
          //   isUserFirstTime: false,
          //   showCompleteProfile: true,
          // }));
        }
      } catch (error) {
        console.log("addMerchant error",error);
        showToast(error?.message||error.response.message||error.response.data.message||'Something went wrong')
      }
      setBtnloading(false)
    }
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <Image
          source={require("../assets/icons/loginIcon.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{position:'absolute',top:moderateScale(10),left:moderateScale(10)}}>
        <Image
              style={{ width: moderateScale(20), height: moderateScale(20) ,marginLeft:moderateScale(5)}}
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
          <Text style={styles.categoryText}>Document</Text>
          </View>

          <View style={styles.rowCenter}>
          <View style={styles.primaryRound}>
                <Text style={styles.primaryNumber}>2</Text>
              </View>
          <Text style={styles.categoryText}>Contact</Text>
          </View>

          <View style={styles.rowCenter}>
          <View style={styles.primaryRound}>
                <Text style={styles.primaryNumber}>3</Text>
              </View>
          <Text style={styles.categoryText}>Merchant</Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          style={{ flex: 1 }}
        >
       
        <View style={styles.top10}/>
        <Text style={styles.emailPassword}>Merchant Segment</Text>
          <Dropdown data={segment} onSelect={(item,index)=>{setSelectedSegment(item.id)}}/>
           <Text style={styles.emailPassword}>Merchant Sub Segment</Text>
           <Dropdown data={subsegment} onSelect={(item,index)=>{setSelectedsubSegment(item.id)}}/>
         
         <View style={styles.cityCountryRowView}>
          <View style={{flex:1}}>
          <Text style={styles.emailPassword}>Country</Text>
           <Dropdown data={country} onSelect={(item,index)=>{setSelectedCountry(item.id)}}/>
          </View>
          <View style={{width:moderateScale(15)}}/>
          <View style={{flex:1}}>
          <Text style={styles.emailPassword}>City</Text>
           <Dropdown data={city} onSelect={(item,index)=>{setSelectedCity(item.id)}}/>
          </View>
         </View>

         <Text style={styles.emailPassword}>Address</Text>
          <Input
            placeholder={"Type Here"}
            value={address}
            onChangeText={(t)=>{setAddress(t)}}
          />
           <View style={{ marginVertical: moderateScale(20),
    height:moderateScale(200),}}>
          <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        // showsUserLocation
        showsMyLocationButton={true}
        region={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        zoomEnabled={true}
        minZoomLevel={20}>
        <Marker
          coordinate={{
            latitude: lat,
            longitude: long,
          }}
          key={'i29'}
          draggable={true}
          // onDrag={e=>{
          //   setLat(e.nativeEvent.coordinate.latitude)
          //   setLong(e.nativeEvent.coordinate.longitude)}}
        
          onDragEnd={e=>{
            setLat(e.nativeEvent.coordinate.latitude)
            setLong(e.nativeEvent.coordinate.longitude)}}
        />
        
      </MapView>
          </View>
         <View style={styles.top10}/>
          <Button
            loading={btnloading}
            text={"NEXT"}
            onPress={() => {
              addMerchant()
            }}
          />
          <View style={styles.top10}/>
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
  cityCountryRowView:{
    flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginVertical:moderateScale(5)
  },
  iconView: {
    flex: 0.5,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryRound:{
    width:moderateScale(24),height:moderateScale(24),
              justifyContent:'center',alignItems:'center',
              borderRadius:moderateScale(12),
              backgroundColor:colors.primary
  },
  greyRound:{
    width:moderateScale(24),height:moderateScale(24),
              justifyContent:'center',alignItems:'center',
              borderRadius:moderateScale(12),
              backgroundColor:'rgba(237, 237, 237, 1)'
  },
  primaryNumber:{
    fontFamily:fontFamily.Bold,fontSize:moderateScale(15),color:'white'
  },
  greyNumber:{
    fontFamily:fontFamily.Bold,fontSize:moderateScale(15),color:'rgba(21, 21, 21, 0.34)'
  },
  rowTopView:{
    flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginVertical:moderateScale(10)
  },
  rowCenter:{
    flexDirection:'row',alignItems:'center'
  },
  categoryText:{
    marginLeft:moderateScale(5),fontFamily:fontFamily.SemiBold,fontSize:moderateScale(13),
  },
  map: {
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
});

