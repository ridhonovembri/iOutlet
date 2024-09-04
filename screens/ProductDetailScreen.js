import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Button,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Ctx } from "../context/AppContext";
import {
  Addproduct,
  UpdateProduct,
  DeleteProduct,
} from "../services/dal/ProductDAL";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Dropdown } from "react-native-element-dropdown";

const ProductDetailScreen = ({ route, navigation }) => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const categories = useContext(Ctx);
  // console.log('categories', categories.categories)

  useEffect(() => {
    // console.log(route.params)
    setProductId(route.params.item.id);
    setProductName(route.params.item.product_name);
    setProductPrice(route.params.item.product_price);
    setProductDesc(route.params.item.product_desc);
    setCategoryId(route.params.item.category_id);
  }, []);

  const handleSave = async () => {
    const product = {
      productId,
      productName,
      productPrice,
      productDesc,
      categoryId,
    };

    if (productId > 1) {
      Alert.alert("", "Ubah Data Produk...?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            // console.log('update', product)
            // console.log('selected cat', categoryId)
            const productUpdate = {
              ...product,
              categoryId: value ?? categoryId,
            };

            // console.log(productUpdate)

            UpdateProduct(productUpdate);
            navigation.navigate("Product");
          },
        },
      ]);
    } else {
      Alert.alert("", "Tambah Data Produk...?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            // console.log("tambah product:", product, " category: ", value);
            const newProduct = {
              ...product,
              categoryId: value,
            };

            // console.log(newProduct);

            Addproduct(newProduct);
            navigation.navigate("Product");
          },
        },
      ]);
    }
  };

  const handleDelete = async () => {
    try {
      Alert.alert("", "Hapus Data Produk...?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            DeleteProduct(productId);
            navigation.navigate("Product");
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, padding: 10 }}>
        <View
          style={{
            height: "100%",
            borderWidth: 0.5,
            borderRadius: 10,
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                height: 130,
                width: 130,
                borderWidth: 0.5,
                margin: 15,
                borderRadius: 10,
              }}
            ></View>
            <View>
              <MaterialIcons
                name="delete"
                size={36}
                color="black"
                style={{ alignSelf: "flex-end", marginVertical: 5 }}
                onPress={() => handleDelete()}
              />
              <View style={{ borderWidth: 0.5, borderRadius: 10 }}>
                <TextInput
                  placeholder="Product Name"
                  style={{ width: 200, height: 50, marginLeft: 5 }}
                  value={productName}
                  onChangeText={(text) => setProductName(text)}
                />
              </View>
            </View>
          </View>
          <View
            style={{ width: "100%", height: 50, borderWidth: 0.5, padding: 15 }}
          >
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={categories.categories}
              search
              maxHeight={300}
              labelField="category_name"
              valueField="id"
              placeholder={!isFocus ? "Select item" : "..."}
              searchPlaceholder="Search..."
              value={categoryId}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.id);
                setIsFocus(false);
              }}
            />
          </View>
          <View
            style={{ width: "100%", height: 50, borderWidth: 0.5, padding: 15 }}
          >
            <TextInput
              placeholder="Price"
              value={productPrice.toString()}
              onChangeText={(text) => setProductPrice(text)}
            />
          </View>
          <View
            style={{ width: "100%", height: 50, borderWidth: 0.5, padding: 15 }}
          >
            <TextInput
              placeholder="Description  "
              value={productDesc}
              onChangeText={(text) => setProductDesc(text)}
            />
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Button title="simpan" onPress={() => handleSave()} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({});
