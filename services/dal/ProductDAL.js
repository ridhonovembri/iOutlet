import ConnectToDB from "./DB";

export const GetAllProducts = async (successCallBack) => {
  try {
    const db = await ConnectToDB();
    const data = await db.getAllAsync(`
        SELECT p.id, p.product_name, p.product_price, p.product_desc, p.category_id, c.category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        `);
    // console.log('data in database', data)
    successCallBack(data);
  } catch (error) {
    throw error;
  }
};

export const Addproduct = async (item) => {
  // console.log("prd dal", item);
  try {
    const db = await ConnectToDB();
    const statement = await db.prepareAsync(
      `INSERT INTO products (product_name, product_price, product_desc, category_id)
        VALUES (?,?,?,?)`
    );
    await statement.executeAsync([item.productName, item.productPrice, item.productDesc, item.categoryId]);
  } catch (error) {
    throw error;
  }
};

export const UpdateProduct = async (prd) => {
  // console.log("prd update", prd);
  try {
    const db = await ConnectToDB();
    await db.runAsync(
      "UPDATE products SET product_name=?, product_price=?, product_desc=?, category_id=? WHERE id=?",
      [prd.productName, prd.productPrice, prd.productDesc, prd.categoryId, prd.productId]
    );
  } catch (error) {
    throw error;
  }
};

export const DeleteProduct = async (id) => {
  try {
    const db = await ConnectToDB();
    await db.runAsync("DELETE FROM products WHERE id=?", id);
  } catch (error) {
    throw error;
  }
};
