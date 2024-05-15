import axios from "axios";
export const getAllStudents= async (limit=0, page=0) => {
  const res = await axios.get(
    `http://localhost:3001/api/student/getAllStudent?page=${page}&limit=${limit}`
  );
  return res;
};
export const getDetailsStudent= async (id) => {
  const res = await axios.get(
    `http://localhost:3001/api/student/get-Studentdetail/${id}`
  );
  return res.data;
};
export const addStudent= async (data) => {
  const res = await axios.post(
    `http://localhost:3001/api/student/create-student`,
    data
  );
  return res.data;
};
export const updateStudent= async (id, data) => {
  const res = await axios.put(
    `http://localhost:3001/api/student/update-student/${id}`,
    data
  );
  return res.data;
};
export const deleteStudent= async (id) => {
  const res = await axios.delete(
    `http://localhost:3001/api/student/delete-student/${id}`
  );
  return res.data;
};
export const getFilterStudentByCode = async (limit = 0, page = 0,searchValue) => {
  const res = await axios.get(
    `http://localhost:3001/api/student/getFilterStudentByCode/${searchValue}?page=${page}&limit=${limit}`
  );
  return res;
};
