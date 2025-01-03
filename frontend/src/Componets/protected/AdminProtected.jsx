import React  from 'react'
import { useSelector } from 'react-redux';
import Error from '../Error';

const AdminProtected = ({children}) => {
    const { user } = useSelector((state) => state?.users);

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