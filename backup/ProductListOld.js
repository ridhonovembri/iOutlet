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
      <Text>Product</Text>
    </View>
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    //   <View stye={styles.container}>
    //     <View style={styles.headerTopBar}>
    //       <Text style={styles.headerTopBarText}>Product</Text>
    //       <Pressable onPress={() =>  onClickDetail({id: '', product_name:'', product_desc:'', product_price:0, product_image_url:''})}>
    //         <Text>Add</Text>
    //       </Pressable>
    //     </View>
    //     <View style={styles.header}>
    //       <Text style={styles.heading}>Name</Text>
    //       <Text style={styles.heading}>Price</Text>
    //     </View>
    //     <FlatList
    //       data={products}
    //       keyExtractor={(item) => item.id}
    //       renderItem={({ item }) => (
    //         <Pressable onPress={() => onClickDetail(item)}>
    //           <View style={styles.row}>
    //             <Text style={styles.cell}>{item.product_name}</Text>
    //             <Text style={styles.cell}>{item.product_price}</Text>
    //           </View>
    //         </Pressable>
    //       )}
    //     />
    //   </View>
    // </TouchableWithoutFeedback>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  headerTopBar: {
    // backgroundColor: "#fff",
    // paddingHorizontal: 12,
    // paddingVertical: 10,
    // borderRadius: 10,
    // elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  headerTopBarText: {
    // color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  heading: {
    flex: 1,
    fontSize: 18,
    backgroundColor: "#6AB7E2",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 2,
    borderRadius: 2,
    padding: 10,
  },
  cell: {
    fontSize: 15,
    textAlign: "left",
    flex: 1,
    padding: 5,
  },
});
