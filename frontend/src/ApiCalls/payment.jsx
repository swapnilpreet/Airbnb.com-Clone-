import { axiosInstance } from "./axiosinstance";


// register user


export const getPaymentToken = async ()=>{
  try{
     const response = await axiosInstance.get('/api/payment/braintree/token');
     return response.data;
  }catch(error){
    return error.message;
  }
}


export const makePayment = async (payload)=>{
    try{
       const response = await axiosInstance.post('/api/payment/braintree/payment', payload);
       return response.data;
    }catch(error){
      return error.message;
    }
}