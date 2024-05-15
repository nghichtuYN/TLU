import axios from "axios";
export const getAllAuthor = async (limit=0, page=0) => {
  const res = await axios.get(
    `http://localhost:3001/api/author/getAllAuthor?page=${page}&limit=${limit}`
  );
  return res;
};
export const addAuthor = async (data) => {
  const res = await axios.post(
    `http://localhost:3001/api/author/create-author`,
    data
  );
  return res.data;
};
export const getFilterAuthor = async (limit = 0, page = 0,searchValue) => {
  const res = await axios.get(
    `http://localhost:3001/api/author/getFilterAuthor/${searchValue}?page=${page}&limit=${limit}`
  );
  return res;
};
export const updateAuthor = async (id, data) => {
  const res = await axios.put(
    `http://localhost:3001/api/author/update-author/${id}`,
    data
  );
  return res.data;
};
export const deleteAuthor = async (id) => {
  const res = await axios.delete(
    `http://localhost:3001/api/author/delete-author/${id}`
  );
  return res.data;
};
