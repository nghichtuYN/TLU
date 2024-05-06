const { connect, sql } = require("../connectdb");
const moment = require("moment");
const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { userId } = newOrder;
      const pool = await connect();
      const sqlString = `INSERT INTO [order] (userId) OUTPUT INSERTED.id VALUES (@userId)`;
      const data = await pool
        .request()
        .input("userId", sql.Int, userId)
        .query(sqlString);
      resolve(data.recordset[0].id);
    } catch (error) {
      reject(error);
    }
  });
};
const getAllOrder = (limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = page * limit;
      const pool = await connect();
      const sqlString = `
      SELECT o.id,
      u.studentCode,
      u.id AS UserId,
      u.fullName,STUFF(
               (SELECT ', ' + b.bookName
                FROM book b
                INNER JOIN orderItems oi ON b.id = oi.bookId
                WHERE oi.orderId = o.id
                  FOR XML PATH('')), 1, 2, '') AS BookNames,
                  STUFF(
               (SELECT ', ' + b.ISBNNumber
                FROM book b
                INNER JOIN orderItems oi ON b.id = oi.bookId
                WHERE oi.orderId = o.id
                  FOR XML PATH('')), 1, 2, '') AS ISBNNumbers,
                  STUFF(
                    (
                        SELECT ', ' + CONVERT(VARCHAR(10), b.id) 
                        FROM book b
                        INNER JOIN orderItems oi ON b.id = oi.bookId
                        WHERE oi.orderId = o.id
                        FOR XML PATH('')), 1, 2, '') AS BookIDs,
       o.borrowDate,
       o.returnDate,
       o.returnStatus
FROM [user] u
INNER JOIN [order] o ON u.id = o.userId
WHERE u.studentCode IS NOT NULL
GROUP BY o.id,
u.studentCode,
u.id,
         u.fullName,
         o.borrowDate,
         o.returnDate,
         o.returnStatus
ORDER BY o.id
OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY
      `;
      const data = await pool.request().query(sqlString);
      resolve(data.recordset);
    } catch (error) {
      reject(error);
    }
  });
};
const totalOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = "SELECT COUNT(*) AS TotalCount FROM [order]";
      const totalOrder = await pool.request().query(sqlString);
      resolve(totalOrder.recordset[0].TotalCount);
    } catch (error) {
      reject(error);
    }
  });
};
const updateOrder = (id, updatedata) => {
  return new Promise(async (resolve, reject) => {
    const { returnStatus, orderItems } = updatedata;
    try {
      const currentDate = new Date();
      const dateString = moment(currentDate).format("YYYY-MM-DD"); // Sử dụng moment.js để định dạng chuỗi
      console.log("orderItems", orderItems);
      const pool = await connect();
      for (const orderItem of orderItems) {
        const sqlString = `UPDATE [book] SET isBorrowed = @isBorrowed WHERE id = @id`;
        await pool
          .request()
          .input(
            "isBorrowed",
            sql.Int,
            (orderItem.isBorrowed = orderItem.isBorrowed - 1)
          )
          .input("id", sql.Int, orderItem.id)
          .query(sqlString);
      }
      const sqlString = `UPDATE [order] SET returnStatus= @returnStatus,returnDate = @returnDate WHERE id=@id`;
      const data = await pool
        .request()
        .input("id", sql.Int, id)
        .input(
          "returnDate",
          sql.DateTime,
          returnStatus === "false" ? null : dateString
        )
        .input("returnStatus", sql.Bit, returnStatus === "false" ? 0 : 1)
        .query(sqlString);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const getOrderByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = `SELECT * FROM [order] WHERE id =@id`;
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
const deleteOrderByOrderItems = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = "DELETE FROM [order] WHERE id =@id";
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
module.exports = {
  createOrder,
  getAllOrder,
  totalOrder,
  updateOrder,
  getOrderByID,
  deleteOrderByOrderItems
};
