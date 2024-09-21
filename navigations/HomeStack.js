import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  AreaScreen,
  CategoryScreen,
  HomeScreen,
  ProductScreen,
  ProductDetailScreen,
  TableScreen,
  TransactionScreen
} from "../screens/index";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Area"
        component={AreaScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Table"
        component={TableScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
