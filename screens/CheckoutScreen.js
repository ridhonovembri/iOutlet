import { StyleSheet, Text, View, FlatList, Button, Pressable } from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";

import { useFocusEffect } from "@react-navigation/native";
import { Ctx } from "../context/AppContext";
import { GetByOrderNo } from "../services/dal/OrderDAL";

const CheckoutScreen = ({ route, navigation }) => {
  console.log("route ==>", route.params);
  const { cart, setCart } = useContext(Ctx);
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  const getData = async () => {
    await GetByOrderNo(route.params, setOrders);

    setTotal(
      cart.reduce(
        (accumulator, item) =>
          accumulator + parseFloat(item.price) * parseFloat(item.qty),
        0
      )
    );

    // console.log("orders checkout", orders);
  };

  useFocusEffect(
    useCallback(() => {
      getData();
      // setCart([]);
    }, [])
  );

  const closeOrder = () => {
    console.log('closeOrder')
  }
  
  return (
    <View>
      <Text>CheckoutScreenx</Text>
      <Text>{route.params}</Text>
      <Text>{total}</Text>
      
      <Pressable
        style={{
          height: 50,
          backgroundColor: "lime",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => closeOrder()}
      >
        <Text style={{ fontSize: 32, color: "red" }}>{total}</Text>
      </Pressable>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({});
