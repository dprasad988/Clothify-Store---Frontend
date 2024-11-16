import { message } from 'antd';
import axios from 'axios';

export const AddOrderApi = async (orderPayload) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      message.error("No token found. Please log in.");
      return;
    }
    const response = await axios.post('/admin/add-order', orderPayload, {
      headers: {
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;

  } catch (error) {
    console.error("Failed add product", error);
    return false;
  }
};
