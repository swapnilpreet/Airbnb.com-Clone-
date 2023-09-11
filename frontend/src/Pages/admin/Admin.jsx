import {Box, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../ApiCalls/user'
import GetAllUsers from './GetAllUsers';
import AllHomes from './AllHomes';
import Layout from '../../Componets/Layout';
import PagesNavbar from '../../Componets/navbar/PagesNavbar';
import AdminHome from './AdminHome';




const Admin = () => {

  const [usersData,setusersData] = useState();


  useEffect(()=>{
      (async ()=> {
        try {
            const response = await getAllUsers();
            if(response.success){
              setusersData(response.data);
            }
        } catch (error) {
          console.error(error.message)
        }
      })()
  },[])




  return (
    <>
    <PagesNavbar/>
    <Box mt={24} p={1}>
      <Tabs isFitted variant='enclosed'>
        <TabList mb='1em'>
          <Tab>User</Tab>
          <Tab>All Homes</Tab>
          <Tab>Admin Homes</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <GetAllUsers usersData={usersData} setusersData={setusersData}/>
          </TabPanel>

          {/* second tab */}
          <TabPanel>
          <AllHomes/>
          </TabPanel>
          {/* third tab */}
          <TabPanel>
             <AdminHome/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
    </>
  )
}

export default Admin