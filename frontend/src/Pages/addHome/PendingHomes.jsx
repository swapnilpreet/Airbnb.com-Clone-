import React, { useEffect } from "react";

import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { GetUserHome } from "../../ApiCalls/home";

const PendingHomes = ({ myhome, setmyhome }) => {
  const getData = async () => {
    try {
      const response = await GetUserHome();
      if (response.success) {
        setmyhome(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      {myhome.filter((offer) => offer.status === "pending").length !== 0 ? (
        <>
          {myhome
            .filter((offer) => offer.status === "pending")
            .map((offer, index) => (
              <Card
                key={index}
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                mb={2}
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={offer.photos[0]}
                  alt="Caffe Latte"
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">{offer.title}</Heading>
                    <Text>{offer.address}</Text>
                    <Flex gap={10} py={2}>
                      <Text>Region: {offer.region}</Text>
                      <Text>Category: {offer.Category}</Text>
                      <Text>status: {offer.status}</Text>
                    </Flex>
                  </CardBody>
                </Stack>
              </Card>
            ))}
        </>
      ) : (
        <>
          <Heading py={2}>Pending Homes</Heading>
          <Divider />
          <Text py={2}>No Pending Homes</Text>
          <Text fontSize={"xs"} py={2}>
            Admin Approved your All Homes or else you din't add any home yet!
          </Text>
          <Button variant={"outline"}>Start Searching</Button>
          <Divider mt={2} />
        </>
      )}
    </Box>
  );
};

export default PendingHomes;
