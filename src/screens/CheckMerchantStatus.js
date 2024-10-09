import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../theme/Colors";
import { moderateScale } from "react-native-size-matters";
import { fontFamily } from "../theme/Fonts";
import NormalHeader from "../components/NormalHeader";
import Text from "../components/Text";
import { MemoizedCart } from "../components/CartComponent";
import Button from "../components/Button";
import ShippingInfo from "../components/ShippingInfo";
import ImagePicker from "react-native-image-crop-picker";
import Modal from "react-native-modal";
import MyCamera from "../components/MyCamera";
import { LoaderContext } from "../context/LoaderContext";
import { isEmpty } from "lodash";
import API_CALLS from "../services/constants";
import { showToast } from "../components/Toast";
const CheckMerchantStatus = ({ navigation, route }) => {
  const cameraRef = useRef(null);
  const [_, setModal] = useContext(LoaderContext);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [camera, setCamera] = useState(false);
  const [shopname, setShopname] = useState('');
  const [shopAlreadyExist, setShopAlreadyExist] = useState(false);
  useEffect(() => { }, []);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };
  const openImagePicker = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      width: 500,
      height: 500,
      // cropping: true,
      includeBase64: true,
    }).then((data) => {
      const fileName = data.path.split("/").pop();
      sendImageFrontToBackend(data.data, data.path, fileName, data.mime)

    });
  };
  const sendImageFrontToBackend = async (base, uri, file, type) => {
    console.log({ uri })
    console.log({ file })
    console.log({ type })
    var dataa = new FormData();
    dataa.append("image", {
      uri: uri,
      type: type,
      name: file,
    });
    // JSON.stringify(base)
    try {
      setCamera(false);
      setModal((state) => ({
        ...state,
        heading: "Processing, Please wait",
        visible: true,
      }));
      const res = await API_CALLS.scanMerchant(dataa)
      console.log({ res })
      setModal((state) => ({
        ...state,
        visible: false,
      }));
      if (res.status == true) {
        console.log('sdsds')
        setShopname(res.message)
        setShopAlreadyExist(true)
        toggleModal2()
      }
      else {
        setModal((state) => ({
          ...state,
          visible: false,
        }));
        setShopAlreadyExist(false)
        setShopname(res?.message)
        toggleModal2()
      }


    } catch (error) {
      console.log('sendImageFrontToBackend', error)
      showToast('Please try again')
    } finally {
      setModal((state) => ({
        ...state,
        heading: "Processing, Please wait",
        visible: false,
      }));
      setCamera(false);
    }
  }

  takePicture = async () => {
    if (cameraRef?.current) {
      const options = { quality: 1, base64: true };
      const data = await cameraRef?.current.takePictureAsync(options);
      const fileName = data.uri.split("/").pop();
      sendImageFrontToBackend(data.base64, data.uri, fileName, "image/jpeg")
    }
  };
  if (camera) {
    return (
      <MyCamera
        cameraRef={cameraRef}
        takePicture={() => takePicture()}
        onClose={() => setCamera(false)}
        type="idcard"
      />
    );
  }
  return (
    <View style={styles.container}>
      <NormalHeader name={"Check Merchant Status"} />

      <View style={{ flex: 1 }}>

        <View style={{ flex: 1 }}>
          <Image style={{ width: '100%', height: moderateScale(280) }} resizeMode="contain" source={require('../assets/drawerBuyerAssets/merchantStatus2.png')} />
        </View>
        <View style={{ flex: 1.3 }}>
          <Text style={styles.checkMerchantStatusText}>Check Merchant Status</Text>
          <Text style={styles.uploadImageText}>Upload an image of the store to determine if the merchant is already onboarded in the system</Text>
          <View style={styles.top10} />
          <TouchableOpacity onPress={() => { toggleModal() }}>
            <Image style={{ width: '90%', alignSelf: 'center' }} resizeMode="contain" source={require('../assets/drawerBuyerAssets/merchantStatus3.png')} />

          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationIn={"fadeIn"}
        isVisible={isModalVisible}
        animationInTiming={300}
        onBackdropPress={() => toggleModal()}
        backdropOpacity={0.3}
      >
        <View
          style={styles.modalInnerView}
        >
          <Text
            style={styles.headingChooseAnAction}
          >
            Choose an action
          </Text>

          {/* <TouchableOpacity
            onPress={() => {
              toggleModal(), openDocument();
            }}
            style={{ paddingVertical: moderateScale(5) }}
          >
            <Text
              style={styles.modalText}
            >
              Upload Document
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              toggleModal(), openImagePicker();
            }}
            style={{ paddingVertical: moderateScale(5) }}
          >
            <Text
              style={styles.modalText}
            >
              Pick from Gallery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleModal(), setCamera(true);
            }}
            style={{ paddingVertical: moderateScale(5) }}
          >
            <Text
              style={styles.modalText}
            >
              Take a Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleModal()}
            style={styles.cancelButton}
          >
            <Text
              style={styles.cancelText}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationIn={"fadeIn"}
        isVisible={!isModalVisible2}
        animationInTiming={300}
        onBackdropPress={() => toggleModal2()}
        backdropOpacity={0.7}
      >
        <View style={{ ...styles.modalInnerView, justifyContent: 'center', alignItems: 'center' }}>


          {shopAlreadyExist == false ?
            <>
              <Text
                style={styles.subText}
              >
                Proceed with the onboarding of
              </Text>
              <Text
                style={{ ...styles.subText, color: colors.primary, fontFamily: fontFamily.SemiBold, fontSize: moderateScale(16) }}
              >
                {shopname}
              </Text>
            </>
            :
            <>
              <Text
                style={styles.subText2}
              >
                {shopname}
              </Text>
              <Text
                style={styles.subText}
              >
                {'is already onboarded'}
              </Text>
            </>
          }

          <View style={{ marginVertical: moderateScale(5), width: "100%" }}>
            <Button
              // loading={loading}
              text={shopAlreadyExist == false ? "PROCEED" : "TRY ANOTHER"}
              onPress={() => {
                toggleModal2();
                if(shopAlreadyExist == false){
                  navigation.goBack()
                }
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              toggleModal2();
              navigation.navigate("Homes");
            }}
          >
            <Text
              style={styles.returnToHome}
            >
              Return To Home
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>

  );
};

export default CheckMerchantStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  noData: {
    textAlign: "center",
    marginTop: moderateScale(15),
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(16),
  },
  line: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    height: moderateScale(1),
    marginVertical: moderateScale(20),
  },
  cancelText: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(14),
    color: colors.white,
  },
  modalText: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(14),
  },
  modalInnerView: {
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
  },
  headingChooseAnAction: {
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(18),
    marginBottom: moderateScale(5),
  },
  cancelButton: {
    alignSelf: "flex-end",
    padding: moderateScale(8),
    backgroundColor: colors.input,
    borderRadius: moderateScale(5),
  },
  checkCircleImage: {
    width: moderateScale(60), height: moderateScale(60)
  },
  doneText: {
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(17),
    marginTop: moderateScale(10),
  },
  subText: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(14),
    marginVertical: moderateScale(5),
    textAlign: 'center'
  },
  subText2: {
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(14),
    marginVertical: moderateScale(5),
    color: colors.primary,
    textAlign: 'center'
  },
  returnToHome: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(16),
    marginTop: moderateScale(5),
    color: colors.primary,
  },
  checkMerchantStatusText:{
    fontFamily: fontFamily.Bold, fontSize: moderateScale(16), textAlign: 'center'
  },
  uploadImageText:{
    fontFamily: fontFamily.Medium, paddingHorizontal: moderateScale(40), fontSize: moderateScale(14), textAlign: 'center', marginTop: moderateScale(8)
  }
});
