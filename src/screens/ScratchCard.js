import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
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
import { ScratchCard } from 'rn-scratch-card'

const ScratchCardPage = ({ navigation, route }) => {
  
  const [loading, setLoading] = useState(true);
  useEffect(() => {}, []);
  const handleScratch=(scratchPercentage)=> {
    console.log({scratchPercentage})
  }
  return (
    <View style={styles.container}>
      <NormalHeader name={"Scratch Card"} />

      <View style={styles.container2}>
      <Text style={styles.heading}>Play & Win</Text>
      <Text style={styles.heading2}>Scratch the card to win exciting prizes</Text>
      <Image source={require('../assets/scratch/background.png')} style={styles.background_view} />
      <ScratchCard
      
        source={require('../assets/scratch/foreground.png')}
        brushWidth={30}
        onScratch={handleScratch}
        style={styles.scratch_card}
      />
      </View>
      
      </View>
    
  );
};

export default ScratchCardPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(254, 225, 204, 1)'
  },

  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 16,
  },
  background_view: {
    position: 'absolute',
    width: 120,
    height: 100,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    // borderRadius: 16,
  },
  scratch_card: {
    // position:'absolute',
    width: 300,
    height: 400,
    backgroundColor:'black',
  },
  heading:{
    fontFamily:fontFamily.Bold,
    fontSize:moderateScale(18),
    // lineHeight:moderateScale(18),
    marginBottom:moderateScale(5)
  },
  heading2:{
    fontFamily:fontFamily.Medium,
    fontSize:moderateScale(15),
    // lineHeight:moderateScale(14),
    marginBottom:moderateScale(30)
  },
});
