import { StyleSheet } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CheckoutScreen, OrderScreen } from "../screens/index";

const Stack = createNativeStackNavigator();

const OrderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Order"
        component={OrderScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default OrderStack;

const styles = StyleSheet.create({});
