import axios from 'axios';

export const UpdatePaidApi = async (updateData) => {
  try {
    const response = await axios.patch('/admin/updatePaid-order', updateData, {
      headers: {
        'Content-Type': 'application/json', 
      },
    });
    return response.data === true;

  } catch (error) {
    console.error("Failed update order", error);
    return false;
  }
};
