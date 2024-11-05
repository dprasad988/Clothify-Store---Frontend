import axios from "axios";

export const signupApi = async (formData) => {
    try{
        const response = await axios.post('/customer/signup', formData);
        return response.data
    } catch (erorr){
        throw erorr;
    }
}
