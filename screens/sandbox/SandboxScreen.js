import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import React from "react";
import { SQLiteProvider } from "expo-sqlite";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { useState, useEffect, useCallback, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { GetAllCategories } from "../../services/dal/CategoryDAL";

import { Ctx } from "../../context/AppContext";

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

function initialCount() {
  console.log("initial count");
  return 4;
}

const SandboxScreen = () => {
  // const [state, setState] = useState({count: 4, color:'blue'})

  // const count = state.count
  // const color = state.color

  // const handleAdd = () => {
  //   // console.log('add')
  //   // setCount(previousCountx => previousCountx + 1)
  //   // setCount(previousCounty => previousCounty + 1)
  //   setState(previousState => {
  //     return { ...state, count : previousState.count + 1}
  //   })
  // }

  // const handleSubstract = () => {
  //   // console.log('substract')
  //   // setCount(previousCount => previousCount - 1)
  //   // setCount(previousCount => previousCount - 1)
  // }

  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View>
        <Pressable onPress={() => navigation.goBack()}>
          <Text>sandbox</Text>
        </Pressable>
      </View>
    </SafeAreaView>
    // <View style={{ flex: 1, flexDirection: 'row', marginTop: 100}}>
    //   <View style={{width: 100, height: 40,}}>
    //     <Button title="+" onPress={handleAdd}/>
    //   </View>
    //   <View style={{width: 100, height: 40, alignItems: 'center'}}>
    //     <Text style={{fontSize: 28}}>{count}</Text>
    //     <Text style={{fontSize: 28}}>{color}</Text>
    //   </View>
    //   <View style={{width: 100, height: 40}}>
    //     <Button title="-" onPress={handleSubstract}/>
    //   </View>
    // </View>
  );
};

export default SandboxScreen;

const styles = StyleSheet.create({});
