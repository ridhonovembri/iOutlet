import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { UpdateProduct } from "../services/dal/ProductDAL";

const ProductDetailScreen = ({ route, navigation }) => {
  const { id, product_name, product_desc, product_price, product_image_url } =
    route.params.item;

  // console.log("detailScreen id", id);
  // console.log("detailScreen name", product_name);
  // console.log("detailScreen desc", product_desc);
  // console.log("detailScreen url", product_image_url);
  // console.log("detailScreen price", product_price);

  const [productId, setProductId] = useState('')
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (productId != null) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }

    setProductId(id)
    setProductName(product_name)
    setProductDesc(product_desc)
    setProductPrice(product_price)
    setProductImage(product_image_url)
  }, [id]);

  handleSave = async () => {
    // console.log('save', productName, '-', productDesc, '-', productPrice, '-', productImage )
    // Alert.alert('Product has been updated','')
    // navigation.navigate('Product')

    const product = {
      productId,
      productName,
      productDesc,
      productPrice,
      productImage,
    };

    // console.log("isEdit", isEdit);
    // console.log('product', product)

    try {
      await UpdateProduct(product);
      Alert.alert('Product has been updated','')
      navigation.navigate('Product')
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 10,
          paddingRight: 40,
          marginVertical: 5,
        }}
      >
        <Text>Product Name</Text>
        <TextInput
          placeholder="Product Name"
          style={{
            borderWidth: 1,
            width: 180,
            height: 40,
            borderRadius: 10,
            paddingLeft: 10,
          }}
          onChangeText={(text) => setProductName(text)}
          value={productName}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 10,
          paddingRight: 40,
          marginVertical: 5,
        }}
      >
        <Text>Product Desciption</Text>
        <TextInput
          placeholder="Product Desc"
          style={{
            borderWidth: 1,
            width: 180,
            height: 40,
            borderRadius: 10,
            paddingLeft: 10,
          }}
          onChangeText={(text) => setProductDesc(text)}
          value={productDesc}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 10,
          paddingRight: 40,
          marginVertical: 5,
        }}
      >
        <Text>Product Price</Text>
        <TextInput
          placeholder="Product Price"
          style={{
            borderWidth: 1,
            width: 180,
            height: 40,
            borderRadius: 10,
            paddingLeft: 10,
          }}
          onChangeText={(text) => setProductPrice(text)}
          value={productPrice}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 10,
          paddingRight: 40,
          marginVertical: 5,
        }}
      >
        <Text>Product Image</Text>
        <TextInput
          placeholder="Product Image"
          style={{
            borderWidth: 1,
            width: 180,
            height: 40,
            borderRadius: 10,
            paddingLeft: 10,
          }}
          onChangeText={(text) => setProductImage(text)}
          value={productImage}
        />
      </View>
      <View style={{ marginLeft: 10, marginRight: 40, marginVertical: 40 }}>
        <Button title="SAVE" onPress={() => handleSave()} />
      </View>
    </View>
  );
};

export default ProductDetailScreen;
