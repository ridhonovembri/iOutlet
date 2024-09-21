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
  console.log("order dal", orderNo);
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
  // console.log("prd dal", orders);
  try {
    const db = await ConnectToDB();

    let orderNumber = "";
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

    const orderDate = moment(new Date()).format("DD-MM-YYYY HH:mm:ss");

    let promise = new Promise((resolve, reject) => {
      orders.map(async (order, index) => {
        const productId = order.productId;
        const qty = order.qty;
        const orderDiscount = 0;
        const orderAmunt = order.qty * order.price;
        const customerId = null;
        const tableId = null;
        const areaId = null;
        const remarks = order.remarks;

        const statement =
          await db.prepareAsync(`INSERT INTO orders (order_no, order_date, product_id, qty, customer_id, table_id,
                                                     area_id, order_discount, order_amount, remarks) VALUES(?,?,?,?,?,?,?,?,?,?)`);
        const result = await statement.executeAsync([
          orderNumber,
          orderDate,
          productId,
          qty,
          customerId,
          tableId,
          areaId,
          orderDiscount,
          orderAmunt,
          remarks,
        ]);

        // console.log("result.changes", result.changes);

        if (result.changes > 0) {
          resolve({ orderNumber: orderNumber, status: true });
        } else {
          reject({ orderNumber: 0, status: false });
        }
      });
    });

    return promise;
  } catch (error) {
    throw error;
  }
};

export const DeleteOrderItem = async () => {};
