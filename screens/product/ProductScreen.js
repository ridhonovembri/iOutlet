import {
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { GetAllProducts } from "../../services/dal/ProductDAL";

import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

import { COLORS, SIZES } from "../../constants/index";

const ProductScreen = () => {
  const [products, setProducts] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation();

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

  const handleSearch = (query) => {
    setSearchQuery(query);

    const filtered = products.filter(
      (product) =>
        product.product_name.toLowerCase().includes(query.toLowerCase()) ||
        product.category_name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered);
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
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="back" size={24} color="black" />
              <Text
                style={{
                  marginLeft: 5,
                  fontFamily: "regular",
                  fontSize: SIZES.medium,
                }}
              >
                Home
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ProductDetail")}>
            <Ionicons name="add-circle" size={36} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: SIZES.small,
            backgroundColor: COLORS.tertiary,
            borderRadius: SIZES.medium,
            marginBottom: 5,
            justifyContent: "center",
            alignContent: "center",
            height: 40,
          }}
        >
          <TouchableOpacity>
            <Ionicons
              name="search"
              size={24}
              color="black"
              style={{
                marginHorizontal: 10,
                color: COLORS.black,
                marginTop: 5,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.tertiary,
              marginRight: SIZES.small,
              borderRadius: SIZES.small,
            }}
          >
            <TextInput
              value={searchQuery}
              onChangeText={handleSearch}
              style={{ fontFamily: "regular", width: "100%", height: "100%" }}
            />
          </View>
        </View>
        <FlatList
          data={searchQuery.length > 0 ? filteredProducts : products}
          keyExtractor={(item) => item.id.toString()}
          style={{ marginBottom: 40 }}
          renderItem={({ item, index }) => (
            <Pressable onPress={() => handleDetail(item)}>
              <View
                style={{
                  flexDirection: "row",
                  borderTopWidth: 0.5,
                  backgroundColor:
                    index % 2 == 0 ? COLORS.secondary : COLORS.lightwhite,
                }}
              >
                <View
                  style={{
                    height: 80,
                    width: 80,
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 5,
                    marginHorizontal: 10,
                  }}
                >
                  <Text
                    style={{ fontFamily: "regular", fontSize: SIZES.xxLarge }}
                  >
                    {productInitialName(item.product_name)}
                  </Text>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{ fontFamily: "regular", fontSize: SIZES.medium }}
                  >
                    {item.product_name}
                  </Text>
                  <Text
                    style={{ fontFamily: "regular", fontSize: SIZES.medium }}
                  >
                    Rp. {item.product_price.toLocaleString("id-ID")}
                  </Text>
                  <Text style={{ fontFamily: "regular" }}>
                    Category : {item.category_name}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>

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
