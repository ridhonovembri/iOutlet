import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { GetAllProducts } from "../services/dal/ProductDAL";

import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

const ProductScreen = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState({});

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    try {
      await GetAllProducts(setProducts);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const productInitialName = (item) => {
    let name = item.split(" ");
    let initialName = "";

    for (let i = 0; i < name.length; i++) {
      let firstLetter = name[i][0];
      initialName = initialName.concat(firstLetter);
    }

    return initialName;
  };

  const handleDetail = (item) => {
    if (item != null) {
      navigation.navigate("ProductDetail", { item });
    } else {
      const item = {
        id: 0,
        product_name: "",
        product_price: 0,
      };

      navigation.navigate("ProductDetail", { item });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.textBox}>
          <TextInput placeholder="Search" />
          <Feather name="search" size={24} color="gray" />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  height: 100,
                  borderWidth: 0.5,
                  margin: 5,
                  padding: 5,
                  borderRadius: 10,
                }}
              >
                <Pressable onPress={() => handleDetail(item)}>
                  <View style={{ paddingVertical: 5, flexDirection: "row" }}>
                    <View
                      style={{
                        height: 80,
                        borderWidth: 0.5,
                        width: 80,
                        borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 20,
                      }}
                    >
                      <Text style={{ fontSize: 48 }}>
                        {productInitialName(item.product_name)}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ marginBottom: 5 }}>{item.category_name}</Text>
                      <Text style={{ marginBottom: 5 }}>
                        {item.product_name}
                      </Text>
                      <Text>Rp.{item.product_price}</Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            )}
          />
        </View>
        <Pressable onPress={() => handleDetail()}>
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

export default ProductScreen;

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
