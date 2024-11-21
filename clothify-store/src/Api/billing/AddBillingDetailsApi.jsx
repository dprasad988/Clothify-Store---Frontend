import axios from 'axios';
import { message } from 'antd';

export const AddBillingDetailsApi = async (billingDetails) => {
  
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      message.error("No token found. Please log in.");
      return;
    } 

    const response = await axios.post('/admin/add-billingDetails', billingDetails, {
      headers: {
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;

  } catch (error) {
    console.error("Failed add billingDetails", error);
    return false;
  }
};
