const { connect, sql } = require("../connectdb");
const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = "SELECT * FROM [user]";
      const data = await pool.request().query(sqlString);
      resolve(data.recordset);
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
        .input("isAdmin", sql.Bit, isAdmin===undefined ? null : isAdmin)
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
      const { fullName, email, userName, password, isAdmin } = updatedata;
      const pool = await connect();
      const sqlString =
        "UPDATE [user] set fullName=@fullName,email=@email,userName=@userName,password=@password,isAdmin=@isAdmin WHERE id=@id";
      const data = await pool
        .request()
        .input("fullName", sql.NVarChar, fullName)
        .input("email", sql.NVarChar, email)
        .input("userName", sql.NVarChar, userName)
        .input("password", sql.NVarChar, password)
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
};
