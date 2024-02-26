import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React from "react";
import { moderateScale } from "react-native-size-matters";
import { StyleSheet } from "react-native";
import { fontFamily } from "../theme/Fonts";
import SelectDropdown from "react-native-select-dropdown";
import colors from "../theme/Colors";

const Dropdown = ({ data=[], onSelect ,placeholder='' }) => {
  return (
    <SelectDropdown
    search={true}
      data={data}
      onSelect={(selectedItem, index)=>{onSelect(selectedItem,index)}}
      defaultButtonText={placeholder}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem?.name || selectedItem?.title;
      }}
      rowTextForSelection={(item, index) => {
        return item?.name || item?.title;
      }}
      buttonStyle={styles.borderStyle}
      buttonTextStyle={styles.dropDownButtonTextStyle}
      renderDropdownIcon={(isOpened) => {
        return (
          <MaterialIcons
            name={isOpened ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            color={"rgba(0, 0, 0, 0.8)"}
            size={moderateScale(25)}
          />
        );
      }}
      dropdownIconPosition={"right"}
      dropdownStyle={styles.dropDownStyle}
      rowStyle={styles.rowStyle}
      rowTextStyle={styles.rowTextStyle}
    />
  );
};

export default Dropdown;
const styles = StyleSheet.create({
  dropDownStyle: {
    backgroundColor: "#ffffff",
    borderRadius: moderateScale(5),
  },
  rowStyle: {
    backgroundColor: "#ffffff",
    borderBottomColor: "transparent",
  },
  dropDownButtonTextStyle: {
    color: colors.input,
    textAlign: "left",
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(12),
  },
  rowTextStyle: {
    color: colors.input,
    textAlign: "left",
    fontSize: moderateScale(14),
  },
  borderStyle: {
    width: "100%",
    height: moderateScale(50),
    backgroundColor:'rgba(237, 237, 237, 1)',
    borderRadius: moderateScale(8),
    marginBottom:moderateScale(7)
  },
});
