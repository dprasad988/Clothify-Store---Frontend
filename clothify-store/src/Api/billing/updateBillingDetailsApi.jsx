import axios from 'axios';

export const UpdateBillingDetailsApi = async (data, billingId) => {
  try {
    const response = await axios.put(`/admin/update-billingDetails/${billingId}`, data, {
      headers: {
        'Content-Type': 'application/json', 
      },
    });
    return response.data === true;

  } catch (error) {
    console.error("Failed update billingDetails", error);
    return false;
  }
};
