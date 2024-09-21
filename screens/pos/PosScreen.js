import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
  Button,
} from "react-native";
import React, { useContext, useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ctx } from "../../context/AppContext";

import { GetAllProducts } from "../../services/dal/ProductDAL";

import { Badge } from "react-native-elements";
import Feather from "@expo/vector-icons/Feather";

const PosScreen = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(0);
  const [productName, setProductName] = useState("");
  const [qty, setQty] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [price, setPrice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const { cart, setCart } = useContext(Ctx);

  const navigation = useNavigation();

  const getData = async () => {
    try {
      await GetAllProducts(setProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const handleAddToCart = async () => {
    const selectedProduct = {
      productId,
      productName,
      price,
      qty,
      remarks,
    };

    setCart([...cart, selectedProduct]);
    setModalVisible(!modalVisible);
  };

  const handleOpenModal = (item) => {
    handleClearModal();
    setProductId(item.id);
    setProductName(item.product_name);
    setPrice(item.product_price);
    setModalVisible(!modalVisible);
  };

  const handleCreateOrder = async () => {
    navigation.navigate("Order");
  };

  const handleClearModal = () => {
    setQty(0);
    setRemarks("");
  };

  return (
    <>
      <View
        style={{
          height: 40,
          borderWidth: 0.5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 5,
          padding: 5,
          borderRadius: 10,
        }}
      >
        <TextInput placeholder="Search" />
        <Feather name="search" size={24} color="gray" />
      </View>
      <View
        style={{
          // borderWidth: 0.5,
          // borderRadius: 10,
          flex: 1,
          margin: 5,
        }}
      >
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
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
                  opacity: 0.8,
                  width: "100%",
                  height: "40%",
                }}
              >
                <View>
                  <View
                    style={{
                      height: 40,
                      borderWidth: 1,
                      padding: 10,
                      margin: 10,
                    }}
                  >
                    <Text>{productName}</Text>
                  </View>
                  <View
                    style={{
                      height: 40,
                      borderWidth: 1,
                      padding: 10,
                      margin: 10,
                    }}
                  >
                    <TextInput
                      placeholder="0"
                      value={qty}
                      onChangeText={(text) => setQty(text)}
                    />
                  </View>
                  <View
                    style={{
                      height: 40,
                      borderWidth: 1,
                      padding: 10,
                      margin: 10,
                    }}
                  >
                    <TextInput
                      placeholder="Remarks"
                      value={remarks}
                      onChangeText={(text) => setRemarks(text)}
                    />
                  </View>
                  <Button title="Add" onPress={() => handleAddToCart()} />
                  <Button
                    title="Cancel"
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {products.map((item, index) => (
              <Pressable key={index} onPress={() => handleOpenModal(item)}>
                <View
                  style={{
                    height: 110,
                    width: 110,
                    borderWidth: 1,
                    borderRadius: 10,
                    marginHorizontal: 7,
                    marginVertical: 12,
                  }}
                >
                  <Text>{item.product_name}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
        <Pressable onPress={() => handleCreateOrder()}>
          <View
            style={{
              bottom: 10,
              right: 20,
              position: "absolute",
            }}
          >
            <Feather name="shopping-cart" size={36} color="blue" />
            <Badge
              status="error"
              value={cart.length}
              containerStyle={{
                position: "absolute",
                bottom: 40,
                height: 20,
              }}
            />
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default PosScreen;
