import axios from 'axios';

export const GetOrderCountApi = async () => {
  try {
    const response = await axios.get(`/admin/get-orderCount`);
    return response;
  } catch (error) {
    console.error("Error fetching orderCount:", error);
    throw error;
  }
};
