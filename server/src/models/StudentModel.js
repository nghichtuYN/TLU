const { connect, sql } = require("../connectdb");
const getAllStudent = (limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = page * limit;
      const pool = await connect();
      const sqlString = `SELECT * FROM [user] WHERE studentCode IS NOT NULL ORDER BY id OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY`;
      const sqlStringALL = `SELECT * FROM [user] WHERE studentCode IS NOT NULL ORDER BY id`;
      const data = await pool
        .request()
        .query(limit !== 0 ? sqlString : sqlStringALL);
      resolve(data.recordset);
    } catch (error) {
      reject(error);
    }
  });
};
const getFilterStudentByCode = (limit, page, searchValue) => {
  return new Promise(async (resolve, reject) => {
    try {
      searchValue = searchValue.trim();
      const skip = page * limit;
      const pool = await connect();
      const sqlString = `SELECT * FROM [user]
       WHERE studentCode like N'%${searchValue}%' AND studentCode IS NOT NULL
      ORDER BY id OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY;`;
      const sqlStringALL = `SELECT * FROM [user]
      WHERE studentCode like N'%${searchValue}%' AND studentCode IS NOT NULL `;
      const data = await pool.request().query(sqlString);
      const total = await pool.request().query(sqlStringALL);
      resolve({ data: data.recordset, total: total.recordset });
    } catch (error) {
      reject(error);
    }
  });
};
const totalStudent = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString =
        "SELECT COUNT(*) AS TotalCount FROM [user] WHERE studentCode IS NOT NULL";
      const totalBook = await pool.request().query(sqlString);
      resolve(totalBook.recordset[0].TotalCount);
    } catch (error) {
      reject(error);
    }
  });
};
const createStudent = (newStudent) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { studentCode, fullName, email, mobileNumber, status } = newStudent;
      const pool = await connect();
      const sqlString =
        "INSERT INTO [user] (studentCode,fullName,email,mobileNumber,status) VALUES (@studentCode,@fullName,@email,@mobileNumber,@status)";
      const data = await pool
        .request()
        .input("studentCode", sql.NVarChar, studentCode)
        .input("fullName", sql.NVarChar, fullName)
        .input("email", sql.NVarChar, email)
        .input("mobileNumber", sql.NVarChar, mobileNumber)
        .input("status", sql.Bit, status === "false" ? 0 : 1)
        .query(sqlString);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const updateStudent = (id, updatedata) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { studentCode, fullName, email, mobileNumber, status } = updatedata;
      const pool = await connect();
      const sqlString =
        "UPDATE [user] set fullName=@fullName,email=@email,studentCode=@studentCode,mobileNumber=@mobileNumber,status=@status WHERE id=@id";
      const data = await pool
        .request()
        .input("fullName", sql.NVarChar, fullName)
        .input("email", sql.NVarChar, email)
        .input("studentCode", sql.NVarChar, studentCode)
        .input("mobileNumber", sql.NVarChar, mobileNumber)
        .input("status", sql.Bit, status == "false" ? 0 : 1)
        .input("id", sql.Int, id)
        .query(sqlString);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
const getStudentByID = (id) => {
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

const findOne = (studentCode) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await connect();
      const sqlString = "SELECT * FROM [user] WHERE studentCode =@studentCode";
      const data = await pool
        .request()
        .input("studentCode", sql.NVarChar, studentCode)
        .query(sqlString);
      resolve(data.recordset[0]);
    } catch (error) {
      reject(error);
    }
  });
};
const deleteStudent = (id) => {
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
  getAllStudent,
  createStudent,
  getStudentByID,
  updateStudent,
  deleteStudent,
  findOne,
  totalStudent,
  getFilterStudentByCode,
};
