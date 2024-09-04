import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProductScreen from "../screens/ProductScreen";
// import ProductDetailScreen from "../screens/ProductDetailScreen";
import HomeScreen from "../screens/HomeScreen";
import PosScreen from "../screens/PosScreen";
import OrderScreen from "../screens/OrderScreen";
import Transaction from "../screens/TransactionScreen";
import TableScreen from "../screens/TableScreen";
import AreaScreen from "../screens/AreaScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ShopInformation from "../screens/ShopInformation";
import TransactionScreen from "../screens/TransactionScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import SettingScreen from "../screens/SettingScreen";
import CheckoutScreen from "../screens/CheckoutScreen";

import { AppProvider } from "../context/AppContext";
import SandboxScreen from "../screens/SandboxScreen";

const AppNavigator = () => {
  const stack = createNativeStackNavigator();
  const tab = createBottomTabNavigator();

  function BottomTab() {
    return (
      <tab.Navigator>
        <tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
        />
        <tab.Screen
          name="POS"
          component={PosScreen}
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
        />
        <tab.Screen
          name="Order"
          component={OrderScreen}
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
        />
        <tab.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
        />
        <tab.Screen
          name="Sandbox"
          component={SandboxScreen}
          options={{
            headerShown: false,
            headerTransparent: true,
          }}
        />
      </tab.Navigator>
    );
  }

  return (
    <AppProvider>
      <NavigationContainer>
        <stack.Navigator
          screenOptions={{ headerTitle: "", headerTransparent: false }}
        >
          <stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="Product"
            component={ProductScreen}
            options={{
              headerStyle: { backgroundColor: "red" },
              headerTintColor: "white",
              headerTitle: "Produk",
            }}
          />
          <stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{ headerTitle: "Product Detail" }}
          />
          <stack.Screen
            name="Table"
            component={TableScreen}
            options={{ headerTitle: "Table" }}
          />
          <stack.Screen
            name="Area"
            component={AreaScreen}
            options={{ headerTitle: "Location/Floor/Area" }}
          />
          <stack.Screen
            name="Category"
            component={CategoryScreen}
            options={{ headerTitle: "Category" }}
          />
          <stack.Screen
            name="ShopInfo"
            component={ShopInformation}
            options={{ headerTitle: "Outlet Information" }}
          />
          <stack.Screen
            name="Checkout"
            component={CheckoutScreen}
            options={{ headerTitle: "Checkout" }}
          />
          <stack.Screen
            name="Transaction"
            component={TransactionScreen}
            options={{ headerTitle: "Transaction" }}
          />
        </stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default AppNavigator;
