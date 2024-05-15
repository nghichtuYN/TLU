const { Date, DateTime } = require("msnodesqlv8");
const { connect, sql } = require("../connectdb");
const moment = require("moment");

const getAllCategory = (limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = page * limit;
      const pool = await connect();
      const sqlString = `SELECT *FROM [category] ORDER BY id OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY;`;
      const sqlStringALL = `SELECT *FROM [category]`;
      const data = await pool.request().query(limit !==0 ? sqlString : sqlStringALL);
      resolve(data.recordset);
    } catch (error) {
      reject(error);
    }
  });
};
const getFilterCategory = (limit, page,searchValue) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = page * limit;
      searchValue=searchValue.trim()
      const pool = await connect();
      const sqlString = `SELECT *FROM [category]
      WHERE categoryName like N'%${searchValue}%'
       ORDER BY id OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY;`;
      const sqlStringALL = `SELECT *FROM [category]
      WHERE categoryName like N'%${searchValue}%'`;
      const data = await pool.request().query( sqlString );
      const total=await pool.request().query(sqlStringALL)
      resolve({data: data.recordset,total:total.recordset});
    } catch (error) {
      reject(error);
    }
  });
};
const totalCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = "SELECT COUNT(*) AS TotalCount FROM [category]";
      const totalCategory = await pool.request().query(sqlString);
      resolve(totalCategory.recordset[0].TotalCount);
    } catch (error) {
      reject(error);
    }
  });
};
const createCategory = (newCategory) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { categoryName, status } = newCategory;
      const pool = await connect();
      const sqlString = `INSERT INTO [category] (categoryName,status) VALUES (@categoryName,@status)`;
      const data = await pool
        .request()
        .input("categoryName", sql.NVarChar, categoryName)
        .input("status", sql.Bit, status === "false" ? 0 : 1)
        .query(sqlString);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const updateCategory = (id, updatedata) => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentDate = new Date();
      const dateString = moment(currentDate).format("YYYY-MM-DD"); // Sử dụng moment.js để định dạng chuỗi
      const { categoryName, status } = updatedata;
      const pool = await connect();
      const sqlString = `UPDATE [category] SET categoryName=  @categoryName,updated_at = @updated_at,status=@status WHERE id=@id`;
      const data = await pool
        .request()
        .input('id',sql.Int,id)
        .input("categoryName", sql.NVarChar, categoryName)
        .input("updated_at", sql.DateTime, dateString)
        .input("status", sql.Bit, status === "false" ? 0 : 1)
        .query(sqlString);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const getCategoryByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = `SELECT * FROM [category] WHERE id =@id`;
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

const findOne = (categoryName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString =
        "SELECT * FROM [category] WHERE categoryName =@categoryName";
      const data = await pool
        .request()
        .input("categoryName", sql.NVarChar, categoryName)
        .query(sqlString);
      resolve(data.recordset[0]);
    } catch (error) {
      reject(error);
    }
  });
};
const deleteCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = "DELETE FROM [category] WHERE id =@id";
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
  getAllCategory,
  createCategory,
  getCategoryByID,
  updateCategory,
  deleteCategory,
  findOne,
  totalCategory,
  getFilterCategory
};
