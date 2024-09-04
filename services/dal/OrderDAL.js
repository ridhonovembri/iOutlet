import ConnectToDB from "./DB";
import moment from "moment";

export const GetAllOrders = async (successCallBack) => {
  try {
    const db = await ConnectToDB();
    const data = await db.getAllAsync(`
         SELECT o.id, o.order_no, o.order_date, p.id, p.product_name, a.id, a.area_name, c.id, c.customer_name, t.id, t.table_no, o.order_discount, o.order_amount, o.remarks
          FROM orders o
          LEFT JOIN products p ON o.product_id = p.id
          LEFT JOIN areas a ON o.area_id = a.id
          LEFT JOIN customers c ON o.customer_id = c.id
          LEFT JOIN tables t ON o.table_id = t.id
          `);
    // console.log('data in database', data)
    successCallBack(data);
  } catch (error) {
    throw error;
  }
};

export const GetByOrderNo = async (orderNo, successCallBack) => {
  // console.log("order dal", order);
  try {
    const db = await ConnectToDB();
    const data = await db.getAllAsync(`
               SELECT o.id, o.order_no, o.order_date, p.id, p.product_name, a.id, a.area_name, c.id, c.customer_name, t.id, t.table_no, o.order_discount, o.order_amount, o.remarks
                  FROM orders o
                  LEFT JOIN products p ON o.product_id = p.id
                  LEFT JOIN areas a ON o.area_id = a.id
                  LEFT JOIN customers c ON o.customer_id = c.id
                  LEFT JOIN tables t ON o.table_id = t.id
                  WHERE o.order_no = ${orderNo}
          `);
    console.log("data in database with orderNo", data);
    successCallBack(data);
  } catch (error) {}
};

export const AddOrder = async (orders) => {
  // console.log("prd dal", item);
  try {
    const db = await ConnectToDB();
    let status = false;

    let orderNumber = 0;
    let now = new Date();

    orderNumber = now.getFullYear().toString();
    orderNumber +=
      (now.getMonth() + 1 < 10 ? "0" : "") + (now.getMonth() + 1).toString();
    orderNumber += (now.getDate() < 10 ? "0" : "") + now.getDate().toString();
    orderNumber += (now.getHours() < 10 ? "0" : "") + now.getHours().toString();
    orderNumber +=
      (now.getMinutes() < 10 ? "0" : "") + now.getMinutes().toString();
    orderNumber +=
      (now.getSeconds() < 10 ? "0" : "") + now.getSeconds().toString();

    // const result = (orders) =>
    // new Promise((resolve, reject) => {

    const results = await Promise.all(
      orders.map(async (item, index) => {
        const orderNo = orderNumber;
        const orderDate = moment(new Date()).format("DD-MM-YYYY HH:mm:ss");
        const orderDiscount = 0;
        const orderAmunt = item.qty * item.price;

        const statement =
          await db.prepareAsync(`INSERT INTO orders (order_no, order_date, product_id, qty, customer_id, table_id,
                                                     area_id, order_discount, order_amount, remarks) VALUES(?,?,?,?,?,?,?,?,?,?)`);

        const result = await statement.executeAsync([
          orderNo,
          orderDate,
          item.productId,
          item.qty,
          null,
          null,
          null,
          orderDiscount,
          orderAmunt,
          item.remarks,
        ]);
      })
    );

    // console.log("dal-orderNumber", orderNumber);

    return orderNumber;
  } catch (error) {
    throw error;
  }
};

export const DeleteOrderItem = async () => {


};
