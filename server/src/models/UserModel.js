const { connect, sql } = require("../connectdb");
const getAllUser = (limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Running")
      const skip = page * limit;
      const pool = await connect();
      const sqlString = `SELECT * FROM [user] WHERE username is not null and isAdmin=0
      ORDER BY id OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY;`;
      const sqlStringALL =
        "SELECT * FROM [user] WHERE username is not null and isAdmin=0";
      const data = await pool.request().query(sqlString);
      const total = await pool.request().query(sqlStringALL);
      console.log(data)
      resolve({data:data.recordset,total:total.recordset});
    } catch (error) {
      reject(error);
    }
  });
};
const getMemberFilter = (limit, page, searchValue) => {
  return new Promise(async (resolve, reject) => {
    try {
      searchValue = searchValue.trim()
      const skip = page * limit;
      const pool = await connect();
      const sqlString = `SELECT * From [user]
       WHERE username is not null and fullName like N'%${searchValue}%' 
      ORDER BY id OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY;`;
      const sqlStringALL = `SELECT * From [user]
      WHERE username is not null and fullName like N'%${searchValue}%'
      ORDER BY id`;
      const data = await pool.request().query(sqlString);
      const total = await pool.request().query(sqlStringALL);
      resolve({ data: data.recordset, total: total.recordset });
    } catch (error) {
      reject(error);
    }
  });
};
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { fullName, email, userName, password, isAdmin } = newUser;
      const pool = await connect();
      const sqlString =
        "INSERT INTO [user] (fullName,email,username,password,isAdmin) VALUES (@fullName,@email,@username,@password,@isAdmin)";
      const data = await pool
        .request()
        .input("fullName", sql.NVarChar, fullName)
        .input("email", sql.NVarChar, email)
        .input("userName", sql.NVarChar, userName)
        .input("password", sql.NVarChar, password)
        .input("isAdmin", sql.Bit, isAdmin === "false" ? 0 : 1)
        .query(sqlString);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const updateUser = (id, updatedata) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { fullName, email, userName, password, isAdmin, mobileNumber } =
        updatedata;
      console.log(updatedata);
      const pool = await connect();
      const sqlString =
        "UPDATE [user] set fullName=@fullName,email=@email,userName=@userName,password=@password,isAdmin=@isAdmin,mobileNumber=@mobileNumber WHERE id=@id";
      const data = await pool
        .request()
        .input("fullName", sql.NVarChar, fullName)
        .input("email", sql.NVarChar, email)
        .input("userName", sql.NVarChar, userName)
        .input("password", sql.NVarChar, password)
        .input("mobileNumber", sql.NVarChar, mobileNumber)
        .input("isAdmin", sql.Bit, isAdmin)
        .input("id", sql.Int, id)
        .query(sqlString);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const getUserByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = "SELECT * FROM [user] WHERE id =@id ";
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

const findOne = (userName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = "SELECT * FROM [user] WHERE userName =@userName";
      const data = await pool
        .request()
        .input("userName", sql.NVarChar, userName)
        .query(sqlString);
      resolve(data.recordset[0]);
    } catch (error) {
      reject(error);
    }
  });
};
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = "DELETE FROM [user] WHERE id =@id";
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
  getAllUser,
  createUser,
  getUserByID,
  updateUser,
  deleteUser,
  findOne,
  getMemberFilter
};
