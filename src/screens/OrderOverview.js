import React, { useContext, useEffect, useState } from "react";
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
import SubTotal from "../components/SubTotal";
import Button from "../components/Button";
import ItemInCart from "../components/ItemInCart";
import { MemoizedPayment } from "../components/Payment";
import ShippingInfo from "../components/ShippingInfo";
import { useDispatch, useSelector } from "react-redux";
import { toggleProductToCart } from "../redux/actions/cart";
import { showToast } from "../components/Toast";
import Modal from "react-native-modal";
const OrderOverview = ({ navigation, route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  let row = [];
  let prevOpenedRow;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const cartNetAmount = useSelector((state) => {
    let totalAmount = state?.cart?.netAmount;
    return parseFloat(totalAmount).toFixed(2);
  });

  const cartAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    let transformedCartItems = [];
    const items = state.cart.items;

    for (let key in state.cart.items) {
      transformedCartItems.push({
        productId: items[key].productId,
        category_name: items[key].category_name,
        description: items[key].description,
        discountedPrice: items[key].discountedPrice,
        image: items[key].image,
        qty: items[key].qty,
        name: items[key].name,
        price: items[key].price,
        product_category_id: items[key].product_category_id,
        quantity: items[key].quantity,
        short_unit: items[key].short_unit,
      });
    }
    return transformedCartItems;
  });
  console.log({cartItems})
  useEffect(() => {}, []);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const renderItem = ({ item, index }, onClick) => {
    return (
      <MemoizedCart
        item={item}
        index={index}
        onClick={onClick}
        row={row}
        prevOpenedRow={prevOpenedRow}
      />
    );
  };
  const toggleCartItems = async (value, item) => {
    // const data = {
    //   product_id: item.id || item.productId,
    //   command: value,
    // };

    // setError(null);
    try {
      await dispatch(toggleProductToCart("", value, item));
    } catch (error) {
      console.log("toggleCartItems", error);
      showToast("Something went wrong");
    }
  };
  const deleteItem = ({ item, index }) => {
    toggleCartItems("remove", item);
  };
  return (
    <View style={styles.container}>
      <NormalHeader name={"Order Overview"} />

      <View
        style={{
          flex: 1,
          paddingHorizontal: moderateScale(15),
          backgroundColor: "white",
        }}
      >
      <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false} >
      <View style={{ flex: 3.3 }}>
          {cartItems.length > 0 && <ItemInCart name="Items in cart" />}
          <View>
          <FlatList
            data={cartItems}
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
          
          {cartItems.length > 0 && (
            <>
              <View style={{ backgroundColor: "white" }}>
                <ItemInCart name="Shipping Info" />
                <ShippingInfo
                item={{
                id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
                title: "Dubai",
                isSelected:true,
              }}
                 isSelected={true}
                  onPress={() => {
                    navigation.navigate("ShippingAddress");
                  }}
                />
              </View>

              <View style={{ backgroundColor: "white" }}>
                <ItemInCart name="Payment Method" />
                <MemoizedPayment
                isSelected={true}
                item={  {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Cash On Delivery",
      isSelected:true,
    }}
                  onPress={() => {
                    navigation.navigate("PaymentMethods");
                  }}
                />
              </View>
            </>
          )}
        </View>
        {cartItems.length > 0 && (
          <>
            <View style={styles.line} />
            <SubTotal cartAmount={cartAmount} netAmount={cartNetAmount} />
            <View style={{marginVertical:moderateScale(5)}}>
            <Button
                // loading={loading}
                text={"PLACE ORDER"}
                onPress={() => {
                  toggleModal();
                }}
              />
            </View>
              
            
            <View style={{ height: moderateScale(15) }} />
          </>
        )}
      </ScrollView>
        
      </View>
      <Modal
        animationIn={"fadeIn"}
        isVisible={isModalVisible}
        animationInTiming={300}
        onBackdropPress={() => toggleModal()}
        backdropOpacity={0.7}
      >
        <View style={styles.modalInnerView}>
          <Image
            style={styles.checkCircleImage}
            source={require("../assets/vectors/check-circle.png")}
          />
          <Text
            style={styles.doneText}
          >
            Done!
          </Text>
          <Text
            style={styles.subText}
          >
            Your Order has been placed successfully.
          </Text>
          <View style={{ marginVertical: moderateScale(5), width: "100%" }}>
            <Button
              // loading={loading}
              text={"PLACE ORDER"}
              onPress={() => {
                toggleModal();
                navigation.navigate("Homes");
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              toggleModal();
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

export default OrderOverview;

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
    marginVertical: moderateScale(10),
  },
  modalInnerView: {
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
    alignItems: "center",
  },
  checkCircleImage:{
    width: moderateScale(60), height: moderateScale(60)
  },
  doneText:{
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(17),
    marginTop: moderateScale(10),
  },
  subText:{
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(14),
    marginVertical: moderateScale(5),
  },
  returnToHome:{
    fontFamily: fontFamily.Medium,
                fontSize: moderateScale(16),
                marginTop: moderateScale(5),
                color: colors.primary,
  }
});
