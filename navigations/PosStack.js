import { StyleSheet } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PosScreen } from "../screens/index";

const Stack = createNativeStackNavigator();

const PosStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pos"
        component={PosScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PosStack;

const styles = StyleSheet.create({});
