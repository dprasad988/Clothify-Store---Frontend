import axios from 'axios';

export const GetProductCountApi = async () => {
  try {
    const response = await axios.get(`/admin/get-productCount`);
    return response;
  } catch (error) {
    console.error("Error fetching productCount:", error);
    throw error;
  }
};
