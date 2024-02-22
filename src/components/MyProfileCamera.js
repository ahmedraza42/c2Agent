import React from 'react'
import {
    Alert,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
  } from "react-native";
import { RNCamera } from "react-native-camera";
import { moderateScale } from 'react-native-size-matters';
import colors from '../theme/Colors';
import FontAwesome from "react-native-vector-icons/FontAwesome";
const MyProfileCamera=({cameraRef,takePicture,onClose,type='square'})=> {
  return (
    <RNCamera
    ref={cameraRef}
    style={styles.preview}
    type={RNCamera.Constants.Type.back}
    flashMode={RNCamera.Constants.FlashMode.off}
    autoFocus="on"
    androidCameraPermissionOptions={{
      title: "Permission to use camera",
      message: "We need your permission to use your camera",
      buttonPositive: "Ok",
      buttonNegative: "Cancel",
    }}
    androidRecordAudioPermissionOptions={{
      title: "Permission to use audio recording",
      message: "We need your permission to use your audio",
      buttonPositive: "Ok",
      buttonNegative: "Cancel",
    }}
  >
  <TouchableOpacity style={{position:'absolute',top:moderateScale(5),right:moderateScale(5)}} onPress={onClose}>
                  <FontAwesome
                    name={"window-close"}
                    color={colors.white}
                    size={moderateScale(30)}
                    style={{ marginRight: moderateScale(15),
    marginTop: moderateScale(15),}}
                  />
                </TouchableOpacity>
  
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: moderateScale(90),
      }}
    >
      <TouchableOpacity onPress={takePicture}
        style={{
          width: moderateScale(70),
          height: moderateScale(70),
          borderRadius: moderateScale(35),
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: moderateScale(60),
            height: moderateScale(60),
            borderRadius: moderateScale(30),
            backgroundColor: colors.darkPink,
          }}
        ></View>
      </TouchableOpacity>
    </View>
  </RNCamera>
  )
}

export default MyProfileCamera

const styles = StyleSheet.create({

    preview: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    capture: {
      flex: 0,
      backgroundColor: "#fff",
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: "center",
      margin: 20,
    },
  });