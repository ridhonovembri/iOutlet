import * as SQLite from "expo-sqlite";

export const GetAllUsers = async (successCallBack) => {
  try {
    const db = await SQLite.openDatabaseAsync("mySQLiteDB.db");
    const data = await db.getAllAsync("SELECT * FROM users");
    successCallBack(data);
  } catch (error) {
    throw error;
  }
};

export const DeleteUser = async (id) => {
  try {
    const db = await SQLite.openDatabaseAsync("mySQLiteDB.db");
    await db.runAsync("DELETE FROM users WHERE id=?", id);
  } catch (error) {
    throw error;
  }
};

export const UpdateUser = async (id, user, password) => {
  try {
    const db = await SQLite.openDatabaseAsync("mySQLiteDB.db");
    await db.runAsync("UPDATE users SET user_name=?, password=? WHERE id=?", [
      user,
      password,
      id,
    ]);
  } catch (error) {
    throw error;
  }
};

export const RegisterUser = async (userName, password) => {
  const db = await SQLite.openDatabaseAsync("mySQLiteDB.db");
  const statement = await db.prepareAsync(
    "INSERT INTO users(user_name, password) VALUES(?,?)"
  );
  
  const result = await statement.executeAsync([userName, password]);
  return result;
};

export const Login = async (userName, password) => {};
