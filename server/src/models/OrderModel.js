const { connect, sql } = require("../connectdb");
const moment = require("moment");
const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { userId,returnDate } = newOrder;
      const pool = await connect();
      const sqlString = `INSERT INTO [order] (userId,returnDate) OUTPUT INSERTED.id VALUES (@userId,@returnDate)`;
      const data = await pool
        .request()
        .input("userId", sql.Int, userId)
        .input("returnDate",sql.DateTime,returnDate)
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
const getFilterOrder = (limit, page, searchValue, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      searchValue = searchValue.trim();
      console.log(searchValue);
      console.log(status);
      status = status.trim();
      console.log(status);
      const skip = page * limit;
      const pool = await connect();
      const sqlStringByStatusAndSearchValue = (searchValue, status) => {
        const sqlString = `SELECT o.id,
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
  WHERE u.studentCode IS NOT NULL AND u.studentCode like N'%${searchValue}%' and returnStatus=${status}
  GROUP BY o.id,
  u.studentCode,
  u.id,
         u.fullName,
         o.borrowDate,
         o.returnDate,
         o.returnStatus
ORDER BY o.id
OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY`;
        return sqlString;
      };
      const sqlStringByStatusAndSearchValueAll = (searchValue, status) => {
        const sqlString = `SELECT o.id,
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
  WHERE u.studentCode IS NOT NULL AND u.studentCode like N'%${searchValue}%' AND o.returnStatus=${status}
  GROUP BY o.id,
  u.studentCode,
  u.id,
         u.fullName,
         o.borrowDate,
         o.returnDate,
         o.returnStatus
ORDER BY o.id`;
        return sqlString;
      };
      const sqlString = `SELECT o.id,
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
WHERE u.studentCode IS NOT NULL AND u.studentCode like N'%${searchValue}%'
GROUP BY o.id,
u.studentCode,
u.id,
         u.fullName,
         o.borrowDate,
         o.returnDate,
         o.returnStatus
ORDER BY o.id
OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY`;
      const sqlStringALL = `SELECT o.id,
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
WHERE u.studentCode IS NOT NULL AND u.studentCode like N'%${searchValue}%' 
GROUP BY o.id,
u.studentCode,
u.id,
         u.fullName,
         o.borrowDate,
         o.returnDate,
         o.returnStatus
ORDER BY o.id `;
      const sqlStringByStatus = (status) => {
        const sqlStringByStatus = `SELECT o.id,
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
  WHERE u.studentCode IS NOT NULL AND o.returnStatus=${status}
  GROUP BY o.id,
  u.studentCode,
  u.id,
     u.fullName,
     o.borrowDate,
     o.returnDate,
     o.returnStatus
  ORDER BY o.id
  OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY`;
        return sqlStringByStatus;
      };
      const sqlStringByStatusALL = (status) => {
        const sqlString = `SELECT o.id,
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
  WHERE u.studentCode IS NOT NULL AND o.returnStatus=${status}
  GROUP BY o.id,
  u.studentCode,
  u.id,
     u.fullName,
     o.borrowDate,
     o.returnDate,
     o.returnStatus
  ORDER BY o.id`;
        return sqlString;
      };
      if (searchValue === "all" && status !== "") {
        console.log("Running");
        status = status === "false" ? 0 : 1;
        const data = await pool.request().query(sqlStringByStatus(status));
        const total = await pool.request().query(sqlStringByStatusALL(status));
        resolve({ data: data.recordset, total: total.recordset });
      }
      if (searchValue !== "all" && status === "") {
        const data = await pool.request().query(sqlString);
        const total = await pool.request().query(sqlStringALL);
        resolve({ data: data.recordset, total: total.recordset });
      }
      if (searchValue !== "all" && status !== "") {
        status = status === "false" ? 0 : 1;
        const data = await pool
          .request()
          .query(sqlStringByStatusAndSearchValue(searchValue, status));
        const total = await pool
          .request()
          .query(sqlStringByStatusAndSearchValueAll(searchValue, status));
        resolve({ data: data.recordset, total: total.recordset });
      }
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
      const sqlString = `UPDATE [order] SET returnStatus= @returnStatus WHERE id=@id`;
      const data = await pool
        .request()
        .input("id", sql.Int, id)
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
  deleteOrderByOrderItems,
  getFilterOrder,
};
