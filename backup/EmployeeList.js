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
  GetAllEmployees,
  CreateEmployee,
  UpdateEmployee,
  DeleteEmployee,
} from "../services/dal/EmployeeDAL";

const EmployeeList = () => {
  const [employees, setEmployees] = useState({});

  const [employeeId, setEmployeeId] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [iseEdit, setIsEdit] = useState(false);

  getData = async () => {
    try {
      await GetAllEmployees(setEmployees);
    } catch (e) {
      console.log("[error-getData]: ", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  handleEdit = (item) => {

    setEmployeeId(item.id)
    setEmployeeNo(item.empl_no);
    setEmployeeName(item.empl_name);
    setIsEdit(true);
    setModalVisible(true);
  };

  handleDelete = async (empl) => {
    try {
      await DeleteEmployee(empl);
      await getData();
    } catch (error) {
      console.log("[error-delete]: ", error);
    }
  };

  handleBtnAdd = async () => {
    const emp = {    
      employeeId,  
      employeeNo,
      employeeName,
    };

    if (!iseEdit) {
      await CreateEmployee(emp);
    } else {
      await UpdateEmployee(emp);
    }

    await getData();
    setModalVisible(!modalVisible);
  };

  clearForm = () => {
    setEmployeeNo("");
    setEmployeeName("");
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
                placeholder="entry employee no"
                style={{
                  borderWidth: 1,
                  width: "100%",
                  borderRadius: 5,
                  height: 40,
                  paddingLeft: 5,
                }}
                onChangeText={(text) => setEmployeeNo(text)}
                value={employeeNo}
              />
              <TextInput
                placeholder="entry employee name"
                style={{
                  borderWidth: 1,
                  width: "100%",
                  borderRadius: 5,
                  height: 40,
                  paddingLeft: 5,
                  marginBottom: 10,
                }}
                onChangeText={(text) => setEmployeeName(text)}
                value={employeeName}
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
            Employee List
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
          data={employees}
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
                <Text>{item.empl_no}:</Text>
                <Text>{item.empl_name}</Text>
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

export default EmployeeList;

const styles = StyleSheet.create({});
