import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { RegisterUser } from "../services/dal/UsersDAL";

const RegisterScreen = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  handleRegister = async () => {
    // console.log('userName', userName)
    // console.log('password', password)

    const result = await RegisterUser(userName, password);

    console.log("resultxx", result);
    if (result.changes > 0) {
      // console.log("user has been registered");
      setStatus('User successful register')
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder="User Name"
        style={{
          borderWidth: 1,
          height: 40,
          width: 240,
          borderRadius: 10,
          marginBottom: 10,
          paddingLeft: 10,
        }}
        onChangeText={(text) => setUserName(text)}
      />
      <TextInput
        placeholder="Password"
        style={{
          borderWidth: 1,
          height: 40,
          width: 240,
          borderRadius: 10,
          marginBottom: 20,
          padding: 10,
        }}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Register" onPress={() => handleRegister()} />
      <Text>{status}</Text>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
