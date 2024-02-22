import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "../components/Text";
import colors from "../theme/Colors";
import { moderateScale } from "react-native-size-matters";
import { fontFamily } from "../theme/Fonts";
import { ModalContext } from "../context/ModalContext";
import API_CALLS from "../services/constants";
import { ProfileContext } from "../context/ProfileContext";
import { UserContext } from "../context/UserContext";
import moment from "moment";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { MemoizedProducts } from "../components/MemoizedProducts";
import SearchInput from "../components/SearchInput";
const Home = ({ navigation, route }) => {
  let mainflatListRef = useRef(null);
  const [_, setModal] = useContext(ModalContext);
  const [userProfile, setUserProfile] = useContext(ProfileContext);
  const [product,setProduct] = useState([])
  const [categories,setCategories] = useState([])
  const [subCategories,setSubCategories] = useState([])
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    // getProfile();
  }, []);
  useEffect(() => {
    callHomeApis();
  }, []);

  const callHomeApis = async () => {
    setLoading(true)
   await getPopularProducts()
   await getCategories()
   await getSubCategories()
   await getProfile()
    setLoading(false)
  };

  const getPopularProducts = async () => {
    try {
      const response = await API_CALLS.popularProducts(`?page_no=${1}`);
      if (response.status === true) {
        console.log('getPopularProducts',response)
        setProduct(response.data||[])
        
      }
    } catch (error) {
      console.log("getPopularProducts error", error);
    }
  };
  const getProfile = async () => {
    try {
      const response = await API_CALLS.getProfile();
      console.log('getProfile',response)
      if (response.status === true) {
        console.log('getProfile',response)
        setUserProfile((state) => ({
          ...state,
          ...response?.data?.user,
        }));
        
      }
    } catch (error) {
      console.log("getProfile error", error);
    }
  };

  const getCategories = async () => {
    try {
     
      const response = await API_CALLS.categories();
      if (response.status === true) {
        setCategories(response.data||[])
        
      }
    } catch (error) {
      console.log("user profile error", error);
    }
  };

  const getSubCategories = async () => {
    try {
     
      const response = await API_CALLS.sub_categories();
      if (response.status === true) {
        setSubCategories(response.data||[])
        console.log('sub categories',response)
        
      }
    } catch (error) {
      console.log("sub categories error", error);
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <MemoizedProducts
        onPress={() => {
          navigation.navigate("ProductDetail", { item: item });
        }}
        productName={item?.name}
        productImage={item?.image}
        quantity={item?.quantity}
        index={index}
        short_unit={item?.moq}
       price={item?.price}
       discountedPrice={item?.discountedPrice}
      />
    );
  };
  const viewAllRow = (name,title) => {
    return (
      <View style={styles.viewAllRowView}>
        <Text style={styles.sectionName}>{title}</Text>
        <TouchableOpacity onPress={() => {navigation.navigate(name)}} style={styles.ViewAllOpacity}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
    );
  };
  // if (loading) {
  //   return <Loader />;
  // }
  return (
    <View style={styles.container}>
      <Header showBackButton={false} navigation={navigation} />
      <View style={{backgroundColor:colors.primary,paddingHorizontal:moderateScale(15),paddingVertical:moderateScale(10)}}>
          <SearchInput onFocus={()=>navigation.navigate('SearchScreen')} placeholder={'Search Products'}/>
          </View>
      <View style={{ paddingHorizontal: moderateScale(15) }}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.top10} />
          
         
          {viewAllRow("AllProducts","Shop by Category")}
          <View style={{ flexDirection: "row", alignItems: "center",justifyContent:'center' }}>
            {loading?<ActivityIndicator size={'small'} color={colors.input}/>: <FlatList
              data={categories}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      marginHorizontal: moderateScale(5),
                    }}
                  >
                    <Image
                      source={{uri:item.image}}
                      resizeMode="contain"
                      style={{
                        width: moderateScale(35),
                        height: moderateScale(35),
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: fontFamily.SemiBold,
                        fontSize: moderateScale(10),
                        textAlign:'center',
                        marginTop:moderateScale(1)
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                );
              }}
            />}
          </View>

          {/* <View style={styles.top10} />
          {viewAllRow("AllProducts","Shop by Sub Categories")}
          <View style={{ flexDirection: "row", alignItems: "center",justifyContent:'center' }}>
            {loading?<ActivityIndicator size={'small'} color={colors.input}/>: <FlatList
              data={subCategories}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      marginHorizontal: moderateScale(5),
                    }}
                  >
                    <Image
                      source={{uri:item.image}}
                      resizeMode="contain"
                      style={{
                        width: moderateScale(30),
                        height: moderateScale(30),
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: fontFamily.SemiBold,
                        fontSize: moderateScale(10),
                        textAlign:'center'
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                );
              }}
            />}
          </View> */}
          <View style={styles.top10} />
          {viewAllRow("AllProducts","Popular Products")}

         {loading?<ActivityIndicator size={'small'} color={colors.input}/>: <FlatList
            ref={mainflatListRef}
            data={product}
            bounces={false}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={7}
            maxToRenderPerBatch={10}
            removeClippedSubviews={true}
            renderItem={(item, index) => renderItem(item, index)}
            numColumns={2}
            ListEmptyComponent={()=>{
              return <Text>No Product found</Text>
            }}
            ItemSeparatorComponent={() => {
              return <View style={{ height: moderateScale(5) }} />;
            }}
          />}
          <View style={{ height: moderateScale(160) }} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  creditLimit: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(17),
    color: colors.input,
    lineHeight: moderateScale(34),
  },
  ViewAllOpacity: {
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(30),
    width: moderateScale(65),
  },
  viewAll: {
    fontFamily: fontFamily.Bold,
    color: colors.primary,
    fontSize: moderateScale(15),
  },
  viewAllRowView: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: moderateScale(8),
  },
  sectionName: {
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(18),
  },

  top10: {
    marginTop: moderateScale(10),
  },
});
