import axios from 'axios';

export const AddProductApi = async (productData) => {
  const response = await axios.post('/admin/add', productData, {
    headers: {
      'Content-Type': 'application/json', 
    },
  });
  return response.data;
};
