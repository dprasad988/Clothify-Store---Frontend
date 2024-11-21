import axios from 'axios';

export const GetUserCountApi = async () => {
  try {
    const response = await axios.get(`/customer/get-userCount`);
    return response;
  } catch (error) {
    console.error("Error fetching userCount:", error);
    throw error;
  }
};
