import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetCurrentUser } from '../../ApiCalls/user';


const AdminProtected = ({children}) => {
    const navigate= useNavigate();
    const validateToken=async()=>{
        try {
            const response = await GetCurrentUser();
            if(response.success){
                 if(response.data.role!=='user'){
                     
                 }else{
                    throw new Error(response.message);
                 }
            }else{
            navigate('/error')
            throw new Error("Your are not authoriz");
            }
        } catch (error) {
            navigate('/error')
            console.log(error.message);
        }
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            validateToken();
        }else{
            navigate('/error')
        }
    }, [])
    


  return (
    <div>{children}</div>
  )
}

export default AdminProtected