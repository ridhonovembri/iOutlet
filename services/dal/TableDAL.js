import ConnectToDB from "./DB";

export const GetAllTables = async (successCallBack) => {
  try {
    const db = await ConnectToDB();
    const data = await db.getAllAsync("SELECT * FROM tables");
    // console.log("data", data);
    successCallBack(data);
  } catch (error) {
    throw error;
  }
};

export const AddTable = async (item) => {
  // console.log("cat", cat);
  try {
    const db = await ConnectToDB();
    const statement = await db.prepareAsync(
      "INSERT INTO tables (table_no, table_name) VALUES (?,?)"
    );
    await statement.executeAsync([item.tableNo, item.tableName]);
  } catch (error) {
    throw error;
  }
};

export const UpdateTable = async (item) => {
  // console.log('update cat', cat)
  try {
    const db = await ConnectToDB();
    await db.runAsync("UPDATE tables SET table_no=?, table_name=? WHERE id=?", [
      item.tableNo,
      item.tableName,
      item.tableId,
    ]);
  } catch (error) {
    throw error;
  }
};

export const DeleteTable = async (id) => {
  // console.log('category', id)
  try {
    const db = await ConnectToDB();
    await db.runAsync("DELETE FROM tables WHERE id=?", id);
  } catch (error) {
    throw error;
  }
};
