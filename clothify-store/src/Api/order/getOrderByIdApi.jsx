import axios from 'axios';

export const GetOrderByIdApi = async (orderId) => {
  try {
    const response = await axios.get(`/admin/get-orderById/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw error;
  }
};
