import React, { useEffect, useState } from "react";
import { fontFamily } from "../theme/Fonts";
import { moderateScale } from "react-native-size-matters";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../theme/Colors";
import Text from "./Text";
import Modal from 'react-native-modal';
import { Calendar } from "react-native-calendars";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import { showToast } from "./Toast";

const IconLeft = () => {
    return (
      <MaterialIcons
        name={"arrow-back-ios"}
        size={moderateScale(20)}
        color="#424246"
      />
    );
  };
  const IconRight = () => {
    return (
      <MaterialIcons
        name={"arrow-forward-ios"}
        size={moderateScale(20)}
        color="#424246"
      />
    );
  };
const DatePicker = ({heading,onChangeStartDate,position='left',todayDate,disabled=false,startDates}) => {
  const [today, setToday] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [selected, setSelected] = useState(todayDate);
    const [startDate, setStartDate] = useState(startDates);
    const [selectedEnd, setSelectedEnd] = useState(todayDate);
    const [markedDates, setMarkedDates] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [renderCalendar, setRenderCalendar] = useState(true);
    console.log({selected})
    useEffect(() => {
        setRenderCalendar(false);

          setTimeout(() => {
            setRenderCalendar(true);
          }, 250);
       
      }, []);
    const setDaySelected = selectedDate => {
      console.log('dfdfd',moment(startDate).format('MMM DD, yyyy'))
      let date1 = moment(startDate).format('MMM DD, yyyy');

      let date2 = moment(selectedDate).format('MMM DD, yyyy');
      console.log('date1',date1,'date2',date2)
      if (moment(date2).isBefore(date1)) {
       showToast('End Date should not be less than Start Date')
       setModalVisible(false)
       return
      }
      if(position==='left'){
        let marked = {};
        marked[selectedDate] = {
          selected: true,
          marked: true,
          selectedColor: colors.primary,
        };
        setMarkedDates(marked);
        setSelected(selectedDate);
        let serviceDate = moment(selectedDate);
        serviceDate = serviceDate.format("YYYY-MM-DD");
        onChangeStartDate(serviceDate)
        setModalVisible(false)
      }
      else{
        console.log('else run')
        let marked = {};
        marked[selectedDate] = {
          selected: true,
          marked: true,
          selectedColor: colors.primary,
        };
        setMarkedDates(marked);
        setSelectedEnd(selectedDate);
        let serviceDate = moment(selectedDate);
        serviceDate = serviceDate.format("YYYY-MM-DD");
        onChangeStartDate(serviceDate)
        setModalVisible(false)
      }
      };
  return (
    <View style={{flex:1}}>
         <Modal
        isVisible={modalVisible}
        backdropColor="rgba(0, 0, 0, 0.5)"
        backdropOpacity={1}
        onBackdropPress={()=>setModalVisible(false)}
        animationIn="fadeIn"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View style={[styles.contentCalendar, {backgroundColor: colors.card}]}>
          {renderCalendar && (
            <Calendar
              style={{
                borderRadius: 8,
                backgroundColor: colors.secondary,
              }}
              renderArrow={(direction) => {
          return direction === "left" ? <IconLeft /> : <IconRight />;
        }}
              markedDates={markedDates}
              current={selected}
              minDate={'2023-01-01'}
              maxDate={today}
              onDayPress={day => setDaySelected(day.dateString)}
            //   monthFormat={'dd-MM-yyyy'}
              theme={styles.theme}
            />
          )}
         
        </View>
      </Modal>
    
    <View style={{alignSelf:position==='left'?'flex-start':'flex-end'}}>
      <Text style={styles.heading}>{heading}</Text>
      <TouchableOpacity onPress={()=>disabled?null: setModalVisible(true)} style={styles.dateView}>
        <Text style={styles.dateText}>{position==='left'&& selected?moment(selected).format('DD MMMM YYYY'):moment(selectedEnd).format('DD MMMM YYYY')}</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  heading: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(14),
    marginVertical: moderateScale(6),
  },
  dateView: {
    width: moderateScale(150),
    height: moderateScale(40),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
  },
  dateText: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(13),
  },
  theme: {
    backgroundColor: colors.secondary,
    calendarBackground: colors.secondary,
    textSectionTitleColor: colors.secondary,
    selectedDayBackgroundColor: "#00adf5",
    selectedDayTextColor: "#ffffff",
    todayTextColor: colors.darkPink,
    dayTextColor: "#2d4150",
    textDayFontSize: moderateScale(14),
    textMonthFontSize: moderateScale(16),
    textDayHeaderFontSize: moderateScale(14),
    textDisabledColor:'grey'
    
  },
});
