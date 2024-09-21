import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./Home.style";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

import { COLORS, SIZES } from "../../constants/index";

import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const productInitialName = (item) => {
    let name = item.split(" ");
    let initialName = "";

    for (let i = 0; i < name.length; i++) {
      let firstLetter = name[i][0];
      initialName = initialName.concat(firstLetter);
    }

    return initialName;
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate('Transaction')}>
        <View style={styles.header}>
          <Ionicons name="stats-chart" size={42} color="black" />
          <View style={{ marginHorizontal: 5 }}>
            <Text style={{ fontFamily: "regular" }}>Revenue</Text>
            <Text>Today</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: SIZES.large,
                fontFamily: "extraBold",
                color: COLORS.tertiary,
              }}
            >
              Rp 10.000.000
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ marginHorizontal: 15, marginTop: 20 }}>
        <Text
          style={{
            fontFamily: "extraBold",
            fontSize: SIZES.medium,
            color: COLORS.tertiary,
          }}
        >
          Catalogues
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{ flexDirection: "row", columnGap: 5, marginHorizontal: 5 }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Category")}>
            <View style={styles.cataloguesItem}>
              <MaterialIcons name="category" size={82} color="#0A01A4" />
              <Text style={{ fontFamily: "regular" }}>Category</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Product")}>
            <View style={styles.cataloguesItem}>
              <AntDesign name="appstore1" size={82} color="#0A01A4" />
              <Text style={{ fontFamily: "regular" }}>Product</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.cataloguesItem}>
              <MaterialCommunityIcons
                name="chair-rolling"
                size={82}
                color="#0A01A4"
              />
              <Text style={{ fontFamily: "regular" }}>Table</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Area")}>
            <View style={styles.cataloguesItem}>
              <MaterialIcons name="alt-route" size={82} color="#0A01A4" />
              <Text style={{ fontFamily: "regular" }}>Area/Floor</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.cataloguesItem}>
              <Ionicons name="people" size={82} color="#0A01A4" />
              <Text style={{ fontFamily: "regular" }}>Customer</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.cataloguesItem}>
              <AntDesign name="adduser" size={82} color="#0A01A4" />
              <Text style={{ fontFamily: "regular" }}>User</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ marginHorizontal: 15, marginTop: 20 }}>
        <Text
          style={{
            fontFamily: "extraBold",
            fontSize: SIZES.medium,
            color: COLORS.tertiary,
          }}
        >
          Order Status
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.ordersItem}>
            <Text
              style={{ fontFamily: "medium", fontSize: SIZES.xxLarge + 10 }}
            >
              15
            </Text>
          </View>
          <Text>Ordered</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.ordersItem}>
            <Text
              style={{ fontFamily: "medium", fontSize: SIZES.xxLarge + 10 }}
            >
              10
            </Text>
          </View>
          <Text>On Table</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.ordersItem}>
            <Text
              style={{ fontFamily: "medium", fontSize: SIZES.xxLarge + 10 }}
            >
              100
            </Text>
          </View>
          <Text>Paid</Text>
        </View>
      </View>
      <View style={{ marginHorizontal: 15, marginTop: 20 }}>
        <Text
          style={{
            fontFamily: "extraBold",
            fontSize: SIZES.medium,
            color: COLORS.tertiary,
          }}
        >
          Top Rank - Todays
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          columnGap: 10,
          marginHorizontal: 5,
          justifyContent: "space-around",
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.topRankItem}>
            <Text
              style={{ fontFamily: "medium", fontSize: SIZES.xxLarge + 10 }}
            >
              {productInitialName("BEBEK BAKAR")}
            </Text>
          </View>
          <Text>Bebek Bakar</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.topRankItem}>
            <Text
              style={{ fontFamily: "medium", fontSize: SIZES.xxLarge + 10 }}
            >
              {productInitialName("AYAM GORENG")}
            </Text>
          </View>
          <Text>Ayam Goreng</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.topRankItem}>
            <Text
              style={{ fontFamily: "medium", fontSize: SIZES.xxLarge + 10 }}
            >
              {productInitialName("BUBUR AYAM")}
            </Text>
          </View>
          <Text>Bubur Ayam</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
