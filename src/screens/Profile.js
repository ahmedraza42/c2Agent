import React, { useContext, useEffect, useRef, useState } from 'react'
import { Alert, Image, Keyboard, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from '../components/Text'
import colors from '../theme/Colors'
import Header from '../components/Header'
import { moderateScale } from 'react-native-size-matters'
import ImagePicker from "react-native-image-crop-picker";
import PhoneInput from 'react-native-phone-number-input'
import Input from '../components/Input'
import { fontFamily } from '../theme/Fonts'
import Button from '../components/Button'
import { ProfileContext } from '../context/ProfileContext'
import API_CALLS from '../services/constants'
import { showToast } from '../components/Toast'
import { useCurrentUser } from '../CustomHooks'
import Loader from '../components/Loader'
import {  uploadProfileImage } from '../services/reusableApis'
import { UserCredentialContext } from '../context/UserCredentialContext'
import FastImage from 'react-native-fast-image'
import Modal from "react-native-modal";
import MyProfileCamera from '../components/MyProfileCamera'
import NormalHeader from '../components/NormalHeader'
const Profile=({navigation,route})=> {
  const cameraRef = useRef(null);
  const [userProfile, setUserProfile] = useContext(ProfileContext);
  const [userCredential, setUserCredential] = useContext(UserCredentialContext);
    const phoneInput = useRef(null);
    const [base, setBase] = useState(null);
    const [camera, setCamera] = useState(false);
    const [accountName, setAccountName] = useState(userProfile?.name||'');
    const [phoneNumber, setPhoneNumber] = useState(userProfile?.userPhoneNumber||"");
    const [email, setEmail] = useState("");
    const [countryCode, setCountryCode] = useState(userProfile?.userCountryCode||"AE");
    const [phoneCode, setPhoneCode] = useState(userProfile?.userPhoneCode||"+971");
    const [formattedValue, setFormattedValue] = useState(userProfile?.userPhoneCode+userProfile?.userPhoneNumber||"");
    const [imageTypeFront, setImageTypeFront] = useState("");
    const [imageUriFront, setImageUriFront] = useState("");
    const [imageFileNameFront, setImageFileNameFront] = useState("");
    const [btnloading, setbtnLoading] = React.useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = React.useState(true);
    useEffect(()=>{
      getProfile()
    },[])
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    console.log({userProfile})
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
   
    const getProfilee = async () => {
      try {
        let data={
          id: userCredential.id ,
        emailAddress: userCredential.emailAddress,
        }
        const response = await API_CALLS.getUserProfile(data);
        if (response.status === true) {
          console.log('user profile',response.payload)
          setAccountName(response?.payload?.username);
          setEmail(response?.payload?.email);
          setPhoneCode(response?.payload?.userPhoneCode||'+971')
          setCountryCode(response?.payload?.userCountryCode||'AE')
          console.log('response?.payload?.userPhoneNumber',response?.payload?.userPhoneNumber)
          setPhoneNumber(response?.payload?.userPhoneNumber||'')
          setPhoneNumber(response?.payload?.userPhoneNumber||'')
          setImageUriFront(response?.payload?.userProfileImagePath||'')
          setFormattedValue(response?.payload?.userPhoneCode + response?.payload?.userPhoneNumber);
          setUserProfile((state) => ({
            ...state,
            ...response.payload,
          }));
        }
      } catch (error) {
        console.log('user profile error',error)
      }
      finally{
        setLoading(false)
      }
    };
    const saveProfileInformation = () => {
      var validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      Keyboard.dismiss();
      navigation.navigate('Homes')
      return
      if (phoneInput?.current) {
        const checkValid = phoneInput.current?.isValidNumber(formattedValue);
        if (!checkValid) {
          showToast("Invalid Phone Number");
          return;
        }
      }
      if (accountName == null || accountName?.trim() === "") {
        showToast("Full Name is Required");
        return;
      } 
      updateProfile();
    };
    const updateProfile = async () => {
      let data = {
        "id": userId,
        "emailAddress" :userEmail,
        "username": accountName,
        "phoneCode":phoneCode,
        "phoneNumber": phoneNumber,
        "countryCode": countryCode
      };
      setbtnLoading(true);
      try {
        const res = await API_CALLS.editProfile(data);
        console.log({res})
        if (res.status == true) {
          showToast("Profile Updated");
          // setUserProfile((state) => ({
          //   ...state,
          //   ...res.model,
          // }));
          setbtnLoading(false);
          navigation.goBack();
        } else {
          setbtnLoading(false);
          showToast(res || "Something went wrong");
        }
      } catch (error) {
        setbtnLoading(false);
        console.log("updateProfile error", error);
        showToast("Something went wrong");
      }
    };
  
    const selectedImage = (uri) => {
        return (
          <FastImage
            source={{ uri: uri , priority: FastImage.priority.high,}}
            style={{ ...styles.image, backgroundColor: "grey" }}
            resizeMode={FastImage.resizeMode.cover}
          />
        );
      };

      const cameraImage = () => {
        return (
          <Image
            style={{ width: moderateScale(25), height: moderateScale(25) }}
            resizeMode="contain"
            source={require("../assets/vectors/CameraPlus.png")}
          />
        );
      };
      const newAlert = (type) => {
        Alert.alert(
          "Choose an action",
          "",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Pick from Gallery", onPress: () => openImagePicker(type) },
            { text: "Take a Photo", onPress: () => openImageCamera(type) },
          ],
          { cancelable: false }
        );
      };

      const openImagePicker = (type) => {
        ImagePicker.openPicker({
          mediaType: "photo",
          width: 500,
          height: 500,
          includeBase64:true
        }).then((data) => {
          const fileName = data.path.split("/").pop();
      setImageTypeFront(data.mime),
      setBase('data:image/jpeg;base64,'+data.data)
      let baseimage='data:image/jpeg;base64,'+data.data
        setImageFileNameFront(fileName),
        setImageUriFront(data.path);
          sendImage(data.mime, fileName, data.path,baseimage);
        });
      };
      const openImageCamera = (type) => {
        ImagePicker.openCamera({
          cropping: false,
        }).then((data) => {
          const fileName = data.path.split("/").pop();
          setImageTypeFront(data.mime),
            setImageFileNameFront(fileName),
            setImageUriFront(data.path);
          sendImage(data.mime, fileName, data.path);
        });
      };

      const sendImage = async (type, filename, uri,baseimage) => {
        setbtnLoading(true)
        let res = await uploadProfileImage(type, filename, uri,'pfp',baseimage);
        if (res?.status == true) {
          showToast("Profile Pic Uploaded");
        } else {
          showToast("Please try again");
        }
        setbtnLoading(false);
      };

     const takePicture = async () => {
        if (cameraRef?.current) {
          const options = { quality: 0.6, base64:true};
          const data = await cameraRef?.current.takePictureAsync(options);
          console.log(data);
          const filname = data.uri.split("/").pop();
          setImageTypeFront('image/jpg'),
          setImageFileNameFront(filname),
          setImageUriFront(data.uri);
          setBase('data:image/jpeg;base64,'+data.base64)
          setCamera(false)
        }
      };
    const renderProfilePic = (imageUriFront) => {
        return imageUriFront ? (
          <View>
            <TouchableOpacity style={styles.profilePicture} onPress={() => {}}>
              {selectedImage(imageUriFront)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                toggleModal()
              }}
              style={styles.cameraIcon}
            >
              {cameraImage()}
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              toggleModal()
            }}
          >
            <Image
              style={styles.image}
              source={require("../assets/drawerBuyerAssets/profileCircle.png")}
            />
          </TouchableOpacity>
        );
      };
      if (camera) {
        return (
          <MyProfileCamera cameraRef={cameraRef} takePicture={()=>takePicture()} onClose={()=>setCamera(false)}/>
        );
      } 
      return(
        <View style={styles.container}>
          <NormalHeader name={"My Profile"} />
          <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          style={styles.scrollViewContainer}
        >
        <View style={{flex:1}}>
        <View style={{ alignItems: "center" }}>
                {renderProfilePic(imageUriFront)}
              </View>
        </View>

        <Text style={{...styles.emailPassword,marginTop:moderateScale(15)}}>Full Name</Text>
        <Input
          placeholder={"Enter Name"}
          value={accountName}
          onChangeText={(t) =>
            setAccountName(
              t.replace(
                /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/gi,
                ""
              )
            )
          }
        />
        <View style={styles.top10}>
          <Text style={styles.emailPassword}>Email</Text>
          <Input
            placeholder="Enter Email Address"
            value={email}
            editable={false}
            onChangeText={(t) => setEmail(t)}
          />
        </View>
        <View style={styles.top10}>
          <Text style={styles.emailPassword}>Phone Number</Text>
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber||'333'}
            defaultCode={countryCode}
            value={phoneNumber}
            layout="second"
            onChangeText={(text) => {
              setPhoneNumber(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            onChangeCountry={(text) => {
              setPhoneCode("+" + text.callingCode[0]);
              setCountryCode(text.cca2);
            }}
            codeTextStyle={{
              fontFamily: fontFamily.Medium,
              fontSize: moderateScale(12),
            }}
            containerStyle={styles.phoneInputContainerStyle}
            textInputStyle={styles.phoneTextStyle}
            textContainerStyle={styles.phoneTextContainerStyle}
            countryPickerButtonStyle={styles.coutryPickerButtonStyle}
          />
        </View>
        <Button
          text={"SAVE"}
          loading={btnloading}
          mystyle={{ marginTop: moderateScale(20) }}
          onPress={() => {saveProfileInformation()}}
        />
        </ScrollView>
        </View>
      )
}

export default Profile

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      // paddingHorizontal: moderateScale(15),
    },
    scrollViewContainer: {
        backgroundColor: colors.background,
        paddingHorizontal:moderateScale(15)
      },
      image: {
        width: moderateScale(120),
        height: moderateScale(120),
        borderRadius: moderateScale(60),
        marginTop:moderateScale(20)
      },
      grey: {
        color: "rgba(34, 40, 56, 0.50)",
        paddingHorizontal: moderateScale(50),
      },
      cameraIcon: {
        position: "absolute",
        right: 3,
        bottom: 3,
        backgroundColor: colors.secondary,
        borderRadius: moderateScale(3),
        justifyContent: "center",
        alignItems: "center",
        padding: moderateScale(1),
      },
      top20: {
        marginTop: moderateScale(20),
      },
      top10: {
        marginTop: moderateScale(10),
        
      },
      emailPassword: {
        fontFamily: fontFamily.SemiBold,
        color: colors.input,
        fontSize: moderateScale(14),
        marginBottom: moderateScale(4),
        marginLeft: moderateScale(4),
      },
      phoneInputContainerStyle: {
        backgroundColor: 'rgba(237, 237, 237, 1)',
        height: moderateScale(50),
        borderRadius: moderateScale(8),
        paddingHorizontal: moderateScale(7),
        width: "100%",
      },
      phoneTextStyle: {
        fontFamily: fontFamily.Regular,
        fontSize: moderateScale(14),
        alignItems: "center",
        color: "black",
        height: moderateScale(40),
        backgroundColor: 'rgba(237, 237, 237, 1)',
      },
      phoneTextContainerStyle: {
        alignItems: "center",
        fontSize: moderateScale(10),
        color: "black",
        backgroundColor: 'rgba(237, 237, 237, 1)',
      },
      coutryPickerButtonStyle: {
        backgroundColor: "rgba(50, 80, 141, 0.2)",
        width: moderateScale(60),
        height: moderateScale(40),
        borderRadius: moderateScale(8),
        alignSelf: "center",
      },
  });