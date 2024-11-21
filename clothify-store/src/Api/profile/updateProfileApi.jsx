import axios from 'axios';

export const UpdateProfileApi = async (profileData) => {
  try {
    const response = await axios.put('/customer/updateUser', profileData, {
        headers: {
          'Content-Type': 'application/json', 
        },
    });
    return response.data === true;
  } catch (error) {
    console.error("Failed update profile", error);
    return false;
  }
};
