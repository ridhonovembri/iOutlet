import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";

import { Ctx } from "../../context/AppContext";
import {
  Addproduct,
  UpdateProduct,
  DeleteProduct,
} from "../../services/dal/ProductDAL";

import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

import { COLORS, SIZES } from "../../constants/index";

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
      Alert.alert("", "Change Record...?", [
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
            // navigation.navigate("Product");
            Alert.alert("","Record is UPDATED")
          },
        },
      ]);
    } else {
      Alert.alert("", "Add Record...?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            const newProduct = {
              ...product,
              categoryId: value,
            };

            Addproduct(newProduct);
            // navigation.navigate("Product");
            Alert.alert("","Record is SAVED")
          },
        },
      ]);
    }
  };

  const handleDelete = async () => {
    try {
      Alert.alert("", "Delete Record...?", [
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
      <SafeAreaView>
        <View
          style={{
            marginHorizontal: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="back" size={24} color="black" />
              <Text
                style={{
                  marginLeft: 5,
                  fontFamily: "regular",
                  fontSize: SIZES.medium,
                }}
              >
                Back
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSave()}>
            <Ionicons name="save" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 10, marginTop: 5, marginBottom: 20 }}>
          <Text style={{ fontFamily: "regular" }}>Category</Text>
          <View
            style={{
              backgroundColor: COLORS.secondary,
              marginRight: SIZES.small,
              borderRadius: SIZES.small - 5,
              height: 45,
            }}
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
        </View>
        <View style={{ marginLeft: 10, marginBottom: 10 }}>
          <Text style={{ fontFamily: "regular" }}>Product Name</Text>
          <View
            style={{
              backgroundColor: COLORS.secondary,
              marginRight: SIZES.small,
              borderRadius: SIZES.small - 5,
              height: 45,
            }}
          >
            <TextInput
              style={{
                fontFamily: "regular",
                width: "100%",
                height: "100%",
                marginLeft: 5,
              }}
              value={productName}
              onChangeText={(text) => setProductName(text)}
            />
          </View>
        </View>
        <View style={{ marginLeft: 10, marginBottom: 10 }}>
          <Text style={{ fontFamily: "regular" }}>Price</Text>
          <View
            style={{
              backgroundColor: COLORS.secondary,
              marginRight: SIZES.small,
              borderRadius: SIZES.small - 5,
              height: 45,
            }}
          >
            <TextInput
              style={{
                fontFamily: "regular",
                width: "100%",
                height: "100%",
                marginLeft: 5,
              }}
              value={productPrice.toLocaleString("id-ID")}
              onChangeText={(text) => setProductPrice(text)}
            />
          </View>
        </View>
        <View style={{ marginLeft: 10, marginBottom: 10 }}>
          <Text style={{ fontFamily: "regular" }}>Description</Text>
          <View
            style={{
              backgroundColor: COLORS.secondary,
              marginRight: SIZES.small,
              borderRadius: SIZES.small - 5,
              height: 100,
            }}
          >
            <TextInput
              style={{
                fontFamily: "regular",
                width: "100%",
                height: "100%",
                marginLeft: 5,
                textAlignVertical: "top",
              }}
              multiline={true}
              numberOfLines={4}
              value={productDesc}
              onChangeText={(text) => setProductDesc(text)}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>

    // <View style={{ flex: 1, padding: 10 }}>
    // <View
    //   style={{
    //     height: "100%",
    //     borderWidth: 0.5,
    //     borderRadius: 10,
    //     width: "100%",
    //   }}
    // >
    //   <View style={{ flexDirection: "row" }}>
    //     <View
    //       style={{
    //         height: 130,
    //         width: 130,
    //         borderWidth: 0.5,
    //         margin: 15,
    //         borderRadius: 10,
    //       }}
    //     ></View>
    //     <View>
    //       <MaterialIcons
    //         name="delete"
    //         size={36}
    //         color="black"
    //         style={{ alignSelf: "flex-end", marginVertical: 5 }}
    //         onPress={() => handleDelete()}
    //       />
    //       <View style={{ borderWidth: 0.5, borderRadius: 10 }}>
    //         <TextInput
    //           placeholder="Product Name"
    //           style={{ width: 200, height: 50, marginLeft: 5 }}
    //           value={productName}
    //           onChangeText={(text) => setProductName(text)}
    //         />
    //       </View>
    //     </View>
    //   </View>
    //   <View
    //     style={{
    //       width: "100%",
    //       height: 50,
    //       borderWidth: 0.5,
    //       padding: 15,
    //     }}
    //   >
    //     <Dropdown
    //       style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
    //       placeholderStyle={styles.placeholderStyle}
    //       selectedTextStyle={styles.selectedTextStyle}
    //       inputSearchStyle={styles.inputSearchStyle}
    //       iconStyle={styles.iconStyle}
    //       data={categories.categories}
    //       search
    //       maxHeight={300}
    //       labelField="category_name"
    //       valueField="id"
    //       placeholder={!isFocus ? "Select item" : "..."}
    //       searchPlaceholder="Search..."
    //       value={categoryId}
    //       onFocus={() => setIsFocus(true)}
    //       onBlur={() => setIsFocus(false)}
    //       onChange={(item) => {
    //         setValue(item.id);
    //         setIsFocus(false);
    //       }}
    //     />
    //   </View>
    //   <View
    //     style={{
    //       width: "100%",
    //       height: 50,
    //       borderWidth: 0.5,
    //       padding: 15,
    //     }}
    //   >
    //     <TextInput
    //       placeholder="Price"
    //       value={productPrice.toString()}
    //       onChangeText={(text) => setProductPrice(text)}
    //     />
    //   </View>
    //   <View
    //     style={{
    //       width: "100%",
    //       height: 50,
    //       borderWidth: 0.5,
    //       padding: 15,
    //     }}
    //   >
    //     <TextInput
    //       placeholder="Description  "
    //       value={productDesc}
    //       onChangeText={(text) => setProductDesc(text)}
    //     />
    //   </View>
    //   <View style={{ flex: 1, justifyContent: "flex-end" }}>
    //     <Button title="SAVE" onPress={() => handleSave()} />
    //   </View>
    // </View>
    // </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
