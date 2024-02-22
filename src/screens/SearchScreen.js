import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
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
import d from "lodash";
import { MemoizedProducts } from "../components/MemoizedProducts";
import NormalHeader from "../components/NormalHeader";
import SearchInput from "../components/SearchInput";
const SearchScreen = ({ navigation, route }) => {
  let mainflatListRef = useRef(null);
  const [_, setModal] = useContext(ModalContext);
  const [product, setProduct] = useState([]);
  const [lastPage, setLastPage] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [suggestion, setSugggestion] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const handler = React.useMemo(
    () => d.debounce((searchText) => getSearch(searchText), 500),
    []
  );
  const getSearch = async (text) => {
    await getSuggestedProducts(text);
  };
  const getSuggestedProducts = async (text) => {
    try {
      const response = await API_CALLS.suggestion(text);
      if (response.status === true && response?.data?.length > 0) {
        console.log("response", response);
        setSugggestion(response.data);
        setModalVisible(true);
      } else {
        setModalVisible(false);
      }
    } catch (error) {
      console.log("getPopularProducts error", error);
      setModalVisible(false);
    }
  };
  const getSearchProductProducts = async (text) => {
    try {
      setLoading(true);
      let data = {
        keyword: text,
        page_no: 1,
        Is_view_all: true,
      };
      console.log(data);
      const response = await API_CALLS.search(data);
      if (response.status === true) {
        console.log("response", response.data[0]);
        setLastPage(response.pagination.total_pages);
        setProduct(response.data || []);
      }
    } catch (error) {
      console.log("getPopularProducts error", error);
    }
    setIsRefreshing(false);
    setLoading(false);
  };
  const getMoreDetail = async (pageNo = 1) => {
    setLoadingMore(true);
    let data = {
      page_no: pageNo,
      Is_view_all: true,
      keyword: searchText,
    };
    console.log({ data });
    try {
      const response = await API_CALLS.search(data);
      if (response.status === true) {
        setProduct((res) => [...res, ...response.data]);
      } else {
      }
    } catch (error) {
      console.log("getMoreDetail error", error);
    }

    setLoadingMore(false);
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

  return (
    <View style={styles.container}>
      <NormalHeader name={"Search"} />
      <View
        style={{
          backgroundColor: colors.primary,
          paddingHorizontal: moderateScale(15),
          paddingVertical: moderateScale(10),
        }}
      >
        <SearchInput
          onChangeText={(text) => {
            setPageNo(1);
            setSearchText(text);
            handler(text);
          }}
          placeholder={"Search Product ..."}
        />
      </View>
      <View
        style={{ padding: moderateScale(15), marginBottom: moderateScale(60) }}
      >
        {loading ? (
          <ActivityIndicator size={"small"} color={colors.input} />
        ) : (
          <FlatList
            ref={mainflatListRef}
            data={product}
            bounces={false}
            keyExtractor={(item, index) => index.toString()}
            // onRefresh={() => onRefresh()}
            // refreshing={isRefreshing}
            initialNumToRender={7}
            maxToRenderPerBatch={10}
            removeClippedSubviews={true}
            renderItem={(item, index) => renderItem(item, index)}
            numColumns={2}
            onEndReachedThreshold={0.01}
            onEndReached={(info) => {
              console.log("onEndReached", pageNo, lastPage);
              if (pageNo < lastPage) {
                getMoreDetail(pageNo + 1);
                setPageNo(pageNo + 1);
              }
            }}
            ListEmptyComponent={() => {
              return (
                <Text style={{ textAlign: "center" }}>No Product found</Text>
              );
            }}
            ItemSeparatorComponent={() => {
              return <View style={{ height: moderateScale(5) }} />;
            }}
            ListFooterComponent={() => {
              return (
                <View
                  style={{
                    paddingVertical: moderateScale(10),
                    height: moderateScale(90),
                  }}
                >
                  {loadingMore ? (
                    <ActivityIndicator size={"small"} color={colors.input} />
                  ) : null}
                </View>
              );
            }}
          />
        )}
      </View>
      {isModalVisible && (
        <View style={styles.modalInnerView}>
          <FlatList
            data={suggestion}
            keyExtractor={(item, index) => {
              `{item ${index}}`;
            }}
            renderItem={({ item, index }) => {
              console.log({ item });
              return (
                <TouchableOpacity
                  style={{ height: moderateScale(30) }}
                  onPress={() => {
                    setModalVisible(false);
                    getSearchProductProducts(item?.name);
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fontFamily.Medium,
                      fontSize: moderateScale(14),
                    }}
                  >
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SearchScreen;

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

  /// modal style

  modalInnerView: {
    backgroundColor: "white",
    height: moderateScale(200),
    width: "95%",
    alignSelf: "center",
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
    position: "absolute",
    top: 140,
    shadowColor: "rgba(0, 26, 77, 0.5)",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    elevation: 8,
  },
});
