import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { differenceInDays } from "date-fns";
import { Addtobooking } from "../../ApiCalls/booking";
import DropIn from "braintree-web-drop-in-react";
import { getPaymentToken, makePayment } from "../../ApiCalls/payment";
import { useNavigate } from "react-router-dom";
import { BsPatchQuestionFill } from "react-icons/bs";

const FlothingSlide = ({ singlehome }) => {
  const [checkIn, setcheckIn] = useState();
  const [checkOut, setcheckOut] = useState();
  const [show, setshow] = useState(false);
  //  const [showbtn, setshowbtn] = useState(false)
  //  const [numberOfNights, setnumberOfNights] = useState(1);
  const [guests, setguests] = useState(1);
  const [clientToken, setclientToken] = useState("");
  const [instance, setinstance] = useState("");
  const navigate = useNavigate();

  //numberOfNights

  let numberOfNights = 1;
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
      }
    } catch (error) {
      console.log(error.message);
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
        navigate("/trip");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getToken = async () => {
    try {
      const response = await getPaymentToken();
      if (response.success) {
        setclientToken(response.data.clientToken);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleshow = () => {
    setshow(true);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <Box borderRadius={10} p={2}>
      <Box shadow={"2xl"} w={"100%"} borderRadius={10}>
        <Box w={"80%"} m={"auto"}>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            &#8377; {new Intl.NumberFormat("en-IN").format(singlehome?.price)} /
            per night
          </Text>
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
                {numberOfNights >= 1 ? null : (
                  <>
                    <Tooltip
                      label="Nights Must not be Negative"
                      aria-label="A tooltip"
                    >
                      <Text>
                        <BsPatchQuestionFill color="red" size={22} />
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
    </Box>
  );
};

export default FlothingSlide;
