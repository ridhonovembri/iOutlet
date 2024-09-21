import { SQLiteProvider } from "expo-sqlite";
import AppNavigator from "./navigations/AppNavigator";
import { AppProvider } from "./context/AppContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

async function initializeDatabase(db) {
  try {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;   
        PRAGMA foreign_keys = ON;       
        
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product_name TEXT,
          product_price INTEGER,
          product_desc TEXT,
          category_id  INTEGER,
          FOREIGN KEY (category_id)
          REFERENCES categories (id) 
            ON UPDATE SET NULL
            ON DELETE SET NULL
        );             
        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category_name TEXT
        );            
        CREATE TABLE IF NOT EXISTS tables (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          table_no TEXT,
          table_name TEXT
        );                     
        CREATE TABLE IF NOT EXISTS areas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          area_name TEXT,          
          area_desc TEXT
        );
         CREATE TABLE IF NOT EXISTS customers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          customer_name TEXT,          
          phone_number TEXT
        );
        CREATE TABLE IF NOT EXISTS orders(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_no TEXT,
            order_date DATE,
            product_id INTEGER,
            qty INTEGER,
            customer_id INTEGER,
            table_id INTEGER,
            area_id INTEGER,
            order_discount INTEGER,
            order_amount INTEGER,
	          remarks TEXT,
            FOREIGN KEY(product_id) REFERENCES products(id) ON UPDATE SET NULL ON DELETE SET NULL,
            FOREIGN KEY(customer_id) REFERENCES customers(id) ON UPDATE SET NULL ON DELETE SET NULL,
            FOREIGN KEY(table_id) REFERENCES tables(id) ON UPDATE SET NULL ON DELETE SET NULL,
            FOREIGN KEY(area_id) REFERENCES areas(id) ON UPDATE SET NULL ON DELETE SET NULL    
        );         
        CREATE TABLE IF NOT EXISTS employees (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          empl_no TEXT,
          empl_name TEXT          
          );        
        CREATE TABLE IF NOT EXISTS todos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          todo TEXT
        );
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_name TEXT,
          password TEXT
        )
      `);
    console.log("Database Initialised");
  } catch (error) {
    console.log("Error while initializing database: ", error);
  }
}

export default function App() {
  const [fontsLoaded] = useFonts({
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    extraBold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    semiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SQLiteProvider databaseName="mySQLiteDB.db" onInit={initializeDatabase}>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </SQLiteProvider>
  );
}
