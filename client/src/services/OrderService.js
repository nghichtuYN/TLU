import axios from "axios";
export const getAllOrders= async (limit=0, page=0) => {
  const res = await axios.get(
    `http://localhost:3001/api/order/getAllOrder?page=${page}&limit=${limit}`
  );
  return res;
};
export const addOrder= async (data) => {
  const res = await axios.post(
    `http://localhost:3001/api/order/create-order`,
    data
  );
  return res.data;
};
export const updateOrder= async (id, data) => {
  const res = await axios.put(
    `http://localhost:3001/api/order/update-order/${id}`,
    data
  );
  return res.data;
};
export const deleteOrder= async (id) => {
  const res = await axios.delete(
    `http://localhost:3001/api/order/delete-order/${id}`
  );
  return res.data;
};