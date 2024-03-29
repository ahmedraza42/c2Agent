import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
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
import ImagePicker from "react-native-image-crop-picker";
import FileViewer from "react-native-file-viewer";
import { showToast } from "../components/Toast";
import { RNCamera } from "react-native-camera";
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from "react-native-document-picker";
import { uploadImage } from "../services/reusableApis";
import Modal from "react-native-modal";
import MyCamera from "../components/MyCamera";
import { getItemFromStorage } from "../utils/storage";
import API_CALLS from "../services/constants";
import { ModalContext } from "../context/ModalContext";
import { LoaderContext } from "../context/LoaderContext";
import Input from "../components/Input";
const ProfileDocument = ({ navigation, route }) => {
  const cameraRef = useRef(null);

  const [imageTypeTrade, setImageTypeTrade] = useState("");
  const [baseTrade, setBaseTrade] = useState(null);
  const [imageUriTrade, setImageUriTrade] = useState("");
  const [imageFileNameTrade, setImageFileNameTrade] = useState("");

  const [isModalVisible, setModalVisible] = useState(false);
  const [isDocument, setIsDocument] = useState(false);
  const [isDocumenttrade, setIsDocumentTrade] = useState(false);
  const [btnloading, setBtnloading] = useState(false);
  const [camera, setCamera] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [tradeData, setTradeData] = useState([]);
  const [showOcrData, setShowOcrData] = useState(false);
  const [dataFileName, setDataFileName] = useState('');
  const [_, setModal] = useContext(LoaderContext);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(()=>{
   
  },[])
console.log(dataFileName)
  const sendImage = async (type, filename, uri, key) => {
    if (uri == "") {
      showToast("Trade License is required");
    } 
    // else if(imageUriVat == ""){
    //   showToast("VAT Certificate is required");
    // }
    else{
      // setBtnloading(true);
      setModal((state) => ({
        ...state,
        heading: "Processing, Please wait",
        visible: true,
        }));
      var dataa = new FormData();
      dataa.append("trade_license", {
        uri: uri,
        type: type,
        name: filename,
      });
      // dataa.append("vat_certificate", {
      //   uri: imageUriVat,
      //   type: imageTypeVat,
      //   name: imageFileNameVat,
      // });
  
      console.log(dataa);
      let data = dataa;
      try {
        const res = await API_CALLS.ocr(data);
        console.log({ res });
        if (res.status == true) {
          setDataFileName(res?.data?.trade_license?.filename)
          let arr = [];
          for (let key in res?.data?.trade_license?.data) {
            arr.push({keyName:key,value: res.data.trade_license?.data[key]});
        }
        console.log({arr})
          setTradeData(arr)
          setShowOcrData(true)
          setBtnloading(false);
        } else {
          console.log("response", res);
          throw res;
        }
      } catch (error) {
        console.log("trade error", error);
        setShowOcrData(false)
        showToast(error?.message||"Please try again");
        setIsDocumentTrade(false)
        setImageFileNameTrade('')
        setImageTypeTrade('')
        setImageUriTrade('')
      }finally{
        setModal((state) => ({
          ...state,
          heading: "Processing, Please wait",
          visible: false,
          }));
      }
    }
 
    setBtnloading(false);
  };

  const handleError = (err) => {
    if (isCancel(err)) {
      console.log("cancelled");
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.log(
        "multiple pickers were opened, only the last will be considered"
      );
    } else {
      console.log(err);
    }
  };

  const openDocument = async () => {
    try {
      const data = await DocumentPicker.pickSingle({
        presentationStyle: "fullScreen",
        copyTo: "cachesDirectory",
        type: [DocumentPicker.types.pdf],
        
      });
        setImageTypeTrade(data.type),
          setImageFileNameTrade(data.name),
          setImageUriTrade(data.uri);
        setBaseTrade(null);
        setIsDocumentTrade(true);
      sendImage(data.type,data.name,data.uri)
    } catch (e) {
      handleError(e);
    }
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

  const selectedImage = (uri) => {
    return (
      <View>
        <Image
          source={{ uri: uri }}
          style={{ ...styles.image, backgroundColor: "grey" }}
          resizeMode={"cover"}
        />
        <TouchableOpacity
          onPress={() => {
            setTimeout(() => {
              toggleModal();
            }, 250);
          }}
          style={styles.cameraIcon}
        >
          {cameraImage()}
        </TouchableOpacity>
      </View>
    );
  };

  const openImagePicker = (type) => {
    ImagePicker.openPicker({
      mediaType: "photo",
      width: 700,
      height: 700,
      // cropping: true,
      includeBase64: true,
    }).then((data) => {
       const fileName = data.path.split("/").pop();
        setImageTypeTrade(data.mime),
          setBaseTrade("data:image/jpeg;base64," + data.data);
        setImageFileNameTrade(fileName), setImageUriTrade(data.path);
        setIsDocumentTrade(false);
        sendImage(data.mime,fileName,"data:image/jpeg;base64," + data.data)
    });
  };

 const takePicture = async () => {
    if (cameraRef?.current) {
      const options = { quality: 0.6, base64: true };
      const data = await cameraRef?.current.takePictureAsync(options);
     
        const filname = data.uri.split("/").pop();
        setImageTypeTrade("image/jpg"),
          setImageFileNameTrade(filname),
          setImageUriTrade(data.uri);
        setBaseTrade("data:image/jpeg;base64," + data.base64);
        setCamera(false);
        setIsDocumentTrade(false);
        sendImage("image/jpg",filname,"data:image/jpeg;base64," + data.base64)
    }
  };
  if (camera) {
    return (
      <MyCamera
        cameraRef={cameraRef}
        takePicture={() => takePicture()}
        onClose={() => setCamera(false)}
        type="square"
      />
    );
  }

  const rendertrade = (imageUriFront) => {
    return imageUriFront ? (
      <View style={{ alignItems: "center" }}>
        {selectedImage(imageUriFront)}
      </View>
    ) : (
      <TouchableOpacity
        onPress={() => {
          setSelectedType("trade");
          setTimeout(() => {
            toggleModal();
          }, 250);
        }}
        style={styles.imageRootView}
      >
        <Image
          source={require("../assets/vectors/fileUnselected.png")}
          style={{ width: moderateScale(45), height: moderateScale(70) }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontFamily: fontFamily.Medium,
            fontSize: moderateScale(15),
            color: colors.lightText,
          }}
        >
          Upload
        </Text>
      </TouchableOpacity>
    );
  };


  const removeTrade = () => {
    setImageTypeTrade(""), setImageFileNameTrade(""), setImageUriTrade("");
    setIsDocumentTrade(false);
    setTradeData([])
    setDataFileName('')
    setShowOcrData(false)
  };
  const renderKey=(tradeData)=>{
    console.log(tradeData,'dsdsd')
    return tradeData?.map((item,index)=>{
      return(
<View>
<Text style={styles.emailPassword}>{item.keyName}</Text>
          <Input
            editable={false}
            value={item.value}
          />
      </View>
    )})
    
  }
  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <Image
          source={require("../assets/icons/loginIcon.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <View style={styles.container2}>
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          style={{ flex: 1 }}
        > */}
          <Text style={styles.heading}>COMPLETE YOUR PROFILE</Text>

          <View
            style={styles.rowTopView}
          >
            <View style={styles.rowCenter}>
              <View style={styles.primaryRound}>
                <Text style={styles.primaryNumber}>1</Text>
              </View>
              <Text style={styles.categoryText}>Trade License</Text>
            </View>

            <View style={styles.rowCenter}>
              <View style={styles.greyRound}>
                <Text style={styles.greyNumber}>2</Text>
              </View>
              <Text
                style={{
                  ...styles.categoryText,
                  color: "rgba(21, 21, 21, 0.4)",
                }}
              >
                VAT Certificate
              </Text>
            </View>

            <View style={styles.rowCenter}>
              <View style={styles.greyRound}>
                <Text style={styles.greyNumber}>3</Text>
              </View>
              <Text
                style={{
                  ...styles.categoryText,
                  color: "rgba(21, 21, 21, 0.4)",
                }}
              >
                Merchant
              </Text>
            </View>
          </View>
          {/* <View style={styles.top10} /> */}

          <Text style={styles.emailPassword}>Trade License</Text>
          {isDocumenttrade ? (
            <View style={styles.imageRootView}>
              <Image
                source={require("../assets/vectors/file.png")}
                style={{ width: moderateScale(45), height: moderateScale(70) }}
                resizeMode="contain"
              />
              <Text style={styles.filename}>{imageFileNameTrade}</Text>
              <TouchableOpacity
                onPress={() => {
                  removeTrade();
                }}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ) : (
            rendertrade(imageUriTrade)
          )}
          <Text style={styles.uploadText}>Upload PDF or picture</Text>
          <View style={styles.top10} />
          {showOcrData&&
          <View style={{height:moderateScale(210),marginBottom:moderateScale(10)}}>
          <ScrollView>
          
          {renderKey(tradeData)}
          
          </ScrollView>
          </View>
         }
         {showOcrData&&<Button
            loading={btnloading}
            text={"NEXT"}
            onPress={() => {
              if(dataFileName){
                navigation.navigate("ProfileContact",{item:dataFileName});
              }else{
                showToast('Trade License is required')
              }
              
              // sendImage()
            }}
          />}
        {/* </ScrollView> */}
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

          <TouchableOpacity
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
          </TouchableOpacity>
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
    </View>
  );
};

// const ProfileDocument = ({ navigation, route }) => {
//   const cameraRef = useRef(null);
//   const [imageTypeVat, setImageTypeVat] = useState("");
//   const [baseVat, setBaseVat] = useState(null);
//   const [imageUriVat, setImageUriVat] = useState("");
//   const [imageFileNameVat, setImageFileNameVat] = useState("");

//   const [imageTypeTrade, setImageTypeTrade] = useState("");
//   const [baseTrade, setBaseTrade] = useState(null);
//   const [imageUriTrade, setImageUriTrade] = useState("");
//   const [imageFileNameTrade, setImageFileNameTrade] = useState("");

//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isDocument, setIsDocument] = useState(false);
//   const [isDocumenttrade, setIsDocumentTrade] = useState(false);
//   const [btnloading, setBtnloading] = useState(false);
//   const [camera, setCamera] = useState(false);
//   const [selectedType, setSelectedType] = useState("");
//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };
//   useEffect(()=>{
//     let showCompleteProfile =  getItemFromStorage(
//       "showCompleteProfile"
//     );
//     console.log({showCompleteProfile})
//   },[])

//   const sendImage = async (type, filename, uri, key) => {
//     if (imageUriTrade == "") {
//       showToast("Trade License is required");
//     } 
//     else if(imageUriVat == ""){
//       showToast("VAT Certificate is required");
//     }
//     else{
//       setBtnloading(true);
//       var dataa = new FormData();
//       dataa.append("trade_license", {
//         uri: imageUriTrade,
//         type: imageTypeTrade,
//         name: imageFileNameTrade,
//       });
//       dataa.append("vat_certificate", {
//         uri: imageUriVat,
//         type: imageTypeVat,
//         name: imageFileNameVat,
//       });
  
//       console.log(dataa);
//       let data = dataa;
//       try {
//         const res = await API_CALLS.ocr(data);
//         console.log({ res });
//         if (res.status == true) {
//           showToast("Uploaded");
//           navigation.navigate("ProfileContact",{item:res.data});
//           setBtnloading(false);
//           // navigation.navigate("ProfileVatLicense");
//         } else {
//           console.log("response", res);
//           throw res;
//         }
//       } catch (error) {
//         console.log("trade error", error);
//         showToast(error?.message||"Please try again");
//       }
//     }
 
//     setBtnloading(false);
//   };

//   const handleError = (err) => {
//     if (isCancel(err)) {
//       console.log("cancelled");
//       // User cancelled the picker, exit any dialogs or menus and move on
//     } else if (isInProgress(err)) {
//       console.log(
//         "multiple pickers were opened, only the last will be considered"
//       );
//     } else {
//       console.log(err);
//     }
//   };

//   const openDocument = async () => {
//     try {
//       const data = await DocumentPicker.pickSingle({
//         presentationStyle: "fullScreen",
//         copyTo: "cachesDirectory",
//         type: [DocumentPicker.types.pdf],
        
//       });
//       if (selectedType === "vat") {
//         setImageTypeVat(data.type),
//           setImageFileNameVat(data.name),
//           setImageUriVat(data.uri);
//         setBaseVat(null);
//         setIsDocument(true);
//       } else {
//         setImageTypeTrade(data.type),
//           setImageFileNameTrade(data.name),
//           setImageUriTrade(data.uri);
//         setBaseTrade(null);
//         setIsDocumentTrade(true);
//       }
//     } catch (e) {
//       handleError(e);
//     }
//   };

//   const cameraImage = () => {
//     return (
//       <Image
//         style={{ width: moderateScale(25), height: moderateScale(25) }}
//         resizeMode="contain"
//         source={require("../assets/vectors/CameraPlus.png")}
//       />
//     );
//   };

//   const selectedImage = (uri) => {
//     return (
//       <View>
//         <Image
//           source={{ uri: uri }}
//           style={{ ...styles.image, backgroundColor: "grey" }}
//           resizeMode={"cover"}
//         />
//         <TouchableOpacity
//           onPress={() => {
//             setTimeout(() => {
//               toggleModal();
//             }, 250);
//           }}
//           style={styles.cameraIcon}
//         >
//           {cameraImage()}
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   const openImagePicker = (type) => {
//     ImagePicker.openPicker({
//       mediaType: "photo",
//       width: 700,
//       height: 700,
//       // cropping: true,
//       includeBase64: true,
//     }).then((data) => {
//       if (selectedType === "vat") {
//         const fileName = data.path.split("/").pop();
//         setImageTypeVat(data.mime),
//           setBaseVat("data:image/jpeg;base64," + data.data);
//         setImageFileNameVat(fileName), setImageUriVat(data.path);
//         setIsDocument(false);
//       } else {
//         const fileName = data.path.split("/").pop();
//         setImageTypeTrade(data.mime),
//           setBaseTrade("data:image/jpeg;base64," + data.data);
//         setImageFileNameTrade(fileName), setImageUriTrade(data.path);
//         setIsDocumentTrade(false);
//       }
//     });
//   };

//  const takePicture = async () => {
//     if (cameraRef?.current) {
//       const options = { quality: 0.6, base64: true };
//       const data = await cameraRef?.current.takePictureAsync(options);
//       if (selectedType === "vat") {
//         const filname = data.uri.split("/").pop();
//         setImageTypeVat("image/jpg"),
//           setImageFileNameVat(filname),
//           setImageUriVat(data.uri);
//         setIsDocument(false);
//         setBaseVat("data:image/jpeg;base64," + data.base64);
//         setCamera(false);
//         setIsDocument(false);
//       } else {
//         const filname = data.uri.split("/").pop();
//         setImageTypeTrade("image/jpg"),
//           setImageFileNameTrade(filname),
//           setImageUriTrade(data.uri);
//         setBaseTrade("data:image/jpeg;base64," + data.base64);
//         setCamera(false);
//         setIsDocumentTrade(false);
//       }
//     }
//   };
//   if (camera) {
//     return (
//       <MyCamera
//         cameraRef={cameraRef}
//         takePicture={() => takePicture()}
//         onClose={() => setCamera(false)}
//         type="square"
//       />
//     );
//   }

//   const renderVat = (imageUriFront) => {
//     return imageUriFront ? (
//       <View style={{ alignItems: "center" }}>
//         {selectedImage(imageUriFront)}
//       </View>
//     ) : (
//       <TouchableOpacity
//         onPress={() => {
//           setSelectedType("vat");
//           setTimeout(() => {
//             toggleModal();
//           }, 250);
//         }}
//         style={styles.imageRootView}
//       >
//         <Image
//           source={require("../assets/vectors/fileUnselected.png")}
//           style={{ width: moderateScale(45), height: moderateScale(70) }}
//           resizeMode="contain"
//         />
//         <Text
//           style={{
//             fontFamily: fontFamily.Medium,
//             fontSize: moderateScale(15),
//             color: colors.lightText,
//           }}
//         >
//           Upload
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   const rendertrade = (imageUriFront) => {
//     return imageUriFront ? (
//       <View style={{ alignItems: "center" }}>
//         {selectedImage(imageUriFront)}
//       </View>
//     ) : (
//       <TouchableOpacity
//         onPress={() => {
//           setSelectedType("trade");
//           setTimeout(() => {
//             toggleModal();
//           }, 250);
//         }}
//         style={styles.imageRootView}
//       >
//         <Image
//           source={require("../assets/vectors/fileUnselected.png")}
//           style={{ width: moderateScale(45), height: moderateScale(70) }}
//           resizeMode="contain"
//         />
//         <Text
//           style={{
//             fontFamily: fontFamily.Medium,
//             fontSize: moderateScale(15),
//             color: colors.lightText,
//           }}
//         >
//           Upload
//         </Text>
//       </TouchableOpacity>
//     );
//   };
//   const removeVAT = () => {
//     setImageTypeVat(""), setImageFileNameVat(""), setImageUriVat("");
//     setIsDocument(false);
//   };

//   const removeTrade = () => {
//     setImageTypeTrade(""), setImageFileNameTrade(""), setImageUriTrade("");
//     setIsDocumentTrade(false);
//   };
//   return (
//     <View style={styles.container}>
//       <View style={styles.iconView}>
//         <Image
//           source={require("../assets/icons/loginIcon.png")}
//           style={styles.icon}
//           resizeMode="contain"
//         />
//       </View>
//       <View style={styles.container2}>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           automaticallyAdjustKeyboardInsets={true}
//           style={{ flex: 1 }}
//         >
//           <Text style={styles.heading}>COMPLETE YOUR PROFILE</Text>

//           <View
//             style={styles.rowTopView}
//           >
//             <View style={styles.rowCenter}>
//               <View style={styles.primaryRound}>
//                 <Text style={styles.primaryNumber}>1</Text>
//               </View>
//               <Text style={styles.categoryText}>Document</Text>
//             </View>

//             <View style={styles.rowCenter}>
//               <View style={styles.greyRound}>
//                 <Text style={styles.greyNumber}>2</Text>
//               </View>
//               <Text
//                 style={{
//                   ...styles.categoryText,
//                   color: "rgba(21, 21, 21, 0.4)",
//                 }}
//               >
//                 Contact Details
//               </Text>
//             </View>

//             <View style={styles.rowCenter}>
//               <View style={styles.greyRound}>
//                 <Text style={styles.greyNumber}>3</Text>
//               </View>
//               <Text
//                 style={{
//                   ...styles.categoryText,
//                   color: "rgba(21, 21, 21, 0.4)",
//                 }}
//               >
//                 Merchant
//               </Text>
//             </View>
//           </View>
//           <View style={styles.top10} />

//           <Text style={styles.emailPassword}>VAT Certificate</Text>

//           {isDocument ? (
//             <TouchableOpacity style={styles.imageRootView}>
//               <Image
//                 source={require("../assets/vectors/file.png")}
//                 style={{ width: moderateScale(45), height: moderateScale(70) }}
//                 resizeMode="contain"
//               />
//               <Text style={styles.filename}>{imageFileNameVat}</Text>
//               <TouchableOpacity
//                 onPress={() => {
//                   removeVAT();
//                 }}
//               >
//                 <Text style={styles.removeText}>Remove</Text>
//               </TouchableOpacity>
//             </TouchableOpacity>
//           ) : (
//             renderVat(imageUriVat)
//           )}
//           <Text style={styles.uploadText}>Upload PDF or picture</Text>

//           <View style={styles.top10} />
//           <Text style={styles.emailPassword}>Trade License</Text>
//           {isDocumenttrade ? (
//             <TouchableOpacity style={styles.imageRootView}>
//               <Image
//                 source={require("../assets/vectors/file.png")}
//                 style={{ width: moderateScale(45), height: moderateScale(70) }}
//                 resizeMode="contain"
//               />
//               <Text style={styles.filename}>{imageFileNameTrade}</Text>
//               <TouchableOpacity
//                 onPress={() => {
//                   removeTrade();
//                 }}
//               >
//                 <Text style={styles.removeText}>Remove</Text>
//               </TouchableOpacity>
//             </TouchableOpacity>
//           ) : (
//             rendertrade(imageUriTrade)
//           )}
//           <Text style={styles.uploadText}>Upload PDF or picture</Text>
//           <View style={styles.top10} />
//           <Button
//             loading={btnloading}
//             text={"NEXT"}
//             onPress={() => {
//               sendImage()
//             }}
//           />
//         </ScrollView>
//       </View>
//       <Modal
//         animationIn={"fadeIn"}
//         isVisible={isModalVisible}
//         animationInTiming={300}
//         onBackdropPress={() => toggleModal()}
//         backdropOpacity={0.3}
//       >
//         <View
//           style={styles.modalInnerView}
//         >
//           <Text
//             style={styles.headingChooseAnAction}
//           >
//             Choose an action
//           </Text>

//           <TouchableOpacity
//             onPress={() => {
//               toggleModal(), openDocument();
//             }}
//             style={{ paddingVertical: moderateScale(5) }}
//           >
//             <Text
//               style={styles.modalText}
//             >
//               Upload Document
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => {
//               toggleModal(), openImagePicker();
//             }}
//             style={{ paddingVertical: moderateScale(5) }}
//           >
//             <Text
//                style={styles.modalText}
//             >
//               Pick from Gallery
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => {
//               toggleModal(), setCamera(true);
//             }}
//             style={{ paddingVertical: moderateScale(5) }}
//           >
//             <Text
//               style={styles.modalText}
//             >
//               Take a Photo
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => toggleModal()}
//             style={styles.cancelButton}
//           >
//             <Text
//               style={styles.cancelText}
//             >
//               Cancel
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

export default ProfileDocument;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: moderateScale(15),
    backgroundColor: colors.white,
  },
  container2: {
    flex: 1.7,
    paddingHorizontal: moderateScale(15),
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
    marginVertical:moderateScale(5)
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
  iconView: {
    flex: 0.5,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  imageRootView: {
    height: moderateScale(120),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(237, 237, 237, 1)",
    borderRadius: moderateScale(8),
  },
  uploadText: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(15),
    color: colors.lightText,
    textAlign: "right",
    marginTop: moderateScale(8),
  },
  removeText: {
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(15),
    color: colors.primary,
  },
  image: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(20),
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
    marginLeft: moderateScale(3),
    fontFamily: fontFamily.SemiBold,
    fontSize: moderateScale(12),
  },
  filename: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(15),
    color: colors.lightText,
  },
  cancelButton:{
    alignSelf: "flex-end",
    padding: moderateScale(8),
    backgroundColor: colors.input,
    borderRadius: moderateScale(5),
  },
  cancelText:{
    fontFamily: fontFamily.Medium,
                fontSize: moderateScale(14),
                color: colors.white,
  },
  modalText:{
    fontFamily: fontFamily.Medium,
                fontSize: moderateScale(14),
  },
  modalInnerView:{
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
  },
  headingChooseAnAction:{
    fontFamily: fontFamily.Bold,
              fontSize: moderateScale(18),
              marginBottom: moderateScale(5),
  }
});
