import axios from 'axios';

export const UpdateProductQuantityApi = async (updateData) => {
  try {
    const response = await axios.patch('/admin/update-order', updateData, {
      headers: {
        'Content-Type': 'application/json', 
      },
    });
    return response.data === true;

  } catch (error) {
    console.error("Failed add product", error);
    return false;
  }
};
