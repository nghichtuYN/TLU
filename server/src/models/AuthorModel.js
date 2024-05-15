const { Date, DateTime } = require("msnodesqlv8");
const { connect, sql } = require("../connectdb");
const moment = require("moment");

const getAllAuthor = (limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = page * limit;
      const pool = await connect();
      const sqlString = `SELECT *FROM [author] ORDER BY [id] OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY;`;
      const sqlStringALL = `SELECT *FROM [author]`;
      const data = await pool
        .request()
        .query(limit !== 0 ? sqlString : sqlStringALL);
      resolve(data.recordset);
    } catch (error) {
      reject(error);
    }
  });
};
const totalAuthor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = "SELECT COUNT(*) AS TotalCount FROM [author]";
      const totalAuthor = await pool.request().query(sqlString);
      resolve(totalAuthor.recordset[0].TotalCount);
    } catch (error) {
      reject(error);
    }
  });
};
const createAuthor = (newAuthor) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { authorName } = newAuthor;
      const pool = await connect();
      const sqlString =
        "INSERT INTO [author] (authorName) VALUES (@authorName)";
      const data = await pool
        .request()
        .input("authorName", sql.NVarChar, authorName)
        .query(sqlString);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const updateAuthor = (id, updatedata) => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentDate = new Date();
      const dateString = moment(currentDate).format("YYYY-MM-DD"); // Sử dụng moment.js để định dạng chuỗi
      const { authorName } = updatedata;
      const pool = await connect();
      const sqlString = `UPDATE [author] SET authorName=@authorName,updated_at = @updated_at WHERE id=@id`;
      const data = await pool
        .request()
        .input("authorName", sql.NVarChar, authorName)
        .input("updated_at", sql.DateTime, dateString)
        .input("id", sql.Int, id)
        .query(sqlString);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const getFilterAuthor = (limit, page, searchValue) => {
  return new Promise(async (resolve, reject) => {
    try {
      searchValue = searchValue.trim();
      const skip = page * limit;
      const pool = await connect();
      const sqlString = `SELECT * FROM author
       WHERE authorName like N'%${searchValue}%' 
      ORDER BY id OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY;`;
      const sqlStringALL = `SELECT * FROM author
      WHERE authorName like N'%${searchValue}%' `;
      const data = await pool.request().query(sqlString);
      const total = await pool.request().query(sqlStringALL);
      resolve({ data: data.recordset, total: total.recordset });
    } catch (error) {
      reject(error);
    }
  });
};
const getAuthorByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = "SELECT * FROM [author] WHERE id =@id";
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

const findOne = (authorName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = "SELECT * FROM [author] WHERE authorName =@authorName";
      const data = await pool
        .request()
        .input("authorName", sql.NVarChar, authorName)
        .query(sqlString);
      resolve(data.recordset[0]);
    } catch (error) {
      reject(error);
    }
  });
};
const deleteAuthor = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = "DELETE FROM [author] WHERE id =@id";
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
  getAllAuthor,
  createAuthor,
  getAuthorByID,
  updateAuthor,
  deleteAuthor,
  findOne,
  totalAuthor,
  getFilterAuthor,
};
