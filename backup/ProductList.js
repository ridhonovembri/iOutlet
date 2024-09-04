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
// import { useNavigation } from "@react-navigation/native";

import {
  GetAllProducts,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} from "../services/dal/ProductDAL";

const ProductList = ({ onClickDetail }) => {
  const [products, setProducts] = useState({});

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImageUrl, setProductImageUrl] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  getData = async () => {
    try {
      await GetAllProducts(setProducts);
    } catch (error) {
      console.log("[error-getData]:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  handleEdit = (prd) => {
    console.log("prd edit", prd);
    setProductId(prd.id);
    setProductName(prd.product_name);
    setProductDesc(prd.product_desc);
    setProductPrice(prd.product_price);
    setProductImageUrl(prd.product_image_url);
    setIsEdit(true);
    setModalVisible(true);
  };

  handleDelete = async (prd) => {
    try {
      await DeleteProduct(prd);
      await getData();
    } catch (error) {
      console.log("[error-delete]:", error);
    }
  };

  handleBtnAdd = async () => {
    const prd = {
      productId,
      productName,
      productDesc,
      productPrice,
      productImageUrl,
    };

    //   console.log('prd', prd)

    if (!isEdit) {
      await CreateProduct(prd);
    } else {
      await UpdateProduct(prd);
    }

    await getData();
    setModalVisible(!modalVisible);
  };

  clearForm = () => {
    setProductName("");
    setProductDesc("");
    setProductPrice("");
    setProductImageUrl("");
    setIsEdit(false);
  };

  // handleOpenDetail = (item) => {

  //   console.log('product', item)

  // }

  return (
    <View>
      <Text>Productx</Text>
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({});
