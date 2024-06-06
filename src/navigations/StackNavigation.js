import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { UserContext } from "../context/UserContext";
import SplashLoading from "../screens/SplashLoading";
import Login from "../screens/Login";
import Home from "../screens/Home";
import { CustomTabBar } from "./CustomTabBar";
import WalkThrough from "../screens/WalkThrough";
import ForgetPassword from "../screens/ForgetPassword";
import Signup from "../screens/Signup";
import OTP from "../screens/OTP";
import Discounts from "../screens/Discounts";
import Cart from "../screens/Cart";
import Favourites from "../screens/Favourites";
import ResetPassword from "../screens/ResetPassword";
import ProfileDocument from "../screens/ProfileDocument";
import ProfileContact from "../screens/ProfileContact";
import ProfileMerchantt from "../screens/ProfileMerchantt";
import Profile from "../screens/Profile";
import Redirect from "../screens/Redirect";
import AddPayment from "../screens/AddPayment";
import { DrawerContentForMantee } from "../components/DrawerContentForMantee";
import { moderateScale } from "react-native-size-matters";
import DrawerContentForBuyer from "../components/DrawerContentForBuyer";
import ProductDetail from "../screens/ProductDetail";
import OrderOverview from "../screens/OrderOverview";
import ShippingAddress from "../screens/ShippingAddress";
import NewAddress from "../screens/NewAddress";
import PastOrders from "../screens/PastOrders";
import OrderStatus from "../screens/OrderStatus";
import PaymentMethods from "../screens/PaymentMethods";
import NewPaymentMethod from "../screens/NewPaymentMethod";
import ScratchCardPage from "../screens/ScratchCard";
import AllProducts from "../screens/AllProducts";
import SearchScreen from "../screens/SearchScreen";
import Qrcode from "../screens/Qrcode";
import Commission from "../screens/Commission";
import Commission2 from "../screens/Commission2";
import Earnings from "../screens/Earnings";
const DrawerBuyer = createDrawerNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeStack = createStackNavigator();
const OrderStack = createStackNavigator();
const PaymentStack = createStackNavigator();
const CartStack = createStackNavigator();
const TabStack = createBottomTabNavigator();

export const MainManteeStack = () => {
  const horizontalAnimation = {
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };
  return (
    <DrawerBuyer.Navigator
      screenOptions={({ route, navigation }) => {
        return {
          drawerType: "front",
          headerStyle: {
            height: moderateScale(82),
            backgroundColor: "#0082EA",
          },
          headerShown: false,
          swipeEdgeWidth: 0,
          gestureEnabled: true,
        };
      }}
      drawerContent={(props) => <DrawerContentForBuyer />}
    >
      <DrawerBuyer.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{ headerTitle: () => headerTitle(""), unmountOnBlur: true }}
      />

      <DrawerBuyer.Screen
        name="ShippingAddress"
        component={ShippingAddress}
        options={{ headerTitle: () => headerTitle(""), unmountOnBlur: true }}
      />
      <DrawerBuyer.Screen
        name="PaymentMethods"
        component={PaymentMethods}
        options={{ headerTitle: () => headerTitle(""), unmountOnBlur: true }}
      />
      <DrawerBuyer.Screen
        name="NewPaymentMethod"
        component={NewPaymentMethod}
        options={{ headerTitle: () => headerTitle(""), unmountOnBlur: true }}
      />
      <DrawerBuyer.Screen
        name="ScratchCardPage"
        component={ScratchCardPage}
        options={{ headerTitle: () => headerTitle(""), unmountOnBlur: true }}
      />
      <DrawerBuyer.Screen
        name="NewAddress"
        component={NewAddress}
        options={{ headerTitle: () => headerTitle(""), unmountOnBlur: true }}
      />
      <DrawerBuyer.Screen
        name="OrderStackScreen"
        component={OrderStackScreen}
        options={{ headerTitle: () => headerTitle(""), unmountOnBlur: true }}
      />
      <DrawerBuyer.Screen
        name="PaymentStackScreen"
        component={PaymentStackScreen}
        options={{ headerTitle: () => headerTitle(""), unmountOnBlur: true }}
      />
    </DrawerBuyer.Navigator>
  );
};
export const OrderStackScreen=()=>{
  return(
    <OrderStack.Navigator
      initialRouteName="PastOrders"
    >
    <OrderStack.Screen
        name="PastOrders"
        component={PastOrders}
        options={({ route, navigation }) => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
    <OrderStack.Screen
        name="OrderStatus"
        component={OrderStatus}
        options={({ route, navigation }) => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
      
    </OrderStack.Navigator>
  )
}
export const PaymentStackScreen=()=>{
  return(
    <PaymentStack.Navigator
      initialRouteName="PaymentMethods"
    >
    <PaymentStack.Screen
        name="PaymentMethods"
        component={PaymentMethods}
        options={({ route, navigation }) => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
    <PaymentStack.Screen
        name="NewPaymentMethod"
        component={NewPaymentMethod}
        options={({ route, navigation }) => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
      
    </PaymentStack.Navigator>
  )
}
export const CartStackScreen=()=>{
  return(
    <CartStack.Navigator
      initialRouteName="Cart"
    >
    <CartStack.Screen
        name="Cart"
        component={Cart}
        options={({ route, navigation }) => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
    <CartStack.Screen
        name="PaymentMethods"
        component={PaymentMethods}
        options={({ route, navigation }) => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
    <CartStack.Screen
        name="OrderOverview"
        component={OrderOverview}
        options={({ route, navigation }) => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
    <CartStack.Screen
        name="NewAddress"
        component={NewAddress}
        options={({ route, navigation }) => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
    <CartStack.Screen
        name="ShippingAddress"
        component={ShippingAddress}
        options={({ route, navigation }) => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
    <CartStack.Screen
        name="NewPaymentMethod"
        component={NewPaymentMethod}
        options={({ route, navigation }) => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
      
    </CartStack.Navigator>
  )
}
export const HomeBottomStack = () => {
  return (
    <TabStack.Navigator
      initialRouteName="Homes"
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <TabStack.Screen
        name="Homes"
        component={Home}
        options={({ route, navigation }) => ({
          headerShown: false,
          unmountOnBlur: false,
        })}
      />
      <TabStack.Screen
        name="Redirect"
        component={Redirect}
        options={({ route, navigation }) => ({
          headerShown: false,
          // unmountOnBlur:true
        })}
      />

      <TabStack.Screen
        name="Discounts"
        component={Discounts}
        options={({ route, navigation }) => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
      <TabStack.Screen
        name="Cart"
        component={CartStackScreen}
        options={({ route, navigation }) => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
      <TabStack.Screen
        name="Favourites"
        component={Favourites}
        options={({ route, navigation }) => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
      <TabStack.Screen
        name="Profile"
        component={Profile}
        options={({ route, navigation }) => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
      <TabStack.Screen
        name="AddPayment"
        component={AddPayment}
        options={{ headerShown: false }}
      />
    </TabStack.Navigator>
  );
};
export const BottomTabs = (props) => {
  const [user] = React.useContext(UserContext);
  return (
    <HomeStack.Navigator>
      {/* <HomeStack.Screen
        name="Home"
        component={HomeBottomStack}
        options={{ headerShown: false }}
      /> */}
      <HomeStack.Screen
        name="Homes"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Qrcode"
        component={Qrcode}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Commission"
        component={Commission}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Commission2"
        component={Commission2}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Earnings"
        component={Earnings}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="AllProducts"
        component={AllProducts}
        options={{ headerShown: false }}
      />
      
      <HomeStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="OrderOverview"
        component={OrderOverview}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ShippingAddress"
        component={ShippingAddress}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="PaymentMethods"
        component={PaymentMethods}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="NewAddress"
        component={NewAddress}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="Redirect"
        component={Redirect}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

//auth stack
export const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="OTP"
        component={OTP}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Redirect"
        component={Redirect}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};
export const ProfileStacks = () => {
  return (
    <ProfileStack.Navigator>
       <ProfileStack.Screen
        name="ProfileDocument"
        component={ProfileDocument}
        options={{ headerShown: false }}
      /> 
      <ProfileStack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{ headerShown: false }}
      />

      <ProfileStack.Screen
        name="ProfileMerchantt"
        component={ProfileMerchantt}
        options={{ headerShown: false }}
      />

      <ProfileStack.Screen
        name="Redirect"
        component={Redirect}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};

export const StackNavigation = () => {
  const [user] = React.useContext(UserContext);
  const AppStack = createStackNavigator();
  const renderHomeOrProfile = (user) => {
    console.log("user.isLoggedIn", user.isLoggedIn);
    return user?.showCompleteProfile === "true" ||
      user?.showCompleteProfile === true ? (
      <AppStack.Screen
        name="MainManteeStack"
        component={MainManteeStack}
        options={{ headerShown: false }}
      />
    ) : (
      <AppStack.Screen
        name="ProfileStack"
        component={ProfileStacks}
        options={{
          headerShown: false,
        }}
      />
    );
  };
  const renderUser = (user) => {
    console.log("user.isLoggedIn", user.isLoggedIn);
    return user.isLoggedIn == true ? (
      renderHomeOrProfile(user)
    ) : (
      // <AppStack.Screen
      //   name="BottomTabs"
      //   component={BottomTabs}
      //   options={{ headerShown: false }}
      // />
      <AppStack.Screen
        name="AuthStackScreen"
        component={AuthStackScreen}
        options={{
          headerShown: false,
        }}
      />
    );
  };
  const renderStack = (user) => {
    console.log(user.isUserFirstTime);
    return user.isUserFirstTime == true ? (
      <AppStack.Screen
        name="WalkThrough"
        component={WalkThrough}
        options={{
          headerShown: false,
        }}
      />
    ) : (
     renderUser(user)
    );
  };
  return (
    <Stack.Navigator>
      {user.isLoggedIn === null ? (
        <>
          <AppStack.Screen
            name="SplashScreen"
            component={SplashLoading}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        renderStack(user)
      )}
    </Stack.Navigator>
  );
};
