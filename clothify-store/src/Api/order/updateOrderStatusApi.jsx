import axios from 'axios';

export const updateOrderStatusApi = async (orderId, status) => {
  try {
    const response = await axios.patch(`/admin/order-status/${orderId}`, status, {
        headers: {
          'Content-Type': 'text/plain',
        },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
