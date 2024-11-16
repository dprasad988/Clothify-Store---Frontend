import axios from "axios";

export const GetProfileApi = async (token) => {
  try {
    const response = await axios.get("/customer/get-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (erorr) {
    throw erorr;
  }
};
