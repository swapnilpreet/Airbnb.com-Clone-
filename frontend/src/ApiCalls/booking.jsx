import { axiosInstance } from "./axiosinstance";


export const Addtobooking = async (payload)=>{
    try{
       const response = await axiosInstance.post('/api/booking/create/booking', payload);
       return response.data;
    }catch(error){
      return error.message;
    }
}


export const Getuserbooking = async ()=>{
    try{
       const response = await axiosInstance.get('/api/booking/get-users-bookings');
       return response.data;
    }catch(error){
       return error.message;
    }
}
// /cancel/booking/:id


export const Cancelbooking = async (id)=>{
   try{
      const response = await axiosInstance.delete(`/api/booking/cancel/booking/${id}`);
      return response.data;
   }catch(error){
      return error.message;
   }
}

