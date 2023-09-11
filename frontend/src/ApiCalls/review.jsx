import { axiosInstance } from "./axiosinstance";

export const AddReview = async (id,payload) => {
  try {
    const response = await axiosInstance.post(
      `/api/review/add-review/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetAllReview = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/review/get-all/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const EditReview = async (id,payload) =>{
  try {
    const response = await axiosInstance.put(`/api/review/edit/${id}`, payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetReviewById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/review/get-review-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};


export const DeleteReviewById = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/review/delete/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

