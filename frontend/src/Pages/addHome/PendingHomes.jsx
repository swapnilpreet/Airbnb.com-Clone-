import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";

import { DeleteAirbnbHome, GetUserHome } from "../../ApiCalls/home";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { SetUserHome } from "../../Redux/HomeSlice";

const PendingHomes = () => {
  const {userHomes} = useSelector(state =>state?.homes);
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const getData = async () => {
    try {
      const response = await GetUserHome();
      if (response.success) {
        dispatch(SetUserHome(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await DeleteAirbnbHome(id);
      if (response.success) {
        toast({
          title: "Deleted Successfully",
          description: response.message,
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: error.message,
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      {userHomes.filter((offer) => offer.status === "pending").length !== 0 ? (
        <>
          {userHomes
            .filter((offer) => offer.status === "pending")
            .map((offer, index) => (
              <Card
                key={index}
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
              >
                <Box
                  onClick={() => navigate(`/homes/${offer._id}`)}
                  cursor={"pointer"}
                >
                  <Image
                    objectFit="cover"
                    h={"100%"}
                    maxW={{ base: "100%", sm: "350px" }}
                    src={offer.photos[0]}
                    alt="Caffe Latte"
                  />
                </Box>
                <Stack>
                  <CardBody>
                    <Heading size="md">{offer.title}</Heading>
                    <Text>{offer.address}</Text>
                    <Flex gap={10} fontSize={"xs"}>
                      <Text>Region : {offer.region}</Text>
                      <Text>Category : {offer.Category}</Text>
                      <Text>status : {offer.status}</Text>
                    </Flex>
                    <Flex gap={20} fontSize={"xs"}>
                      <Box>
                        <Flex gap={2} alignItems={"center"}>
                          <Box>
                            <Text>
                              Price :{" "}
                              {new Intl.NumberFormat("en-IN").format(
                                offer.price
                              )}
                            </Text>
                          </Box>
                        </Flex>
                      </Box>
                      <Text>Guests : {offer.maxGuests}</Text>
                    </Flex>
                  </CardBody>

                  <CardFooter>
                    <Flex gap={10}>
                      <Button
                        variant="solid"
                        colorScheme="red"
                        onClick={() => handleDelete(offer._id)}
                      >
                        Delete Home
                      </Button>
                    </Flex>
                  </CardFooter>
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
          <Button variant={"outline"} onClick={() => navigate("/")}>
            Start Searching
          </Button>
          <Divider mt={2} />
        </>
      )}
    </Box>
  );
};

export default PendingHomes;
