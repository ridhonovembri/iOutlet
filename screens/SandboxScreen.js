import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SQLiteProvider } from "expo-sqlite";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { useState, useEffect, useCallback, useContext } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { Dropdown } from "react-native-element-dropdown";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { GetAllCategories } from "../services/dal/CategoryDAL";

import { Ctx } from "../context/AppContext";

// const data = [
//   { label: 'Item 1', value: '1' },
//   { label: 'Item 2', value: '2' },
//   { label: 'Item 3', value: '3' },
//   { label: 'Item 4', value: '4' },
//   { label: 'Item 5', value: '5' },
//   { label: 'Item 6', value: '6' },
//   { label: 'Item 7', value: '7' },
//   { label: 'Item 8', value: '8' },
// ];

// const data = [
//   { category_name: 'Item 1', id: '1' },
//   { category_name: 'Item 2', id: '2' },
//   { category_name: 'Item 3', id: '3' },
//   { category_name: 'Item 4', id: '4' },
//   { category_name: 'Item 5', id: '5' },
//   { category_name: 'Item 6', id: '6' },
//   { category_name: 'Item 7', id: '7' },
//   { category_name: 'Item 8', id: '8' },
// ];

const SandboxScreen = () => {
  // const [categories, setCategories] = useState({});

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  // const [categories, setCategories] = useContext(Ctx)
  const categories = useContext(Ctx)

  // console.log("categories from component", categories.categories);

  // const getData = async () => {
  //   await GetAllCategories(setCategories);
  // };

  // console.log('data', data)
  // useFocusEffect(
  //   useCallback(() => {
  //     // console.log('categories', categories)
  //     // data.map((item) => {
  //     //   console.log(item)
  //     // })
  //     // data = useContext(Ctx);
  //     // console.log('data', data)
  //     // getData();
  //     // console.log("categories", categories);
  //     // const { id, ...data} = categories
  //     // let newProps = { ...data}
  //     // console.log('newProps', newProps)
  //     // const xx = categories.map((obj) =>{
  //     //   console.log(obj)
  //     //   // obj['key'] = obj['id']
  //     //   // delete obj['id']
  //     //   // obj['value'] = obj['category_name']
  //     //   // delete obj['category_name']
  //     // })
  //     // console.log('categorues', categories)
  //   }, [])
  // );

  // const data = [
  //   { key: "2", value: "Appliances" },
  //   { key: "3", value: "Cameras" },
  //   { key: "4", value: "Computers", disabled: false },
  //   { key: "5", value: "Vegetables" },
  //   { key: "6", value: "Diary Products" },
  //   { key: "7", value: "Drinks" },
  // ];

  // console.log(selected);

  return (
    <View style={{ flex: 1, backgroundColor: "pink" }}>
      <Text>SandboxScreen</Text>
      <View style={{ flex: 1, backgroundColor: "coral" }}>
        {/* <SelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          save="key"
        /> */}

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={categories.categories}
          search
          maxHeight={300}
          labelField="category_name"
          valueField="id"
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.id);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? "blue" : "black"}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    </View>
  );
};

export default SandboxScreen;

const styles = StyleSheet.create({});
