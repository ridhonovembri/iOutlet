import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#6AB7E2" />
      <View style={styles.boxHeader}>
        <Text style={styles.textHeader}>Home</Text>
      </View>
      <Pressable onPress={() => navigation.navigate("ShopInfo")}>
        <View style={styles.boxShopInfo}>
          <Text>Informasi Outlet</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Transaction')}>
        <View style={styles.boxRevenue}>
          <Text>Penjualan</Text>
        </View>
      </Pressable>
      <View style={styles.boxOrder}>
        <Text>Pesanan</Text>
        <View style={styles.flexOrder}>
          <Pressable style={{ height: 80, borderWidth: 0.5, width: "30%" }}>
            <Text>Masuk</Text>
          </Pressable>
          <Pressable style={{ height: 80, borderWidth: 0.5, width: "30%" }}>
            <Text>Menunggu Dibayar</Text>
          </Pressable>
          <Pressable style={{ height: 80, borderWidth: 0.5, width: "30%" }}>
            <Text>Selesai</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.boxCatalogue}>
        <Text>Katalog</Text>
        <View style={styles.flexCatalogue1}>
          <Pressable
            style={{ height: 80, borderWidth: 0.5, width: "30%" }}
            onPress={() => navigation.navigate("Product")}
          >
            <Text>Produk</Text>
          </Pressable>
          <Pressable
            style={{ height: 80, borderWidth: 0.5, width: "30%" }}
            onPress={() => navigation.navigate("Category")}
          >
            <Text>Kategori</Text>
          </Pressable>
        </View>
        <View style={styles.flexCatalogue2}>
          <Pressable
            style={{ height: 80, borderWidth: 0.5, width: "30%" }}
            onPress={() => navigation.navigate("Table")}
          >
            <Text>Meja</Text>
          </Pressable>
          <Pressable
            style={{ height: 80, borderWidth: 0.5, width: "30%" }}
            onPress={() => navigation.navigate("Area")}
          >
            <Text>Area</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0",
  },
  boxHeader: {
    height: 48,
    borderWidth: 0.5,
    backgroundColor: "#fff",
    borderColor: "#6AB7E2",
    alignItems: "flex-start",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
  },
  textHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6AB7E2",
    marginLeft: 10,
  },
  boxShopInfo: {
    height: 52,
    borderWidth: 0.5,
    backgroundColor: "#fff",
    borderColor: "#6AB7E2",
    margin: 5,
    borderRadius: 10,
  },
  boxRevenue: {
    height: 52,
    borderWidth: 0.5,
    backgroundColor: "#fff",
    borderColor: "#6AB7E2",
    margin: 5,
    borderRadius: 10,
  },
  boxOrder: {
    height: 150,
    borderWidth: 0.5,
    backgroundColor: "#fff",
    borderColor: "#6AB7E2",
    margin: 5,
    borderRadius: 10,
  },
  flexOrder: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boxCatalogue: {
    height: 200,
    borderWidth: 0.5,
    backgroundColor: "#fff",
    borderColor: "#6AB7E2",
    margin: 5,
    borderRadius: 10,
  },
  flexCatalogue1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexCatalogue2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
