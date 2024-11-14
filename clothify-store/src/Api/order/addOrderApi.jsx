import axios from 'axios';

export const AddOrderApi = async (orderData) => {
  try {
    const response = await axios.post('/admin/add-order', orderData, {
      headers: {
        'Content-Type': 'application/json', 
      },
    });
    return response.data;

  } catch (error) {
    console.error("Failed add product", error);
    return false;
  }
};
