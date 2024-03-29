import React, { useContext, useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import Text from "../components/Text";
import Swiper from "react-native-swiper";
import { moderateScale } from "react-native-size-matters";
import { fontFamily } from "../theme/Fonts";
import colors from "../theme/Colors";
import { saveItemToStorage } from "../utils/storage";
import { UserContext } from "../context/UserContext";

const walkThrough = [
  { id: 1, text:'Food, Personal Care And Home Care Products - All In One Place' ,image:require('../assets/walkthrough/1.png'),innerImage:require('../assets/walkthrough/img1.png')},
  { id: 2, text:'Purchase All Your Stock From One Platform' ,image:require('../assets/walkthrough/2.png'),innerImage:require('../assets/walkthrough/img2.png')},
  { id: 3, text:'Schedule Future Deliveries And Get Discounts' ,image:require('../assets/walkthrough/3.png'),innerImage:require('../assets/walkthrough/img3.png')},
  { id: 4, text:'Buy More And Get Loyalty Rewards',image:require('../assets/walkthrough/4.png'),innerImage:require('../assets/walkthrough/img4.png')},
  { id: 5, text:'Daily Scratch Card To Win Rewards And Participate In Monthly Grand Prize',image:require('../assets/walkthrough/5.png'),innerImage:require('../assets/walkthrough/img5.png')},
  { id: 6, text:"Daily Draw, Find Out If It’s You. No Limit On Cart Value! Buy More, Win More",image:require('../assets/walkthrough/6.png'),innerImage:require('../assets/walkthrough/img6.png')},
];

const WalkThrough = () => {
  const swiper = useRef(null)
  const [_, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const moveToLogin = async () => {
    setLoading(true);
    await saveItemToStorage("isUserFirstTimeCome", "true");
    setUser((state) => ({
      ...state,
      isLoggedIn: false,
      isUserFirstTime: false,
    }));
    setLoading(false);
  };
  return (
    // <View style={styles.rootView}>
    
     <View style={{flex:1}}>
     <Swiper
      ref={swiper}
        loop={false}
        paginationStyle={styles.pagination}
        activeDotColor="#fff"
        
        dotColor="rgba(199, 84, 6, 1)"
        // style={{ backgroundColor: colors.primary,justifyContent:'center',alignItems:'center' }}
        activeDotStyle={{ width: moderateScale(25) }}
      >
    

  
        {walkThrough.map((item, index) => {
          return (
          <ImageBackground
          style={{flex:1}}
          imageStyle={{flex:1}}
          // resizeMode="contain"
          source={item.image}>
          <View style={{paddingHorizontal:moderateScale(15),justifyContent:'center',height:'80%'}}>
          <Image source={item.innerImage} style={{width:moderateScale(50),height:moderateScale(50)}}/>
            <Text multiline = {true} style={styles.text}>{item.text}</Text>
            {/* <TouchableOpacity
        onPress={() => {
          console.log(index)
          if(index<5){
            swiper?.current?.scrollBy(1)
          }
          else{
            moveToLogin()
          }
         
        }}
        style={styles.button}
      >
          <Text style={styles.buttonText}>NEXT</Text>
      
      </TouchableOpacity> */}
            </View>
            <TouchableOpacity
        onPress={() => {
          console.log(index)
          if(index<5){
            swiper?.current?.scrollBy(1)
          }
          else{
            moveToLogin()
          }
         
        }}
        style={styles.button}
      >
          <Text style={styles.buttonText}>NEXT</Text>
      
      </TouchableOpacity>
          </ImageBackground>
           
           
          );
        })}
      </Swiper>
     </View>
     

      
    // </View>
  );
};

export default WalkThrough;

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    // paddingHorizontal: moderateScale(20),
    // paddingVertical: moderateScale(20),
    // backgroundColor: colors.primary,
  },
  pagination: {
    position: "absolute",
    // top: moderateScale(520),
  },
  image: {
    width: "100%",
    height: "90%",
  },
  buttonText: {
    color: colors.input,
    fontFamily: fontFamily.Bold,
    letterSpacing: moderateScale(0.73),
    fontSize: moderateScale(16),
    marginBottom:moderateScale(3)
  },
  button: {
    height: moderateScale(55),
    width: "90%",
    alignSelf:'center',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: moderateScale(14),
    marginTop:moderateScale(10),
    // alignSelf:'flex-end',
    // alignContent:'flex-end'
    position:'absolute',
    bottom:60
  },
  text:{
    // textAlign:'center',
    lineHeight:moderateScale(42),
    fontSize:moderateScale(35),
    color:'white',
    fontFamily:fontFamily.SemiBold,
    // height:moderateScale(70),
    marginTop:moderateScale(10),
    // textAlignVertical:'bottom',
    // alignContent:'flex-end'

  }
});
