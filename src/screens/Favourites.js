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
import NormalHeader from "../components/NormalHeader";

const Favourites = ({ navigation, route }) => {
  let mainflatListRef = useRef(null);
  const [_, setModal] = useContext(ModalContext);
  const [product,setProduct] = useState([])
  const [lastPage,setLastPage] = useState(null)
  const [pageNo, setPageNo] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categories,setCategories] = useState([])
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    // getProfile();
  }, []);
  useEffect(() => {
    callHomeApis();
  }, []);
console.log('current page',pageNo)
  const callHomeApis = async () => {
    setLoading(true)
   await getPopularProducts()
//    await getCategories()
    setLoading(false)
  };

  const getPopularProducts = async () => {
    try {
      const response = await API_CALLS.getFavorite(`?page_no=${1}&Is_view_all=${true}`);
      if (response.status === true) {
        console.log({response})
        setLastPage(response.pagination.total_pages)
        setProduct(response.data||[])
        
      }
    } catch (error) {
      console.log("getPopularProducts error", error);
    }
    setIsRefreshing(false);
    setLoading(false)
  };
  const getMoreDetail = async (pageNo = 1) => {
    setLoadingMore(true);
    console.log({pageNo})
    try {
      const response = await API_CALLS.getFavorite(`?page_no=${pageNo}&Is_view_all=${true}`);
      if (response.status === true) {
        setProduct((res) => [...res, ...response.data]);
      } else {
       
      }
    } catch (error) {
      console.log('getMoreDetail error',error)
    }
   
    setLoadingMore(false);
  };
  const onRefresh = () => {
    setIsRefreshing(true);
    setPageNo(1)
    getPopularProducts()
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
  const viewAllRow = (id, name) => {
    let item = {
      id: id,
      name: name,
    };
    return (
      <View style={styles.viewAllRowView}>
        <Text style={styles.sectionName}>{name}</Text>
        <TouchableOpacity onPress={() => {}} style={styles.ViewAllOpacity}>
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
    <NormalHeader name={"Favourite Products"} />
      <View style={{ padding: moderateScale(15), }}>
        {/* <ScrollView bounces={false} showsVerticalScrollIndicator={false}> */}
          {/* <View style={styles.top10} />
          {viewAllRow(0, "Shop by Category")}
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
          </View>
          <View style={styles.top10} />
          {viewAllRow(0, "Popular Products")} */}

         {loading?<ActivityIndicator size={'small'} color={colors.input}/>: <FlatList
            ref={mainflatListRef}
            data={product}
            bounces={false}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={() => onRefresh()}
        refreshing={isRefreshing}
            initialNumToRender={7}
            maxToRenderPerBatch={10}
            removeClippedSubviews={true}
            renderItem={(item, index) => renderItem(item, index)}
            numColumns={2}
            onEndReachedThreshold={0.01}
            onEndReached={(info) => {
                console.log('onEndReached',pageNo,lastPage)
              if (pageNo < lastPage) {
                getMoreDetail(pageNo + 1);
                setPageNo(pageNo + 1);
              }
            }}
            ListEmptyComponent={()=>{
              return <Text style={{textAlign:'center'}}>No Product found</Text>
            }}
            ItemSeparatorComponent={() => {
              return <View style={{ height: moderateScale(5) }} />;
            }}
            ListFooterComponent={() => {
              return (
                <View style={{ paddingVertical: moderateScale(10),height: moderateScale(90) }}>
                  {loadingMore ? (
                    <ActivityIndicator size={"small"} color={colors.input} />
                  ) : null}
                </View>
              );
            }}
          />}
          {/* <View style={{ height: moderateScale(200) }} /> */}
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

export default Favourites;

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

