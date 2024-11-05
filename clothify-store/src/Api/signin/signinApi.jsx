import axios from "axios";

export const signinApi = async (values) => {
    try{
        const response = await axios.post('/customer/signin', values);
        return response.data
    } catch (erorr){
        throw erorr;
    }
}
