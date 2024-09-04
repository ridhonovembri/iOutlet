import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { GetAllOrders } from "../services/dal/OrderDAL";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const TransactionScreen = () => {
  const [orders, setOrders] = useState([]);  

  const getData = async () => {
    await GetAllOrders(setOrders);
  };

  useFocusEffect(
    useCallback(() => {
      getData();      
    }, [])
  );

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text>{item.order_no}</Text>
        <Text>{item.order_date}</Text>
        <Text>{item.product_name}</Text>
        <Text>{item.area_name}</Text>
        <Text>{item.customer_name}</Text>
        <Text>{item.table_no}</Text>
        <Text>{item.order_discount}</Text>
        <Text>{item.order_amount}</Text>
        <Text>{item.remarks}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList data={orders} renderItem={renderItem} />
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({});
