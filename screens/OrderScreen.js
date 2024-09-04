import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Pressable,
  Modal,
  TextInput,
  Button
} from "react-native";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { Ctx } from "../context/AppContext";
import { AddOrder, DeleteOrderItem } from "../services/dal/OrderDAL";

import AntDesign from '@expo/vector-icons/AntDesign';

const OrderScreen = ({ route, navigation }) => {
  const { orderNo, total } = route.params
  const { cart, setCart } = useContext(Ctx);
  const [modalVisible, setModalVisible] = useState(false);
  // let total = route.params;

  // console.log('route', route)
  console.log('orderNo', orderNo)
  console.log('total', total)

  const createOrder = () => {
    setModalVisible(true);
    // route.params = 0;
    // AddOrder(cart)
    //   .then((orderNo) => {
    //     // console.log("response", response);
    //     navigation.navigate("Checkout", orderNo, total);
    //     // setOrderNo(response);
    //     // console.log("orderNo", orderNo);
    //   })
    //   .catch((error) => console.log("error", error));
    // console.log('before get orderNo')

    // console.log('after get orderNo')
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     let total = cart.reduce(
  //       (previous, current) =>
  //         previous + parseFloat(current.price) * parseFloat(current.qty),
  //       0
  //     );
  //     // setTotal(total);
  //   }, [])
  // );

  const handleDeleteItem = async (item) =>{
    console.log('delte item ==>', item.productId)
    await DeleteOrderItem(item.productId)
  }

  const handleCheckout = () => {
    console.log('checkput')
    navigation.navigate('Checkout')
  }

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 8,
          marginHorizontal: 0.5,
          elevation: 1,
          borderRadius: 3,
          paddingVertical: 5,
          paddingHorizontal: 6,
          backgroundColor: "#fff",
        }}
      >
        <View>
          <Text style={{ width: 180 }}>{item.productName}</Text>
          <Text>{item.remarks ? `**${item.remarks}` : ""}</Text>
        </View>
        <Text style={{ width: 70 }}>{item.price}</Text>
        <Text style={{ width: 50 }}>{item.qty}</Text>
        <Text style={{ width: 50 }}>{parseInt(item.price) * parseInt(item.qty)}</Text>
        <AntDesign name="close" size={24} color="black" onPress={() => handleDeleteItem(item)}/>
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          height: 40,
          borderWidth: 0.5,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Order No : {orderNo}</Text>
      </View>

      <View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                opacity: 0.9,
                width: "100%",
                height: "60%",
                borderWidth: 1,
                borderRadius: 10,                
                marginBottom: 20
              }}
            >
              <View>
                <View style={{borderWidth: 0.5, height: 40, width: '100%', marginVertical: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>
                    {/* Total: {total} */}
                  </Text>                  
                </View>      
                <View style={{borderWidth: 0.5, height: 40, width: '100%', marginVertical: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <TextInput placeholder="Pay" />                 
                </View>   
                <Button title="Add" onPress={() => handleCheckout()} />
                <Button
                  title="Cancel"
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={{ flex: 1, paddingVertical: 5, backgroundColor: "#fff" }}>
        <ScrollView horizontal>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                padding: 5,
                borderBottomWidth: 1,
                borderBottomColor: "#e1e1e1",
              }}
            >
              <Text style={{ flex: 1, width: 180 }}>Item</Text>
              <Text style={{ flex: 1, width: 70 }}>Price</Text>
              <Text style={{ flex: 1, width: 60 }}>Qty</Text>
              <Text style={{ flex: 1, width: 80 }}>Total</Text>
            </View>
            <FlatList
              data={cart}
              // keyExtractor={(item, index) => item.productId.toString()}
              renderItem={renderItem}
            />
            <Pressable
              style={{
                height: 50,
                backgroundColor: "lime",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => createOrder()}
            >
              <Text style={{ fontSize: 32, color: "red" }}>{total}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
