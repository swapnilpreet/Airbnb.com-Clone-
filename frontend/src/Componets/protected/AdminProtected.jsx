import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Error from '../Error';
// import { useNavigate } from 'react-router-dom'
// import { GetCurrentUser } from '../../ApiCalls/user';


const AdminProtected = ({children}) => {
    // const navigate= useNavigate();
    const { user } = useSelector((state) => state?.users);

    // const validateToken=async()=>{
    //     try {
    //         const response = await GetCurrentUser();
    //         if(response.success){
    //              if(response.data.role!=='user'){
                    
    //              }else{
    //                 throw new Error(response.message);
    //              }
    //         }else{
    //             navigate('/error')
    //             throw new Error("Your are not authorize");
    //         }
    //     } catch (error) {
    //         navigate('/error')
    //         console.log(error.message);
    //     }
    // }

    // useEffect(() => {
    //     if(localStorage.getItem('token')){
    //         validateToken();
    //     }else{
    //         navigate('/error')
    //     }
    // },[])
    


  return (
    <>
    {user?.role === 'user' ? (
        <>
           <Error/>
        </>
    ):(<div>{children}</div>)}
    
    </>
  )
}

export default AdminProtected