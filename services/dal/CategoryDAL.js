import ConnectToDB from "./DB";

export const GetAllCategories = async (successCallBack) => {
  try {
    const db = await ConnectToDB();
    const data = await db.getAllAsync("SELECT * FROM categories ORDER BY category_name");
    // console.log("data", data);
    successCallBack(data);
  } catch (error) {
    throw error;
  }
};

export const AddCategory = async (item) => {
  // console.log("cat", cat);
  try {
    const db = await ConnectToDB();
    const statement = await db.prepareAsync(
      "INSERT INTO categories (category_name) VALUES (?)"
    );
    await statement.executeAsync([item.categoryName]);
  } catch (error) {
    throw error;
  }
};

export const UpdateCategory = async (item) => {
  // console.log('update cat', cat)
  try {
    const db = await ConnectToDB();
    await db.runAsync("UPDATE categories SET category_name=? WHERE id=?", [
      item.categoryName,
      item.categoryId,
    ]);
  } catch (error) {
    throw error;
  }
};

export const DeleteCategory = async (id) => {
  // console.log('category', id)
  try {
    const db = await ConnectToDB();
    await db.runAsync("DELETE FROM categories WHERE id=?", id);
  } catch (error) {
    throw error;
  }
};
