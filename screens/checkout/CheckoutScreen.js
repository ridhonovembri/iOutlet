import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import React, { useState, useEffect, useContext } from "react";

import { GetByOrderNo } from "../../services/dal/OrderDAL";

const CheckoutScreen = ({ route, navigation }) => {
  console.log("checkout screen", route.params);
  const { orderNumber, total} = route.params
  // const [orders, setOrders] = useState({});


  // const getData = async () => {
  //   await GetByOrderNo(route.params, setOrders);
  // }; 

  // useEffect(() => {
  //   getData();
  // }, []);

  const handleHome = () => {
    navigation.navigate('Home')
  };

  return (
    <View>
      <Text>CheckoutScreen</Text>
      <Text>OrderNumber: {orderNumber}</Text>
      <Text>total {total}</Text>
      <Button title="Home" onPress={handleHome}/>
      
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({});
