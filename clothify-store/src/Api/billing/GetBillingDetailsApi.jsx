import axios from 'axios';
import { message } from 'antd';

export const GetBillingDetailsApi = async () => {
  
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      message.error("No token found. Please log in.");
      return;
    } 

    const response = await axios.get('/admin/get-billingDetails', {
      headers: {
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${token}`,
      },
    });
    return response;

  } catch (error) {
    console.error("Failed get billingDetails", error);
    return false;
  }
};
