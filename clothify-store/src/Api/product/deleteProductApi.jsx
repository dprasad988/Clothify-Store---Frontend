import axios from 'axios';

export const DeleteProductApi = async (productId) => { 
  try {
    const response = await axios.delete(`/admin/delete-product/${productId}`, {
      headers: {
        'Content-Type': 'application/json', 
      },
    });
    return response.data === true;
  } catch (error) {
    console.error("Failed to delete product", error);
    return false;
  }
};
