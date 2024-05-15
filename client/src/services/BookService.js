import axios from "axios";
export const getAllBooks = async (limit = 0, page = 0) => {
  const res = await axios.get(
    `http://localhost:3001/api/book/getAllBook?page=${page}&limit=${limit}`
  );
  return res;
};
export const getBookByCategory = async (limit = 0, page = 0,id) => {
  const res = await axios.get(
    `http://localhost:3001/api/book/getBookByCategory?page=${page}&limit=${limit}&cat=${id}`
  );
  return res;
};
export const getBookFilter = async (limit = 0, page = 0,searchValue) => {
  const res = await axios.get(
    `http://localhost:3001/api/book/getBookFilter/${searchValue}?page=${page}&limit=${limit}`
  );
  return res;
};
export const addBook = async (data) => {
  const res = await axios.post(
    `http://localhost:3001/api/book/create-book`,
    data
  );
  return res.data;
};
export const updateBook = async (id, data) => {
  const res = await axios.put(
    `http://localhost:3001/api/book/update-book/${id}`,
    data
  );
  return res.data;
};
export const deleteBook = async (id) => {
  const res = await axios.delete(
    `http://localhost:3001/api/book/delete-book/${id}`
  );
  return res.data;
};
export const getDetaislBook = async (id) => {
  const res = await axios.get(
    `http://localhost:3001/api/book/getDetailBook/${id}`
  );
  return res.data;
};
