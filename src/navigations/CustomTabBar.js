import React, {useContext} from 'react';
import {View, TouchableOpacity, Platform, Image} from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {moderateScale} from 'react-native-size-matters';
// import Text from '../components/Text';
import {useNavigation} from '@react-navigation/native';
import colors from '../theme/Colors';
import Text from '../components/Text';
import { fontFamily } from '../theme/Fonts';


export function CustomTabBar({state, descriptors, navigation, tabBarBadge}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const nav = useNavigation();
  console.log({focusedOptions});
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{flexDirection: 'row',padding:moderateScale(0)}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor:colors.white,
          // marginTop:moderateScale(2),
          borderTopLeftRadius:moderateScale(10),
          borderTopRightRadius:moderateScale(10),
          shadowRadius: 2,
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowColor: '#000000',
          elevation: 7,

          height:
            Platform.OS === 'android' ? moderateScale(70) : moderateScale(75),
          flex: 1,
        }}>
        {state.routes.map((route, index) => {
          if (
            route.name === 'Promotions' ||
            route.name === 'Transactions' ||
            route.name === 'Faq' ||
            route.name === 'Help' ||
            route.name === 'Review' ||
            route.name === 'Settings' ||
            route.name === 'TradeLicence' ||
            route.name === 'Cnic' ||
            route.name === 'PersonalPageData' ||
            route.name === 'Uploads' ||
            route.name === 'Redirect' ||
            route.name === 'AddPayment' ||
            route.name === 'Eula' ||
            route.name === 'HelpAndFeedback' 

          ) {
            return null;
          }
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            console.log(route.key);
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            let item = route.name == 'More' ? '' : null;

            if (!isFocused && !event.defaultPrevented) {
              console.log('nav', route.name);
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          let iconName;

          if (route.name === 'Homes') {
            iconName = isFocused ? require('../assets/buyerBottomTabIcon/selectHome.png') : require('../assets/buyerBottomTabIcon/unSelectHome.png') ;
          } 
          else if (route.name === 'Discounts') {
            iconName = isFocused ? require('../assets/buyerBottomTabIcon/selectDiscount.png') : require('../assets/buyerBottomTabIcon/unSelectDiscount.png') ;
          } 
           else if (route.name === 'Cart') {
            iconName = isFocused ? require('../assets/buyerBottomTabIcon/selectCart.png') : require('../assets/buyerBottomTabIcon/unSelectCart.png') ;
          } 
          else if (route.name === 'Favourites') {
            iconName = isFocused ? require('../assets/buyerBottomTabIcon/selectFavourite.png') : require('../assets/buyerBottomTabIcon/unSelectFavourites.png') ;
          }
          else if (route.name === 'Profile') {
            iconName = isFocused ? require('../assets/buyerBottomTabIcon/selectProfile.png') : require('../assets/buyerBottomTabIcon/unSelectProfile.png') ;
          }
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={() => nav.navigate(route.name)}
              //   onLongPress={()=>console.log('dd')}
              style={{
                flex: 1,
                alignSelf: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
               
                <Image  source={iconName} resizeMode='contain' style={{width:moderateScale(45),height:moderateScale(42)}}/>
                <Text style={{fontSize:moderateScale(12),color:isFocused?colors.bottomSelected:colors.bottomUnSelected,fontFamily:fontFamily.SemiBold}}>{route.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
