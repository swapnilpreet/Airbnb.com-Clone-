import React from "react";
import PagesNavbar from "../../Componets/navbar/PagesNavbar";
import { Box, Text } from "@chakra-ui/react";
import Card from "./Card";
import Layout from "../../Componets/Layout";
const Wishlist = () => {
  return (
    <Box>
      <PagesNavbar />
      <Layout>
        <Text textAlign={'center'} fontSize={"4xl"}>Wishlists</Text>
        <Box>
          <Card />
        </Box>
      </Layout>
    </Box>
  );
};

export default Wishlist;
