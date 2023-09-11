import { axiosInstance } from "./axiosinstance";


export const GetAllWislistProducts = async()=>{
    try {
    const response = await axiosInstance.get('/api/wishlist/get-wishlist');
        return response.data;
    } catch (error) {
        return error.message;
    }
}


export const AddtoWishlist = async(prodId)=>{
    try {
    const response = await axiosInstance.put('/api/wishlist/add-to-wishlist',prodId);
        return response.data;
    } catch (error) {
        return error.message;
    }
}