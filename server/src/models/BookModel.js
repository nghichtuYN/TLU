const { DateTime } = require("msnodesqlv8");
const { connect, sql } = require("../connectdb");
const moment = require("moment");
const path = require("path");
const fs = require("fs");
const getAllBook = (limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = page * limit;
      const pool = await connect();
      const sqlString = `SELECT b.id,bookName,b.quantity,b.isBorrowed ,c.id 'category_id',c.categoryName,a.id 'authorId',bookImage,a.authorName,ISBNNumber,bookPrice
      FROM book b inner join category c on b.category_id=c.id inner join author a on b.authorId=a.id
      ORDER BY b.id OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY;`;
      const sqlStringALL = `SELECT b.id,bookName,b.quantity,b.isBorrowed ,c.id 'category_id',c.categoryName,a.id 'authorId',bookImage,a.authorName,ISBNNumber,bookPrice
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
const getBookFilter = (limit, page, searchValue) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(searchValue);
      const skip = page * limit;
      const pool = await connect();
      const sqlString = `SELECT b.id,bookName,b.quantity,b.isBorrowed ,c.id 'category_id',c.categoryName,a.id 'authorId',bookImage,a.authorName,ISBNNumber,bookPrice
      FROM book b inner join category c on b.category_id=c.id inner join author a on b.authorId=a.id
       WHERE bookName like N'%${searchValue}%' or c.categoryName like N'%${searchValue}%' or a.authorName like N'%${searchValue}%'
      ORDER BY b.id OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY;`;
      const sqlStringALL = `SELECT b.id,bookName,b.quantity,b.isBorrowed ,c.id 'category_id',c.categoryName,a.id 'authorId',bookImage,a.authorName,ISBNNumber,bookPrice
      FROM book b inner join category c on b.category_id=c.id inner join author a on b.authorId=a.id
      WHERE bookName like N'%${searchValue}%' or c.categoryName like N'%${searchValue}%' or a.authorName like N'%${searchValue}%'
      ORDER BY b.id`;
      console.log(sqlString);
      const data = await pool.request().query(sqlString);
      const total = await pool.request().query(sqlStringALL);
      resolve({ data: data.recordset, total: total.recordset});
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
        bookPrice,
        quantity,
      } = newBook.body;
      const bookImage = newBook?.file?.filename;
      const pool = await connect();
      const sqlString = `INSERT INTO [book] (bookName,category_id,authorId,bookImage,ISBNNumber,bookPrice,quantity,isBorrowed) VALUES (@bookName,@category_id,@authorId,@bookImage,@ISBNNumber,@bookPrice,@quantity,@isBorrowed)`;
      const data = await pool
        .request()
        .input("bookName", sql.NVarChar, bookName)
        .input("ISBNNumber", sql.NVarChar, ISBNNumber)
        .input("category_id", sql.Int, category_id)
        .input("quantity", sql.Int, quantity)
        .input("authorId", sql.NVarChar, authorId)
        .input("isBorrowed", sql.Int, 0)
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
      const {
        bookName,
        category_id,
        authorId,
        ISBNNumber,
        bookPrice,
        isBorrowed,
        quantity,
      } = updatedata.body;
      const currentDate = new Date();
      const dateString = moment(currentDate).format("YYYY-MM-DD"); // Sử dụng moment.js để định dạng chuỗi

      const pool = await connect();
      const oldImageResult = await pool
        .request()
        .input("id", sql.Int, id)
        .query("SELECT bookImage FROM book WHERE id = @id");
      const bookImage = updatedata?.file
        ? updatedata?.file?.filename
        : oldImageResult.recordset[0].bookImage;
      if (updatedata?.file) {
        if (
          oldImageResult.recordset.length > 0 &&
          oldImageResult.recordset[0].bookImage
        ) {
          const oldImagePath = path.join(
            __dirname,
            "../public/uploads",
            oldImageResult.recordset[0].bookImage
          );
          fs.unlinkSync(oldImagePath);
        }
      }
      const sqlString = `UPDATE [book] SET bookName=@bookName,category_id=@category_id,authorId=@authorId,
      bookImage=@bookImage,ISBNNumber=@ISBNNumber,quantity=@quantity,bookPrice=@bookPrice,updated_at=@updated_at,isBorrowed=@isBorrowed 
      WHERE id=@id`;
      const data = await pool
        .request()
        .input("bookName", sql.NVarChar, bookName)
        .input("ISBNNumber", sql.NVarChar, ISBNNumber)
        .input("category_id", sql.Int, category_id)
        .input("authorId", sql.Int, authorId)
        .input("quantity", sql.Int, quantity)
        .input("bookImage", sql.NVarChar, bookImage)
        .input("bookPrice", sql.SmallInt, bookPrice)
        .input("id", sql.Int, id)
        .input("isBorrowed", sql.Int, isBorrowed)
        .input("updated_at", sql.DateTime, dateString)
        .query(sqlString);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const updateBookInOrder = (id, updatedata) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        bookName,
        category_id,
        authorId,
        ISBNNumber,
        bookPrice,
        isBorrowed,
        bookImage,
        quantity,
      } = updatedata;
      const currentDate = new Date();
      const dateString = moment(currentDate).format("YYYY-MM-DD"); // Sử dụng moment.js để định dạng chuỗi

      const pool = await connect();
      const sqlString = `UPDATE [book] SET bookName=@bookName,category_id=@category_id,authorId=@authorId,
      bookImage=@bookImage,ISBNNumber=@ISBNNumber,quantity=@quantity,bookPrice=@bookPrice,updated_at=@updated_at,isBorrowed=@isBorrowed 
      WHERE id=@id`;
      const data = await pool
        .request()
        .input("bookName", sql.NVarChar, bookName)
        .input("ISBNNumber", sql.NVarChar, ISBNNumber)
        .input("category_id", sql.Int, category_id)
        .input("authorId", sql.Int, authorId)
        .input("quantity", sql.Int, quantity)
        .input("bookImage", sql.NVarChar, bookImage)
        .input("bookPrice", sql.SmallInt, bookPrice)
        .input("id", sql.Int, id)
        .input("isBorrowed", sql.Int, isBorrowed)
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
      const sqlString = `select b.*,a.authorName,c.categoryName from author a inner join  book b  on b.authorId=a.id inner join category c on b.category_id = c.id
      where b.id=@id`;
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
      const oldImageResult = await pool
        .request()
        .input("id", sql.Int, id)
        .query("SELECT bookImage FROM book WHERE id = @id");
      if (
        oldImageResult.recordset.length > 0 &&
        oldImageResult.recordset[0].bookImage
      ) {
        const oldImagePath = path.join(
          __dirname,
          "../public/uploads",
          oldImageResult.recordset[0].bookImage
        );
        fs.unlinkSync(oldImagePath);
      }
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
  getBookFilter,
  updateBookInOrder,
};
