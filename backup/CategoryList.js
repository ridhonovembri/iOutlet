import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  TextInput,
  Button,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";

import {
  GetAllCategories,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
} from "../services/dal/CategoryDAL";

const CategoryList = () => {
  const [categories, setCategories] = useState({});

  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  getData = async () => {
    try {
      await GetAllCategories(setCategories);
    } catch (error) {
      console.log("[error-getData]:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  handleEdit = (cat) => {
    setCategoryId(cat.id);
    setCategoryName(cat.category_name);
    setIsEdit(true);
    setModalVisible(true);
  };

  handleDelete = async (cat) => {
    try {
      await DeleteCategory(cat);
      await getData();
    } catch (error) {
      console.log("[error-delete]:", error);
    }
  };

  handleBtnAdd = async () => {
    const cat = {
      categoryId,
      categoryName,
    };

    if (!isEdit) {
      await CreateCategory(cat);
    } else {
      await UpdateCategory(cat);
    }

    await getData();
    setModalVisible(!modalVisible);
  };

  clearForm = () => {
    setCategoryName("");
    setIsEdit(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View stye={{ flex: 1 }}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: "80%",
                height: "30%",
                padding: 10,
                elevation: 5,
                borderRadius: 20,
                margin: 10,
              }}
            >
              <TextInput
                placeholder="entry category"
                style={{
                  borderWidth: 1,
                  width: "100%",
                  borderRadius: 5,
                  height: 40,
                  paddingLeft: 5,
                }}
                onChangeText={(text) => setCategoryName(text)}
                value={categoryName}
              />              
              <Button title="Add" onPress={() => handleBtnAdd()} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              flex: 1,
              textAlign: "left",
              marginLeft: 5,
              fontSize: 24,
              fontWeight: "500",
            }}
          >
            Category List
          </Text>
          <Pressable
            onPress={() => {
              setModalVisible(true);
              clearForm();
            }}
          >
            <Text style={{ fontSize: 18, marginRight: 5, color: "blue" }}>
              Add New
            </Text>
          </Pressable>
        </View>

        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "black",
                marginHorizontal: 5,
                backgroundColor: "coral",
                height: 36,
                borderWidth: 1,
                borderRadius: 10,
                marginVertical: 3,
                paddingHorizontal: 5,
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text>{item.id}</Text>     
                <Text>{item.category_name}</Text>                
              </View>
              <Pressable onPress={() => handleEdit(item)}>
                <FontAwesome
                  name="edit"
                  size={24}
                  color="white"
                  style={{ marginHorizontal: 5 }}
                />
              </Pressable>
              <Pressable onPress={() => handleDelete(item)}>
                <FontAwesome name="trash-o" size={24} color="white" />
              </Pressable>
            </View>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CategoryList;

const styles = StyleSheet.create({});
