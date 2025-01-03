import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Text,
  Skeleton,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { differenceInDays } from "date-fns";
import { Addtobooking } from "../../ApiCalls/booking";
import DropIn from "braintree-web-drop-in-react";
import { getPaymentToken, makePayment } from "../../ApiCalls/payment";
import { useNavigate } from "react-router-dom";
import { BsPatchQuestionFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../Redux/LoadingSlice";

const FlothingSlide = ({ singlehome }) => {
  const toast = useToast();
  const { loading } = useSelector((state) => state.loaders);
  const [checkIn, setcheckIn] = useState();
  const [checkOut, setcheckOut] = useState();
  const [show, setshow] = useState(false);
  const [guests, setguests] = useState(1);
  const [clientToken, setclientToken] = useState("");
  const [instance, setinstance] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInDays(new Date(checkOut), new Date(checkIn));
  }

  const handleBooking = async () => {
    let payload = {
      checkIn,
      checkOut,
      guests,
      home: singlehome._id,
      price: numberOfNights * singlehome.price + 500,
    };
    try {
      const response = await Addtobooking(payload);
      if (response.success) {
        navigate("/trip");
      }
    } catch (error) {
      toast({
        title: "Error Occured in Add to booking",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handlepayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const response = await makePayment({
        nonce,
        price: singlehome?.price * numberOfNights + 500,
      });
      if (response.success) {
        handleBooking();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: "Error Occured in handle payment",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const getToken = async () => {
    try {
      const response = await getPaymentToken();
      if (response.success) {
        setclientToken(response.data.clientToken);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: "Error Occured in get Payment Token",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleshow = () => {
    setshow(true);
  };

  useEffect(() => {
    getToken();
    dispatch(SetLoader(false));
  }, []);

  return (
    <Box borderRadius={10} p={2} >
        <Skeleton isLoaded={!loading}>
        <Box shadow={"2xl"} w={"100%"} borderRadius={10} >
          <Box w={"80%"} m={"auto"} >
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Box  pt={5}>
                <Flex alignItems={'center'} gap={1}>
              <Text fontSize={"ms"} fontWeight={"bold"}>
              &#8377; {new Intl.NumberFormat("en-IN").format(singlehome?.price)}
            </Text>
                <Text fontSize={'xs'}>night</Text>
                </Flex>
              </Box>
              <Box pt={5}>
                  <Flex alignItems={'center'} gap={1}>
                    <AiFillStar/>
                    <Text fontSize={'xs'}>{singlehome?.rating}</Text>
                  </Flex>
              </Box>
            </Flex>
            
          </Box>

          <Box
            border={"1px solid gray"}
            w={"80%"}
            m={"auto"}
            borderRadius={10}
            mt={10}
          >
            <Flex borderBottom={"1px solid gray"}>
              <Box fontSize={"xs"} borderRight={"1px solid gray"} w={"50%"} p={2}>
                <Text>CHEKIN-IN</Text>
                <Input
                  type="date"
                  size={"sm"}
                  value={checkIn}
                  onChange={(e) => setcheckIn(e.target.value)}
                ></Input>
              </Box>

              <Box fontSize={"xs"} w={"50%"} p={2}>
                <Text>CHEKIN-OUT</Text>
                <Input
                  type="date"
                  size={"sm"}
                  value={checkOut}
                  onChange={(e) => setcheckOut(e.target.value)}
                ></Input>
              </Box>
            </Flex>

            <Box mt={2} p={2}>
              <Text fontSize={"xs"}>Guests</Text>
              <Input
                placeholder="Number of Guests"
                type="number"
                value={guests}
                onChange={(e) => setguests(e.target.value)}
              ></Input>
            </Box>
          </Box>

          <Box w={"80%"} m={"auto"}>
            <Box mt={4}>
              <Flex justifyContent={"space-between"} fontSize={"xs"} p={1}>
                <Flex alignItems={"center"} gap={2}>
                  <Text>
                    ₹{new Intl.NumberFormat("en-IN").format(singlehome?.price)} x{" "}
                    {numberOfNights} nights
                  </Text>
                  {numberOfNights >= 0 ? null : (
                    <>
                      <Tooltip
                        label="Nights Must not be Negative"
                        aria-label="A tooltip"
                      >
                        <Text>
                          <BsPatchQuestionFill color="red" size={22}/>
                        </Text>
                      </Tooltip>
                    </>
                  )}
                </Flex>

                <Text>
                  &#8377;{" "}
                  {numberOfNights <= 0
                    ? new Intl.NumberFormat("en-IN").format(singlehome?.price)
                    : new Intl.NumberFormat("en-IN").format(
                        singlehome?.price * numberOfNights
                      )}
                </Text>
              </Flex>
            </Box>

            <Divider colorScheme={"gray"} />
            <Box mt={5} pb={5}>
              <Flex justifyContent={"space-between"} p={1}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  Total after taxes included
                </Text>
                <Text>
                  &#8377;{" "}
                  {numberOfNights <= 0
                    ? new Intl.NumberFormat("en-IN").format(
                        singlehome?.price + 500
                      )
                    : new Intl.NumberFormat("en-IN").format(
                        singlehome?.price * numberOfNights + 500
                      )}
                </Text>
              </Flex>
            </Box>

            <Box textAlign={"center"} mt={5}>
              <Box mt={2}>
                {show && (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setinstance(instance)}
                    />
                    <Button
                      colorScheme="red"
                      variant="solid"
                      w={"full"}
                      letterSpacing={"2px"}
                      onClick={handlepayment}
                    >
                      Make Payment
                    </Button>
                  </>
                )}
              </Box>
              {!show && (
                <Button
                
                  colorScheme="red"
                  variant="solid"
                  w={"full"}
                  letterSpacing={"2px"}
                  onClick={handleshow}
                  isDisabled={numberOfNights > 0 ? false : true}
                >
                  Reserve
                </Button>
              )}
              <Text fontSize={"xs"} pb={4} pt={4}>
                you won't be changed yet
              </Text>
            </Box>
          </Box>
        </Box>
    </Skeleton>
      </Box>
  );
};

export default FlothingSlide;
