const { Date, DateTime } = require("msnodesqlv8");
const { connect, sql } = require("../connectdb");
const moment = require("moment");

const getAllOrderItems = (limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = page * limit;
      const pool = await connect();
      const sqlString = `SELECT *FROM [OrderItems] ORDER BY id OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY;`;
      const sqlStringALL = `SELECT *FROM [OrderItems]`;
      const data = await pool.request().query(limit !==0 ? sqlString : sqlStringALL);
      resolve(data.recordset);
    } catch (error) {
      reject(error);
    }
  });
};
const totalOrderItems = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = "SELECT COUNT(*) AS TotalCount FROM [OrderItems]";
      const totalOrderItems = await pool.request().query(sqlString);
      resolve(totalOrderItems.recordset[0].TotalCount);
    } catch (error) {
      reject(error);
    }
  });
};
const createOrderItems = (bookId,orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = `INSERT INTO [orderItems] (bookId,orderId) VALUES (@bookId,@orderId)`;
      const data = await pool
        .request()
        .input("orderId", sql.Int, orderId)
        .input("bookId", sql.Int, bookId)
        .query(sqlString);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const updateOrderItems = (id, updatedata) => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentDate = new Date();
      const dateString = moment(currentDate).format("YYYY-MM-DD"); // Sử dụng moment.js để định dạng chuỗi
      const { OrderItemsName, status } = updatedata;
      const pool = await connect();
      const sqlString = `UPDATE [OrderItems] SET OrderItemsName=  @OrderItemsName,updated_at = @updated_at,status=@status WHERE id=@id`;
      const data = await pool
        .request()
        .input('id',sql.Int,id)
        .input("OrderItemsName", sql.NVarChar, OrderItemsName)
        .input("updated_at", sql.DateTime, dateString)
        .input("status", sql.Bit, status === "false" ? 0 : 1)
        .query(sqlString);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const getOrderItemsByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = `SELECT * FROM [OrderItems] WHERE id =@id`;
      const data = await pool
        .request()
        .input("id", sql.Int, id)
        .query(sqlString);
      resolve(data.recordset[0]);
    } catch (error) {
      reject(error);
    }
  });
};

const findOne = (OrderItemsName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString =
        "SELECT * FROM [orderItems] WHERE OrderItemsName =@OrderItemsName";
      const data = await pool
        .request()
        .input("OrderItemsName", sql.NVarChar, OrderItemsName)
        .query(sqlString);
      resolve(data.recordset[0]);
    } catch (error) {
      reject(error);
    }
  });
};
const deleteOrderItems = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = "DELETE FROM [orderItems] WHERE id =@id";
      const data = await pool
        .request()
        .input("id", sql.Int, id)
        .query(sqlString);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const deleteOrderItemsByBookId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('orderItems',id)
      const pool = await connect();
      const sqlString = "DELETE FROM [orderItems] OUTPUT DELETED.orderId WHERE bookId =@id";
      const data = await pool
        .request()
        .input("id", sql.Int, id)
        .query(sqlString);
      resolve(data.recordset);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getAllOrderItems,
  createOrderItems,
  getOrderItemsByID,
  updateOrderItems,
  deleteOrderItems,
  findOne,
  totalOrderItems,
  deleteOrderItemsByBookId
};
