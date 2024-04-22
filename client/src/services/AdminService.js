import axios from "axios";
export const signInMember = async (data) => {
  const res = await axios.post(`http://localhost:3001/api/user/sign-in`, data);
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
