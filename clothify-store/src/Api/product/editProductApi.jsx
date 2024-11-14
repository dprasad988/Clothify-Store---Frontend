import axios from 'axios';

export const EditProductApi = async (productData) => {
  try {
    const response = await axios.put('/admin/update-product', productData, {
        headers: {
          'Content-Type': 'application/json', 
        },
    });
    return response.data === true;
  } catch (error) {
    console.error("Failed update product", error);
    return false;
  }
};
