// import { useSQLiteContext } from "expo-sqlite";
import * as SQLite from "expo-sqlite";

// const db = useSQLiteContext();
// let db = await SQLite.openDatabaseAsync("mySQLiteDB.db");
// const db = SQLite.openDatabase("mySQLiteDB.db");
// const db = SQLite.openDatabaseSync("mySQLiteDB.db");

export const GetAllTodo = async (successCallBack) => {
  const db = await SQLite.openDatabaseAsync("mySQLiteDB.db");
  // console.log('db select', db)
  // db.withTransactionAsync(async () => {
  const data = await db.getAllAsync("SELECT * FROM todo");
  successCallBack(data);
  // });
};

export const CreateTodo = async (todo) => {
  const db = await SQLite.openDatabaseAsync("mySQLiteDB.db");
  db.withTransactionAsync(async () => {
    return await db.runAsync(`INSERT INTO todo(todo) VALUES(?)`, todo);
  });
};

export const UpdateTodo = async (id, todo) => {
  const db = await SQLite.openDatabaseAsync("mySQLiteDB.db");
  db.withTransactionAsync(async () => {
    return await db.runAsync(`UPDATE todo SET todo=? WHERE id=?`, todo, id);
  });
};

export const DeleteTodo = async (id) => {
  const db = await SQLite.openDatabaseAsync("mySQLiteDB.db");
  // console.log('db delete', db)
  db.withTransactionAsync(async () => {
    return await db.runAsync(`DELETE FROM todo WHERE id=?`, id);
  });
};
