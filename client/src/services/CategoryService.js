import axios from "axios";
export const getAllCategories = async (limit=0, page=0) => {
  const res = await axios.get(
    `http://localhost:3001/api/category/getAllCat?page=${page}&limit=${limit}`
  );
  return res;
};
export const updateCategory = async (id, data) => {
  const res = await axios.put(
    `http://localhost:3001/api/category/update-cat/${id}`,
    data
  );
  return res.data;
};
export const addCategory = async (data) => {
  const res = await axios.post(
    `http://localhost:3001/api/category/create-cat`,
    data
  );
  return res.data;
};
export const deleteCategory = async (id) => {
  const res = await axios.delete(
    `http://localhost:3001/api/category/delete-cat/${id}`
  );
  return res.data;
};
