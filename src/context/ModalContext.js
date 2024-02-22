import React, { useContext, useState } from "react";
import { moderateScale } from "react-native-size-matters";
import Modal from "react-native-modal";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../theme/Colors";
import { fontFamily } from "../theme/Fonts";
import Text from "../components/Text";
import { Image } from "react-native-animatable";
import Button from "../components/Button";
import { UserContext } from "./UserContext";
import { saveItemToStorage } from "../utils/storage";
export const ModalContext = React.createContext({});

export const ModalProvider = ({ children }) => {
  const [_, setUser] = useContext(UserContext);
  const [state, setState] = useState({
    visible: false,
    heading: "",
    subHeading:'',
    cancelText: "",
    confirmText: "",
    gotoHome:false,
    onButtonPress: () => {},
    onBack: () => {},
  });

  return (
    <ModalContext.Provider value={[state, setState]}>
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
              <Text style={styles.subHeading}>
               {state.subHeading}
              </Text>
              <View style={styles.rowCenter}>
               
                <Button text={"DONE"} mystyle={styles.btn}  onPress={() => {
                  if(state.gotoHome){
                    saveItemToStorage("showCompleteProfile", "true");
                    setState((state) => ({
                      ...state,
                      visible: false,
                    }));
                    setUser((state) => ({
                      ...state,
                      isLoggedIn: true,
                      isUserFirstTime: false,
                      showCompleteProfile: true,
                    }));
                  }
                  else{
                    setState((state) => ({
                      ...state,
                      visible: false,
                    }));
                  }
                   
                  }} />
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
    </ModalContext.Provider>
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
    fontFamily: fontFamily.Bold,
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
