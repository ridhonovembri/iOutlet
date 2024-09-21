import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SettingScreen, OutletScreen } from "../screens/index";

const Stack = createNativeStackNavigator()

const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Outlet"
        component={OutletScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SettingStack;
