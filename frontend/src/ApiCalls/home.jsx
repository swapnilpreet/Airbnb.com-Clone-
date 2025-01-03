import { axiosInstance } from "./axiosinstance";


// register user


export const GetAirbnbHomeById = async (id)=>{
  try{
     const response = await axiosInstance.get(`/api/add-home/get-place/${id}`);
     console.log("response Api", response.data.data);
     return response.data;
  }catch(error){
    return error.message;
  }
}

export const DeleteAirbnbHome = async (id)=>{
  try{
     const response = await axiosInstance.delete(`/api/add-home/delete/${id}`);
     return response.data;
  }catch(error){
    return error.message;
  }
}


export const AddAirbnbHome = async (payload)=>{
    try{
       const response = await axiosInstance.post('/api/add-home/add-home', payload);
       return response.data;
    }catch(error){
      return error.message;
    }
}

// /get-users-homes
export const EditAirbnbHome = async (payload)=>{
  try{
     const response = await axiosInstance.put('/api/add-home/edit-home', payload);
     return response.data;
  }catch(error){
    return error.message;
  }
}

export const GetUserHome = async ()=>{
  try{
    const response = await axiosInstance.get('/api/add-home/get-users-homes');
    return response.data;
  }catch(error){
    return error.message;
  }
}


export const GetAllHome = async (payload)=>{
  try{
    const response = await axiosInstance.post('/api/add-home/get-all-homes', payload);
    return response.data;
  }catch(error){
    return error.message;
  }
}


export const UpdateHomeStatus = async (id,status)=>{
  try {
     const response = await axiosInstance.put(`/api/add-home/update-homes-status/${id}`,{status})
     return response.data;
  } catch (error) {
     return error.message;
  }
}
// /get-homes-by-search/:key

// export const GetHomeBySearch = async (value)=>{
//   try {
//      const response = await axiosInstance.get(`/api/add-home/get-homes-by-search/${value}`)
//      return response.data;
//   } catch (error) {
//      return error.message;
//   }
// }



export const GetHomeBySearch = async (searchKey,category,region)=>{
  try {
     const response = await axiosInstance.get(`/api/add-home/get-homes-by-search/${searchKey}?Category=${category}&region=${region}`)
     return response.data;
  } catch (error) {
     return error.message;
  }
}