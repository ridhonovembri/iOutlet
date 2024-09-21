import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Button,
  Alert,
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { useFocusEffect } from "@react-navigation/native";
import {
  GetAllCategories,
  AddCategory,
  UpdateCategory,
  DeleteCategory,
} from "../../services/dal/CategoryDAL";

import AntDesign from "@expo/vector-icons/AntDesign";

import { COLORS, SIZES } from "../../constants/index";

import { useNavigation } from "@react-navigation/native";

const CategoryScreen = () => {
  const [categories, setCategories] = useState({});
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation()

  const getData = async () => {
    try {
      await GetAllCategories(setCategories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const handleOpenModal = () => {
    setModalVisible(true);
    setCategoryName("");
    setCategoryId(0);
  };

  const handleCloseModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleAdd = async () => {
    try {
      // console.log("handleAdd", categoryId);

      if (categoryId > 0) {
        Alert.alert("", "Edit Data Kategori...?", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              const category = {
                categoryId,
                categoryName,
              };
              // console.log('prepare for edit', category)
              UpdateCategory(category);
              getData();
              setModalVisible(false);
            },
          },
        ]);
      } else {
        Alert.alert("", "Tambah Data Kategori...?", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              const category = {
                categoryName,
              };

              AddCategory(category);
              getData();
              setModalVisible(false);
            },
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (item) => {
    try {
      // console.log("delete", item);
      Alert.alert("", "Hapus Data Kategori...?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            DeleteCategory(item.id);
            getData();
            setModalVisible(false);
          },
        },
      ]);
    } catch (error) {}
  };

  const handleEdit = async (item) => {
    // console.log("Edit", item);
    setCategoryId(item.id);
    setCategoryName(item.category_name);
    setModalVisible(true);
    // setIsEdit(true);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={{ marginHorizontal: 10, flexDirection:'row', alignItems:'center'}}>          
          <AntDesign name="back" size={24} color="black" />
          <Text style={{marginLeft: 10, fontFamily:'regular', fontSize: SIZES.medium+2}}>Home</Text>
        </View>
      </TouchableOpacity>
      <View style={{marginHorizontal: 10}}>
        <Text>Category</Text>
      </View>
    </SafeAreaView>

    // {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
    //   {/* <View style={styles.container}>
    //   <View>
    //     <Modal
    //       animationType="slide"
    //       transparent={true}
    //       visible={modalVisible}
    //       onRequestClose={() => {
    //         Alert.alert("Modal has been closed");
    //         setModalVisible(!modalVisible);
    //       }}
    //     >
    //       <View
    //         style={{
    //           flex: 1,
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       >
    //         <View
    //           style={{
    //             backgroundColor: "pink",
    //             width: "80%",
    //             height: "15%",
    //             padding: 10,
    //             elevation: 5,
    //             borderRadius: 20,
    //           }}
    //         >
    //           <TextInput
    //             placeholder="Entry Kategori"
    //             style={{
    //               borderWidth: 1,
    //               width: "100%",
    //               borderRadius: 5,
    //               height: 40,
    //               paddingLeft: 5,
    //             }}
    //             onChangeText={(text) => setCategoryName(text)}
    //             value={categoryName}
    //           />
    //           <View
    //             style={{
    //               flexDirection: "row",
    //               marginTop: 10,
    //               justifyContent: "space-around",
    //             }}
    //           >
    //             <Button title="Simpan" onPress={() => handleAdd()} />
    //             <Button title="Batal" onPress={() => handleCloseModal()} />
    //           </View>
    //         </View>
    //       </View>
    //     </Modal>
    //   </View>
    //   <View style={styles.textBox}>
    //     <TextInput placeholder="Cari Kategori" />
    //     <Feather name="search" size={24} color="gray" />
    //   </View>
    //   <View style={{ flex: 1 }}>
    //     <FlatList
    //       data={categories}
    //       keyExtractor={(item) => item.id.toString()}
    //       renderItem={({ item }) => (
    //         <View
    //           style={{
    //             height: 50,
    //             borderWidth: 0.5,
    //             margin: 5,
    //             padding: 5,
    //             borderRadius: 10,
    //             flexDirection: "row",
    //             justifyContent: "space-between",
    //             alignItems: "center",
    //           }}
    //         >
    //           <Text style={{ fontSize: 18 }}>{item.category_name}</Text>
    //           <View style={{ flexDirection: "row" }}>
    //             <Pressable onPress={() => handleEdit(item)}>
    //               <FontAwesome
    //                 name="edit"
    //                 size={24}
    //                 style={{ marginHorizontal: 5 }}
    //               />
    //             </Pressable>
    //             <Pressable onPress={() => handleDelete(item)}>
    //               <FontAwesome name="trash-o" size={24} />
    //             </Pressable>
    //           </View>
    //         </View>
    //       )}
    //     />
    //   </View>
    //   <Pressable onPress={() => handleOpenModal()}>
    //     <View
    //       style={{
    //         bottom: 20,
    //         right: 20,
    //         position: "absolute",
    //       }}
    //     >
    //       <AntDesign name="pluscircleo" size={40} color="black" />
    //     </View>
    //   </Pressable>
    // </View> */}
    // {/* </TouchableWithoutFeedback> */}
  );
};

export default CategoryScreen;
