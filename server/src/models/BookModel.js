const { DateTime } = require("msnodesqlv8");
const { connect, sql } = require("../connectdb");
const moment = require("moment");

const getAllBook = (limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = page * limit;
      const pool = await connect();
      const sqlString = `SELECT b.id,bookName,c.id 'category_id',c.categoryName,a.id 'authorId',bookImage,a.authorName,ISBNNumber,bookPrice,isBorrowed
      FROM book b inner join category c on b.category_id=c.id inner join author a on b.authorId=a.id
      ORDER BY b.id OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY;`;
      const sqlStringALL = `SELECT b.id,bookName,c.id 'category_id',c.categoryName,a.id 'authorId',bookImage,a.authorName,ISBNNumber,bookPrice,isBorrowed
      FROM book b inner join category c on b.category_id=c.id inner join author a on b.authorId=a.id
      ORDER BY b.id`;
      const data = await pool
        .request()
        .query(limit !== 0 ? sqlString : sqlStringALL);
      resolve(data.recordset);
    } catch (error) {
      reject(error);
    }
  });
};
const totalBook = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = "SELECT COUNT(*) AS TotalCount FROM [book]";
      const totalBook = await pool.request().query(sqlString);
      resolve(totalBook.recordset[0].TotalCount);
    } catch (error) {
      reject(error);
    }
  });
};
const createBook = (newBook) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        bookName,
        category_id,
        authorId,
        ISBNNumber,
        bookImage,
        bookPrice,
      } = newBook;
      const pool = await connect();
      const sqlString = `INSERT INTO [book] (bookName,category_id,authorId,bookImage,ISBNNumber,bookPrice) VALUES (@bookName,@category_id,@authorId,@bookImage,@ISBNNumber,@bookPrice)`;
      const data = await pool
        .request()
        .input("bookName", sql.NVarChar, bookName)
        .input("ISBNNumber", sql.NVarChar, ISBNNumber)
        .input("category_id", sql.Int, category_id)
        .input("authorId", sql.NVarChar, authorId)
        .input("bookImage", sql.NVarChar, bookImage)
        .input("bookPrice", sql.SmallInt, bookPrice)
        .query(sqlString);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const updateBook = (id, updatedata) => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentDate = new Date();
      const dateString = moment(currentDate).format("YYYY-MM-DD"); // Sử dụng moment.js để định dạng chuỗi
      const {
        bookName,
        category_id,
        authorId,
        ISBNNumber,
        bookImage,
        bookPrice,
        isBorrowed,
      } = updatedata;
      console.log(updatedata);
      const pool = await connect();
      const sqlString = `UPDATE [book] SET bookName=@bookName,category_id=@category_id,authorId=@authorId,
      bookImage=@bookImage,ISBNNumber=@ISBNNumber,bookPrice=@bookPrice,updated_at=@updated_at,isBorrowed=@isBorrowed 
      WHERE id=@id`;
      const data = await pool
        .request()
        .input("bookName", sql.NVarChar, bookName)
        .input("ISBNNumber", sql.NVarChar, ISBNNumber)
        .input("category_id", sql.Int, category_id)
        .input("authorId", sql.Int, authorId)
        .input("bookImage", sql.NVarChar, bookImage)
        .input("bookPrice", sql.SmallInt, bookPrice)
        .input("id", sql.Int, id)
        .input(
          "isBorrowed",
          sql.Bit,
          isBorrowed === "false" ? 0 : isBorrowed === "true" ? 1 : 0
        )
        .input("updated_at", sql.DateTime, dateString)
        .query(sqlString);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const getBookByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = `SELECT * FROM [book] WHERE id =@id`;
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

const findOne = (bookName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = "SELECT * FROM [book] WHERE bookName =@bookName";
      const data = await pool
        .request()
        .input("bookName", sql.NVarChar, bookName)
        .query(sqlString);
      resolve(data.recordset[0]);
    } catch (error) {
      reject(error);
    }
  });
};
const deleteBook = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = "DELETE FROM [book] WHERE id =@id";
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
  getAllBook,
  createBook,
  getBookByID,
  updateBook,
  deleteBook,
  findOne,
  totalBook,
};
