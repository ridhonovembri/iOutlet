import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  StatusBar,
} from "react-native";

import React, { useState, useEffect, useCallback } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { GetAllProducts } from "../../services/dal/ProductDAL";

import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLORS, SIZES } from "../../constants/index";

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
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                marginHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AntDesign name="back" size={24} color="black" />
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: "regular",
                  fontSize: SIZES.medium + 2,
                }}
              >
                Home
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: SIZES.small,
              backgroundColor: COLORS.secondary,
              borderRadius: SIZES.medium,
              marginVertical: SIZES.medium,
              justifyContent: "center",
              alignContent: "center",
              height: 50,
            }}
          >
            <TouchableOpacity>
              <Ionicons
                name="search"
                size={24}
                color="black"
                style={{
                  marginHorizontal: 10,
                  color: COLORS.gray,
                  marginTop: SIZES.small,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.secondary,
                marginRight: SIZES.small,
                borderRadius: SIZES.small,
              }}
            >
              <TextInput
                style={{ fontFamily: "regular", width: "100%", height: "100%" }}
              />
            </View>
          </View>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleDetail(item)}>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      height: 80,
                      borderWidth: 0.5,
                      width: 80,
                      borderRadius: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      marginVertical: 5,
                      marginHorizontal: 10,
                    }}
                  >
                    <Text style={{ fontSize: 48 }}>
                      {productInitialName(item.product_name)}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ marginVertical: 5 }}>
                      Category : {item.category_name}
                    </Text>
                    <Text style={{ marginBottom: 5 }}>{item.product_name}</Text>
                    <Text>Rp.{item.product_price}</Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>

    // {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //   <View style={{flex: 1}}>
    //     <View style={styles.textBox}>
    //       <TextInput placeholder="Search" />
    //       <Feather name="search" size={24} color="gray" />
    //     </View>
    //     <View style={{ flex: 1 }}>
    //       <FlatList
    //         data={products}
    //         keyExtractor={(item) => item.id.toString()}
    //         renderItem={({ item }) => (
    //           <View
    //             style={{
    //               height: 100,
    //               borderWidth: 0.5,
    //               margin: 5,
    //               padding: 5,
    //               borderRadius: 10,
    //             }}
    //           >
    //             <Pressable onPress={() => handleDetail(item)}>
    //               <View style={{ paddingVertical: 5, flexDirection: "row" }}>
    //                 <View
    //                   style={{
    //                     height: 80,
    //                     borderWidth: 0.5,
    //                     width: 80,
    //                     borderRadius: 5,
    //                     justifyContent: "center",
    //                     alignItems: "center",
    //                     marginRight: 20,
    //                   }}
    //                 >
    //                   <Text style={{ fontSize: 48 }}>
    //                     {productInitialName(item.product_name)}
    //                   </Text>
    //                 </View>
    //                 <View>
    //                   <Text style={{ marginBottom: 5 }}>
    //                     {item.category_name}
    //                   </Text>
    //                   <Text style={{ marginBottom: 5 }}>
    //                     {item.product_name}
    //                   </Text>
    //                   <Text>Rp.{item.product_price}</Text>
    //                 </View>
    //               </View>
    //             </Pressable>
    //           </View>
    //         )}
    //       />
    //     </View>
    //     <Pressable onPress={() => handleDetail()}>
    //       <View
    //         style={{
    //           bottom: 20,
    //           right: 20,
    //           position: "absolute",
    //         }}
    //       >
    //         <AntDesign name="pluscircleo" size={40} color="black" />
    //       </View>
    //     </Pressable>
    //   </View>
    // </TouchableWithoutFeedback> */}
  );
};

export default ProductScreen;
