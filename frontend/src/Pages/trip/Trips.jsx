import React, { useEffect, useState } from "react";
import PagesNavbar from "../../Componets/navbar/PagesNavbar";
import Layout from "../../Componets/Layout";
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
} from "@chakra-ui/react";
import moment from "moment";
import { Cancelbooking, Getuserbooking } from "../../ApiCalls/booking";
import { useNavigate } from "react-router-dom";
import { MdDoneAll } from "react-icons/md";

const Trips = () => {
  const [booking, setbooking] = useState([]);
  const Navigate = useNavigate();

  const getuserBooking = async () => {
    try {
      const response = await Getuserbooking();
      if (response.success) {
        setbooking(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      const response = await Cancelbooking(id);
      if (response.success) {
        getuserBooking();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getuserBooking();
  }, []);

  return (
    <>
      <PagesNavbar />
      <Layout>
        {booking?.length !== 0 ? (
          <>
            <Box>
              <Box>
                {booking.map((item, index) => (
                  <>
                    <Card
                      key={index}
                      direction={{ base: "column", sm: "row" }}
                      overflow="hidden"
                      variant="outline"
                    >
                      <Box
                        onClick={() => Navigate(`/homes/${item.home._id}`)}
                        cursor={"pointer"}
                        h={'250px'}
                      >
                        <Image
                          objectFit="cover"
                          h={"100%"}
                          w={['100%','350px','350px','350px']}
                          src={item.home.photos[0]}
                          alt="Caffe Latte"
                        />
                      </Box>
                      {/* </Link> */}

                      <Stack>
                        <CardBody>
                          <Heading size="md">{item.home.title}</Heading>
                          <Text>{item.home.address}</Text>
                          <Flex gap={10} fontSize={"xs"}>
                            <Text>{item.home.region}</Text>
                            <Text>{item.home.Category}</Text>
                          </Flex>
                          <Flex gap={20} fontSize={"xs"}>
                            <Box>
                              <Flex gap={2} alignItems={'center'}>
                                <Box>
                                <Text>
                                  Price:{" "}
                                  {new Intl.NumberFormat("en-IN").format(
                                    item.price
                                  )}
                                </Text>
                                </Box>
                                <Box>
                                <Tooltip
                                  label="Payment Successfull"
                                  aria-label="A tooltip"
                                >
                                 <Text>
                                     <MdDoneAll color="green" size={20}/>
                                  </Text>
                                </Tooltip>
                                </Box>
                              </Flex>
                            </Box>
                            <Text>Guests: {item.guests}</Text>
                          </Flex>
                          <Flex gap={10} fontSize={"xs"}>
                            <Text>
                              CheckIn:{" "}
                              {moment(item.checkIn).format("MMM Do YY")}
                            </Text>
                            <Text>
                              CheckOut:{" "}
                              {moment(item.checkOut).format("MMM Do YY")}
                            </Text>
                          </Flex>
                        </CardBody>

                        <CardFooter>
                          <Flex gap={10}>
                            <Button
                              variant="solid"
                              colorScheme="red"
                              onClick={() => handleCancelBooking(item._id)}
                            >
                              Cancel Trip
                            </Button>
                          </Flex>
                        </CardFooter>
                      </Stack>
                    </Card>
                  </>
                ))}
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box>
              <Text fontSize={"3xl"} fontWeight={"semibold"}>
                Trips
              </Text>
              <Divider mt={10} />
              <Text mt={5} fontSize={"xl"} fontWeight={"bold"}>
                No trips booked ... yet!
              </Text>
              <Text>
                Time to dust off your bags and start planning your next
                adventure
              </Text>
              <Button mt={8} variant={"outline"} onClick={()=>Navigate('/')}>
                Start searching
              </Button>
            </Box>
          </>
        )}
      </Layout>
    </>
  );
};

export default Trips;
