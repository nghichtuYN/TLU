import axios from "axios";
export const signInMember = async (data) => {
  const res = await axios.post(`http://localhost:3001/api/user/sign-in`, data);
  return res.data;
};
export const signUpMember = async (data) => {
  const res = await axios.post(`http://localhost:3001/api/user/sign-up`, data);
  return res.data;
};
export const deleteMember= async(id)=>{
  const res = await axios.delete(`http://localhost:3001/api/user/delete-user/${id}`);
  return res.data;

}
export const checkPassword = async (data) => {
  const res = await axios.post(`http://localhost:3001/api/user/checkPassword/`, data);
  return res.data;
};
export const getDetailsUser = async (id, access_token) => {
  const res = await axios.get(
    `http://localhost:3001/api/user/get-detail/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
export const updatelUser = async (id,data) => {
  const res = await axios.put(`http://localhost:3001/api/user/update-user/${id}`,data);
  return res.data;
};
export const getAllUser = async (limit,page) => {
  const res = await axios.get(`http://localhost:3001/api/user/getAllUser?page=${page}&limit=${limit}`);
  return res;
};
export const getMemberFilter = async (limit = 0, page = 0,searchValue) => {
  const res = await axios.get(
    `http://localhost:3001/api/user/getMemberFilter/${searchValue}?page=${page}&limit=${limit}`
  );
  return res;
};
