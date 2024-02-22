import React, { useState } from "react";
import { moderateScale } from "react-native-size-matters";
import Modal from "react-native-modal";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../theme/Colors";
import { fontFamily } from "../theme/Fonts";
import Text from "../components/Text";
import { Image } from "react-native-animatable";
import Button from "../components/Button";
export const LoaderContext = React.createContext({});

export const LoaderProvider = ({ children }) => {
  const [state, setState] = useState({
    visible: false,
    heading: "",
    subHeading:'',
    cancelText: "",
    confirmText: "",
    onButtonPress: () => {},
    onBack: () => {},
  });

  return (
    <LoaderContext.Provider value={[state, setState]}>
      {children}
      {state.visible ? (
        <View>
          <Modal
            animationIn={"fadeIn"}
            isVisible={state.visible}
            animationInTiming={300}
            backdropOpacity={0.7}
          >
            <View
              style={{
                ...styles.modalInnerViewWithButton,
                backgroundColor: colors.white,
              }}
            >
              

              <Text style={styles.heading}>
               {state.heading}
              </Text>
              <View style={{ marginVertical: moderateScale(10),}}>
              <ActivityIndicator size={'large'} color={colors.primary}/>
              </View>
             
            </View>
          </Modal>
        </View>
      ) : null}
    </LoaderContext.Provider>
  );
};

const styles = StyleSheet.create({
  modalRootView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
  },

  modalInnerViewWithButton: {
    width: "100%",
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    alignItems: "center",
    justifyContent: "center",
  },
  mediumText: {
    color: colors.black,
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(14),
  },
  imageView: {
    width: moderateScale(45),
    height: moderateScale(45),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.darkPink,
    borderRadius: moderateScale(10),
  },
  heading: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(20),
    textAlign: "center",
    marginTop: moderateScale(10),
    // letterSpacing:moderateScale(0.12),
    // lineHeight:moderateScale(18)
  },
  subHeading: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(15),
    textAlign: "center",
    marginVertical: moderateScale(10),
    letterSpacing:moderateScale(0.12),
    lineHeight:moderateScale(18)
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    marginVertical: moderateScale(10),
    height: moderateScale(45),
    width: "100%",
  },
  BoldText:{
    fontFamily:fontFamily.Bold,
    fontSize:moderateScale(16)
  }
});
