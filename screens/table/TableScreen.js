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
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";

import { FontAwesome } from "@expo/vector-icons";

import { useFocusEffect } from "@react-navigation/native";
import {
  GetAllTables,
  AddTable,
  UpdateTable,
  DeleteTable,
} from "../../services/dal/TableDAL";

import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

const TableScreen = () => {
  const [tables, setTables] = useState({});
  const [tableId, setTableId] = useState("");
  const [tableNo, setTableNo] = useState("");
  const [tableName, setTableName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const getData = async () => {
    try {
      await GetAllTables(setTables);
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
    setTableNo("");
    setTableName("");
    setTableId(0);
  };

  const handleCloseModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleAdd = async () => {
    try {
      // console.log("handleAdd", categoryId);

      if (tableId > 0) {
        Alert.alert("", "Edit Data Meja...?", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              const table = {
                tableId,
                tableNo,
                tableName,
              };
              // console.log('prepare for edit', category)
              UpdateTable(table);
              getData();
              setModalVisible(false);
            },
          },
        ]);
      } else {
        Alert.alert("", "Tambah Data Meja...?", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              const table = {
                tableNo,
                tableName
              };

              AddTable(table);
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
      Alert.alert("", "Hapus Data Meja...?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            DeleteTable(item.id);
            getData();
            setModalVisible(false);
          },
        },
      ]);
    } catch (error) {}
  };

  const handleEdit = async (item) => {
    // console.log("Edit", item);
    setTableId(item.id);
    setTableNo(item.table_no);
    setTableName(item.table_name);
    setModalVisible(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed");
              setModalVisible(!modalVisible);
            }}
          >
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
                  placeholder="Entry No Meja"
                  style={{
                    borderWidth: 1,
                    width: "100%",
                    borderRadius: 5,
                    height: 40,
                    paddingLeft: 5,
                  }}
                  onChangeText={(text) => setTableNo(text)}
                  value={tableNo}
                />
                <TextInput
                  placeholder="Entry Nama Meja"
                  style={{
                    borderWidth: 1,
                    width: "100%",
                    borderRadius: 5,
                    height: 40,
                    paddingLeft: 5,
                  }}
                  onChangeText={(text) => setTableName(text)}
                  value={tableName}
                />
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    justifyContent: "space-around",
                  }}
                >
                  <Button title="Simpan" onPress={() => handleAdd()} />
                  <Button title="Batal" onPress={() => handleCloseModal()} />
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.textBox}>
          <TextInput placeholder="Cari Meja" />
          <Feather name="search" size={24} color="gray" />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={tables}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  height: 50,
                  borderWidth: 0.5,
                  margin: 5,
                  padding: 5,
                  borderRadius: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18 }}>{item.table_no}-{item.table_name}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Pressable onPress={() => handleEdit(item)}>
                    <FontAwesome
                      name="edit"
                      size={24}
                      style={{ marginHorizontal: 5 }}
                    />
                  </Pressable>
                  <Pressable onPress={() => handleDelete(item)}>
                    <FontAwesome name="trash-o" size={24} />
                  </Pressable>
                </View>
              </View>
            )}
          />
        </View>
        <Pressable onPress={() => handleOpenModal()}>
          <View
            style={{
              bottom: 20,
              right: 20,
              position: "absolute",
            }}
          >
            <AntDesign name="pluscircleo" size={40} color="black" />
          </View>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TableScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textBox: {
    height: 40,
    borderWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },
});
