import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../../Componets/Layout";
import PagesNavbar from "../../Componets/navbar/PagesNavbar";
import AddHome from "./AddHome";
import GetmyHomes from "./GetmyHomes";
import { GetUserHome } from "../../ApiCalls/home";
import PendingHomes from "./PendingHomes";
import { useDispatch } from "react-redux";
import { SetUserHome } from "../../Redux/HomeSlice";

const UserHomes = () => {
  const [showHomes, setshowHomes] = useState(true);
  const dispatch = useDispatch();


  const getHomesData = async () => {
    try {
      const response = await GetUserHome();
      if (response.success) {
        if (response.data.length > 0) {
          setshowHomes(false);
          dispatch(SetUserHome(response.data));
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getHomesData();
  }, []);

  
  return (
    <>
      <PagesNavbar />
      <Layout>
        <Tabs isFitted variant="enclosed" p={2}>
          <TabList mb="1em">
            <Tab>Add your Home</Tab>
            <Tab isDisabled={showHomes}>All my Homes</Tab>
            <Tab>pending Homes</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AddHome/>
            </TabPanel>
            <TabPanel>
              <GetmyHomes/>
            </TabPanel>
            <TabPanel>
              <PendingHomes/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    </>
  );
};

export default UserHomes;
