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
import SubTotal from "../components/SubTotal";
import Button from "../components/Button";
import ItemInCart from "../components/ItemInCart";
import { MemoizedPayment } from "../components/Payment";
import ShippingInfo from "../components/ShippingInfo";
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
];

const OrderStatus = ({ navigation, route }) => {
  let item = route?.params?.item || {};
  console.log({ item });
  const [listData, setListData] = useState(DATA);
  let row = [];
  let prevOpenedRow;
  const [loading, setLoading] = useState(true);
  useEffect(() => {}, []);
  const renderItem = ({ item, index }, onClick) => {
    return (
      <MemoizedCart
        enabled={false}
        item={item}
        index={index}
        onClick={onClick}
        row={row}
        prevOpenedRow={prevOpenedRow}
      />
    );
  };
  const deleteItem = ({ item, index }) => {
    console.log(item, index);
    let a = listData;
    a.splice(index, 1);
    console.log(a);
    setListData([...a]);
  };
  const renderButtons = () => {
    if (item.status === "Confirmed") {
      return (
        <Button
          // loading={loading}
          text={"CANCEL ORDER"}
          onPress={() => {
          }}
        />
      );
    } else {
      return (
        <>
          <Button
            // loading={loading}
            text={"WRITE A REVIEW"}
            onPress={() => {
              // handleLogin();
            }}
          />
          <View style={{ height: moderateScale(10) }} />
          <Button
            // loading={loading}
            text={"ORDER AGAIN"}
            onPress={() => {
              // handleLogin();
            }}
          />
        </>
      );
    }
  };
  return (
    <View style={styles.container}>
      <NormalHeader name={item.orderNo || ""} />
      <View style={styles.statusRootView}>
        <Text style={styles.orderStausHeading}>Order Status</Text>
        <Text style={styles.statusText}>{item.status}</Text>
        <View
          style={{
            ...styles.progressBar,
            backgroundColor:
              item.status === "Confirmed"
                ? "rgba(252, 103, 1, 0.1)"
                : "#3EC664",
          }}
        >
          {item.status === "Confirmed" && (
            <View
              style={{
                ...styles.inner,
                backgroundColor: colors.primary,
              }}
            />
          )}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: moderateScale(15),
          backgroundColor: "white",
        }}
      >
        <ScrollView>
          <View style={{ flex: 2 }}>
            <ItemInCart name="Items in cart" />
            <FlatList
              data={listData}
              renderItem={(v) =>
                renderItem(v, () => {
                  console.log("Pressed", v);
                  deleteItem(v);
                })
              }
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() => {
                return <Text style={styles.noData}>No Items in cart</Text>;
              }}
            />
          </View>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <ItemInCart name="Shipping Info" />
            <ShippingInfo
              onPress={() => {
                navigation.navigate("ShippingAddress");
              }}
            />
          </View>

          <View style={{ flex: 1, backgroundColor: "white" }}>
            <ItemInCart name="Payment Method" />
            <MemoizedPayment />
          </View>
          <View style={styles.line} />
          <SubTotal />

          <View style={{ height: moderateScale(10) }} />
        </ScrollView>
        <View style={{ marginVertical: moderateScale(10) }}>
          {renderButtons()}
        </View>
      </View>
    </View>
  );
};

export default OrderStatus;

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
  statusRootView: {
    width: "100%",
    height: moderateScale(78),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
    borderBottomWidth: moderateScale(0.4),
    borderBottomColor: colors.lightText,
  },
  orderStausHeading: {
    textAlign: "center",
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(17),
  },
  statusText: {
    textAlign: "center",
    fontFamily: fontFamily.SemiBold,
    fontSize: moderateScale(12),
    color: colors.lightText,
  },
  progressBar: {
    width: "100%",
    height: moderateScale(13),
    borderRadius: moderateScale(5),
    marginTop: moderateScale(5),
  },
  inner: {
    width: "10%",
    height: moderateScale(13),
    borderRadius: moderateScale(5),
  },
});
