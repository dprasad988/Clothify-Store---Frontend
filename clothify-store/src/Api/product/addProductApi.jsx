import axios from 'axios';

export const AddProductApi = async (productData) => {
  try {
    const response = await axios.post('/admin/add', productData, {
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
