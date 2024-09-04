import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Modal,
  Keyboard,
  Pressable,
  TextInput,
  Button,
  Alert,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { GetAllUsers, DeleteUser, UpdateUser } from "../services/dal/UsersDAL";
import { FontAwesome } from "@expo/vector-icons";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const [updateUser, setUpdateUser] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");

  const [id, setId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  getData = async () => {
    try {
      GetAllUsers(setUsers);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  handleEdit = async (item) => {
    // console.log("item update", item);
    // setIsEdit(true);
    setId(item.id);
    setUpdateUser(item.user_name);
    setUpdatePassword(item.password);
    setModalVisible(true);
  };

  handleAddModal = async () => {
    try {
      await UpdateUser(id, updateUser, updatePassword);
      await getData();
    } catch (error) {
      console.log("[error]: edit user ", error);
    }
  };

  handleDelete = async (item) => {
    try {
      await DeleteUser(item.id);
      await getData();
    } catch (error) {
      console.log("[error]: delete user ", error);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={{ flex: 1 }}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "pink",
                width: "80%",
                height: "15%",
                padding: 10,
                elevation: 5,
                borderRadius: 20,
              }}
            >
              <TextInput
                placeholder=""
                style={{
                  borderWidth: 1,
                  width: "100%",
                  borderRadius: 5,
                  height: 40,
                  paddingLeft: 5,
                }}
                onChangeText={(text) => setUpdateUser(text)}
                value={updateUser}
              />
              <TextInput
                placeholder=""
                style={{
                  borderWidth: 1,
                  width: "100%",
                  borderRadius: 5,
                  height: 40,
                  paddingLeft: 5,
                }}
                onChangeText={(text) => setUpdatePassword(text)}
                value={updatePassword}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  justifyContent: "space-around",
                }}
              >
                <Button title="Add" onPress={() => handleAddModal()} />
                <Button
                  title="Cancel"
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </View>
            </View>
          </View>
        </Modal>

        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: "500",
            }}
          >
            User Account
          </Text>
        </View>

        <FlatList
          data={users}
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
                <Text>{item.user_name}</Text>
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

export default UserList;

const styles = StyleSheet.create({});
