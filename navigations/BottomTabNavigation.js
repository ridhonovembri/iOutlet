import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import HomeStack from "./HomeStack";
import PosStack from "./PosStack";
import OrderStack from "./OrderStack";
import SettingStack from "./SettingStack";

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  const screenOptions = {
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle: {
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      height: 50,
      backgroundColor: COLORS.tertiary,
    },
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={screenOptions}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons name={focused ? "home" : "home-outline"} size={28} />
              );
            },
          }}
        />
        <Tab.Screen
          name="POSTab"
          component={PosStack}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name={focused ? "calculator" : "calculator-outline"}
                  size={28}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="OrderTab"
          component={OrderStack}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons name={focused ? "cart" : "cart-outline"} size={28} />
              );
            },
          }}
        />
        <Tab.Screen
          name="SettingsTab"
          component={SettingStack}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name={focused ? "settings-sharp" : "settings-outline"}
                  size={28}
                />
              );
            },
          }}
        />             
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigation;
