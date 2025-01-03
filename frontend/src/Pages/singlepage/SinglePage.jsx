import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  Grid,
  GridItem,
  Hide,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Show,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Layout from "../../Componets/Layout";
import {  AiFillStar, AiOutlineHeart } from "react-icons/ai";
import {
  BiDish,
  BiShareAlt,
  BiSolidDownArrow,
  BiSolidDryer,
  BiSolidUpArrow,
  BiStar,
} from "react-icons/bi";
import { IoLocation, IoTvSharp } from "react-icons/io5";
import { BsDoorOpenFill, BsSnow2, BsWifi } from "react-icons/bs";
import {
  MdAir,
  MdCleanHands,
  MdFreeBreakfast,
  MdOutlineAlarmOff,
  MdOutlineCoffeeMaker,
  MdOutlinePets,
  MdOutlineSmokeFree,
  MdPets,
} from "react-icons/md";
import { LiaBedSolid, LiaTvSolid } from "react-icons/lia";
import {
  GiCarKey,
  GiCctvCamera,
  GiComb,
  GiFireplace,
  GiGuards,
  GiWashingMachine,
} from "react-icons/gi";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { TbBrandAirbnb } from "react-icons/tb";
import { RiAlarmWarningFill, RiHandSanitizerLine } from "react-icons/ri";
import "../../index.css";
import FlothingSlide from "./FlothingSlide";
import ImageSlider from "./ImageSlider";
import Footer from "../../Componets/Footer";
import PagesNavbar from "../../Componets/navbar/PagesNavbar";
import { useParams } from "react-router-dom";
import { GetAirbnbHomeById } from "../../ApiCalls/home";
import { useDispatch, useSelector } from "react-redux";
import redheart from "../../Accests/heart-red.png";
import Review from "./Review";
import { SetLoader } from "../../Redux/LoadingSlice";

const SinglePage = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.loaders);
  // const {singleHome} = useSelector((state) =>state.homes);
  const dispatch = useDispatch();
  const [singleHome, setsinglehome] = useState();
  const [show, setshow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const imageModel = useDisclosure();
  const toast = useToast();

  console.log("singleHome",singleHome)

  const gethomesbyId = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAirbnbHomeById(id);
      if(response.success){
        setsinglehome(response.data);
        setTimeout(() => {
          dispatch(SetLoader(false));
        }, 3000);
      }else{
        throw new Error(response.message);
      }
    } catch (error) {
      setTimeout(()=>{
        dispatch(SetLoader(false));
      }, 3000);
      toast({
        title: "Error Occured in Get Airbnb Home By Id",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
      gethomesbyId(id);
  }, []);

  return (
    <>
      <PagesNavbar />
      <Layout>
        <Box>
          <Skeleton fitContent isLoaded={!loading}>
            <Box fontSize={"2xl"} fontWeight={"bold"}>
              <Text>{singleHome?.title}</Text>
            </Box>
          </Skeleton>

          <Flex
            justifyContent={"space-between"}
            fontSize={"sm"}
            direction={{ base: "column", md: "row" }}
          >
            <Skeleton fitContent mt={1} isLoaded={!loading}>
              <Box>
                <Flex gap={5}>
                  <Flex alignItems={"center"} gap={1}>
                    <Box>
                      <AiFillStar />
                    </Box>
                    <Box>
                      <Text>New</Text>
                    </Box>
                  </Flex>

                  <Flex alignItems={"center"} gap={1}>
                    <Box>
                      <AiFillStar />
                    </Box>
                    <Box>
                      <Text>Superhost</Text>
                    </Box>
                  </Flex>

                  <Flex alignItems={"center"} gap={1}>
                    <Box>
                      <BiStar />
                    </Box>
                    <Box>
                      <Text>{singleHome?.rating}</Text>
                    </Box>
                  </Flex>

                  <Flex alignItems={"center"} gap={1}>
                    <IoLocation />
                    <Text decoration={"underline"}>{singleHome?.address}</Text>
                  </Flex>
                </Flex>
              </Box>
            </Skeleton>

            <Skeleton fitContent isLoaded={!loading}>
              <Box>
                <Flex gap={5}>
                  <Flex alignItems={"center"} gap={1}>
                    <Box>
                      <BiShareAlt />
                    </Box>
                    <Box>
                      <Text>share</Text>
                    </Box>
                  </Flex>

                  <Flex alignItems={"center"} gap={1}>
                    <Box>
                      {user?.wishlist.includes(singleHome?._id) ? (
                        <>
                          <Image boxSize={"20px"} src={redheart}></Image>
                        </>
                      ) : (
                        <AiOutlineHeart />
                      )}
                    </Box>
                    <Box>
                      <Text>Save</Text>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            </Skeleton>
          </Flex>

          <Show below="md">
            <ImageSlider singlehome={singleHome} />
          </Show>

          <Hide below="md">
              <Box mt={5} position={"relative"} onClick={imageModel.onOpen}>
                <Grid
                  templateRows="repeat(2, 1fr)"
                  templateColumns="repeat(4, 1fr)"
                  gap={1}
                >
                  <GridItem rowSpan={2} colSpan={2} cursor={"pointer"}>
                    <Skeleton isLoaded={!loading}>
                    <Image
                      boxSize="504px"
                      w="full"
                      objectFit={"cover"}
                      src={singleHome?.photos[0]}
                    ></Image>
                    </Skeleton>
                  </GridItem>
                  <GridItem
                    rowSpan={1}
                    colSpan={1}
                    h={"250px"}
                    cursor={"pointer"}
                  >
                    <Skeleton isLoaded={!loading}>
                    <Image
                      boxSize="250px"
                      w="full"
                      objectFit={"cover"}
                      src={singleHome?.photos[1]}
                    ></Image>
                    </Skeleton>
                  </GridItem>
                  <GridItem
                    rowSpan={1}
                    colSpan={1}
                    h={"250px"}
                    cursor={"pointer"}
                  >
                    <Skeleton isLoaded={!loading}>
                    <Image
                      boxSize="250px"
                      w="full"
                      objectFit={"cover"}
                      src={singleHome?.photos[2]}
                    ></Image>
                    </Skeleton>
                  </GridItem>
                  <GridItem
                    rowSpan={2}
                    colSpan={1}
                    h={"250px"}
                    cursor={"pointer"}
                  >
                    <Skeleton isLoaded={!loading}>
                    <Image
                      boxSize="250px"
                      w="full"
                      objectFit={"cover"}
                      src={singleHome?.photos[3]}
                    ></Image>
                    </Skeleton>
                  </GridItem>
                  <GridItem
                    rowSpan={2}
                    colSpan={1}
                    h={"250px"}
                    cursor={"pointer"}
                  >
                    <Skeleton isLoaded={!loading}>
                    <Image
                      boxSize="250px"
                      w="full"
                      objectFit={"cover"}
                      src={singleHome?.photos[4]}
                    ></Image>
                    </Skeleton>
                  </GridItem>
                </Grid>
                <Skeleton isLoaded={!loading}>
                <Button
                  position={"absolute"}
                  right={2}
                  bottom={2}
                  cursor={"pointer"}
                >
                  show all Photos
                </Button>
                </Skeleton>
              </Box>
            <Modal isOpen={imageModel.isOpen} onClose={imageModel.onClose}>
              <ModalOverlay />
              <ModalContent maxW={1200}>
                <ModalHeader>Image Gallery</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box>
                    <Image src={singleHome?.photos[0]} w={"full"} mb={2} />
                    <Image src={singleHome?.photos[1]} w={"full"} mb={2} />
                    <Image src={singleHome?.photos[2]} w={"full"} mb={2} />
                    <Image src={singleHome?.photos[3]} w={"full"} mb={2} />
                    <Image src={singleHome?.photos[4]} w={"full"} mb={2} />
                  </Box>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Hide>

          <Flex gap={10}>
            <Box w={["100%", "100%", "60%", "60%"]}>
              <Flex justifyContent={"space-between"} p={3}>
                <Skeleton fitContent isLoaded={!loading}>
                  <Box>
                    <Text fontSize={"xl"} fontWeight={"semibold"}>
                      Room in a nature hosted by {singleHome?.owner.name}
                    </Text>

                    <Text fontSize={"xs"}>
                      {singleHome?.maxGuests}+guests.{" "}
                      {singleHome?.maxGuests * 2} bedrooms .
                      {singleHome?.maxGuests * 3} beds
                    </Text>
                  </Box>
                </Skeleton>

                <SkeletonCircle size="20" fitContent isLoaded={!loading}>
                  <Box>
                    <Image
                      borderRadius="full"
                      boxSize="50px"
                      src="https://bit.ly/dan-abramov"
                      alt="Dan Abramov"
                    />
                  </Box>
                </SkeletonCircle>
              </Flex>
              <Divider colorScheme={"gray"} />

              <Box mt={5} p={2}>
                <Flex direction={"column"} gap={10}>

                  <Skeleton fitContent isLoaded={!loading}>
                    <Flex gap={5} alignItems={"center"}>
                      <Box>
                        <BsDoorOpenFill size={22} />
                      </Box>
                      <Box>
                        <Text fontWeight={"bold"} fontSize={"sm"}>
                          Self check-in
                        </Text>
                        <Text color={"gray"} fontSize={"xs"}>
                          You can check in with the building staff.
                        </Text>
                      </Box>
                    </Flex>
                  </Skeleton>

                  <Skeleton fitContent isLoaded={!loading}>
                    <Flex gap={5} alignItems={"center"}>
                      <Box>
                        <MdOutlinePets size={22} />
                      </Box>
                      <Box>
                        <Text fontWeight={"bold"} fontSize={"sm"}>
                          Self check-in
                        </Text>
                        <Text color={"gray"} fontSize={"xs"}>
                          You can check in with the building staff.
                        </Text>
                      </Box>
                    </Flex>
                  </Skeleton>

                </Flex>
              </Box>

              <Divider colorScheme={"gray"} />

              <Skeleton fitContent isLoaded={!loading}>
                <Box mt={5} p={2}>
                  <Collapse startingHeight={70} fontSize={'xs'} in={show}>
                    {singleHome?.description}
                  </Collapse>

                  <Flex
                    onClick={() => setshow(!show)}
                    alignItems={"center"}
                    mt={2}
                    gap={2}
                  >
                    <Button variant={"link"} fontSize={"sm"}>
                      show more
                    </Button>
                    {show === true ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
                  </Flex>
                  
                </Box>
              </Skeleton>

              <Divider colorScheme={"gray"} />

              <Box>
                <Skeleton mt={1} isLoaded={!loading}>
                  <Box p={2}>
                    <Text fontSize={"xl"}>Sleeping arrangemants</Text>
                    <Box mt={4}>
                      <Image
                        borderRadius={5}
                        boxSize={["300px", "300px", "300px", "250px"]}
                        w={["100%", "100%", "60%", "60%"]}
                        src={singleHome?.photos[4]}
                      ></Image>
                    </Box>
                  </Box>
                </Skeleton>

                <Box mt={10} p={2}>
                  <SimpleGrid columns={[2,2,3,3]} spacing={10}>

                    <Skeleton fitContent isLoaded={!loading}>
                      <Box
                        border={"1px solid gray"}
                        w={"44"}
                        h={32}
                        borderRadius={15}
                        align={"center"}
                      >
                        <Flex direction={"column"} mt={7} gap={2}>
                          <Box>
                            <LiaBedSolid />
                          </Box>
                          <Text fontWeight={"bold"}>Bedroom 1</Text>
                          <Text fontSize={"xs"}>1 single bed</Text>
                        </Flex>
                      </Box>
                    </Skeleton>

                    <Skeleton fitContent isLoaded={!loading}>
                      <Box
                        border={"1px solid gray"}
                        w={"44"}
                        h={32}
                        borderRadius={15}
                        align={"center"}
                      >
                        <Flex direction={"column"} mt={7} gap={2}>
                          <Box>
                            <LiaBedSolid />
                          </Box>
                          <Text fontWeight={"bold"}>Bedroom 2</Text>
                          <Text fontSize={"xs"}>2 single bed</Text>
                        </Flex>
                      </Box>
                    </Skeleton>

                    <Skeleton fitContent isLoaded={!loading}>
                      <Box
                        border={"1px solid gray"}
                        w={"44"}
                        h={32}
                        borderRadius={15}
                        align={"center"}
                      >
                        <Flex direction={"column"} mt={7} gap={2}>
                          <Box>
                            <LiaBedSolid />
                          </Box>
                          <Text fontWeight={"bold"}>Bedroom 3</Text>
                          <Text fontSize={"xs"}>3 single bed</Text>
                        </Flex>
                      </Box>
                    </Skeleton>

                  </SimpleGrid>
                  
                </Box>
              </Box>
              <Divider colorScheme={"gray"} />

              <Box mt={2}>
                <Skeleton fitContent isLoaded={!loading}>
                  <Text fontSize={"xl"}>Amenities</Text>
                </Skeleton>

                <SkeletonText
                  isLoaded={!loading}
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="15"
                >
                  <SimpleGrid columns={2} spacing={10} p={2}>
                    <Box height="40px">
                      <Flex gap={5}>
                        <BsWifi size={22} />
                        <Text>Wifi</Text>
                      </Flex>
                    </Box>
                    <Box height="40px">
                      <Flex gap={5}>
                        <GiFireplace size={22} />
                        <Text>Indoor fireplace</Text>
                      </Flex>
                    </Box>
                    <Box height="40px">
                      <Flex gap={5}>
                        <MdPets size={22} />
                        <Text>Pets allowed</Text>
                      </Flex>
                    </Box>
                    <Box height="40px">
                      <Flex gap={5}>
                        <MdFreeBreakfast size={22} />
                        <Text>Breakfast</Text>
                      </Flex>
                    </Box>
                    <Box height="40px">
                      <Flex gap={5}>
                        <GiCctvCamera size={22} />
                        <Text>Security cameras on property</Text>
                      </Flex>
                    </Box>
                    <Box height="40px">
                      <Flex gap={5}>
                        <CgSmartHomeRefrigerator size={22} />
                        <Text>Refrigerator</Text>
                      </Flex>
                    </Box>

                    <Box height="40px">
                      <Flex gap={5}>
                        <MdOutlineAlarmOff size={22} />
                        <Text decoration={"line-through"}>
                          Carbon monoxide alarm
                        </Text>
                      </Flex>
                    </Box>
                  </SimpleGrid>
                </SkeletonText>

                {/* models start */}

                <Skeleton fitContent isLoaded={!loading}>
                  <Box mt={5} mb={5} pl={2}>
                    <Button
                      onClick={onOpen}
                      border={"1px solid gray"}
                      variant={"outline"}
                    >
                      Show all 13 amenities
                    </Button>

                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent maxW="800px">
                        <ModalHeader>Amenities</ModalHeader>
                        <ModalCloseButton />

                        {/* {item.amenities((ame,index)=>( */}

                        <>
                          <ModalBody>
                            <Box>
                              <Box>
                                <Text textColor={"black"} fontWeight={"bold"}>
                                  Bedroom and laundry
                                </Text>
                                <Box height="40px">
                                  <Flex gap={5} alignItems={"center"}>
                                    <GiComb size={22} />
                                    <Flex direction={"column"}>
                                      <Text>Essentials</Text>
                                      <Text fontSize={"xs"}>
                                        Towels, Bed sheets, soap and toilet
                                        paper
                                      </Text>
                                    </Flex>
                                  </Flex>
                                </Box>
                                <Divider colorScheme={"gray"} mt={2} />
                              </Box>

                              <Box mt={8}>
                                <Text textColor={"black"} fontWeight={"bold"}>
                                  Heating and cooling
                                </Text>
                                <Flex direction={"column"}>
                                  {singleHome?.amenities.includes(
                                    "Indoor Fireplace"
                                  ) ? (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5} alignItems={"center"}>
                                          <GiFireplace size={22} />
                                          <Text>Indoor fireplace</Text>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  ) : null}
                                  {singleHome?.amenities.includes("heating") ? (
                                    <Box height="40px" mt={4}>
                                      <Flex gap={5} alignItems={"center"}>
                                        <FaTemperatureHigh size={22} />
                                        <Text>Heating</Text>
                                      </Flex>
                                    </Box>
                                  ) : null}
                                </Flex>
                                <Divider colorScheme={"gray"} mt={2} />
                              </Box>

                              <Box mt={8}>
                                <Text textColor={"black"} fontWeight={"bold"}>
                                  Home safety
                                </Text>
                                <Flex direction={"column"}>
                                  {singleHome?.amenities.includes("cameras") ? (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5} alignItems={"center"}>
                                          <GiCctvCamera size={22} />
                                          <Flex direction={"column"}>
                                            <Text>
                                              Security cameras on property
                                            </Text>
                                            <Text fontSize={"xs"}>
                                              whole premise is covered
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  ) : null}

                                  {singleHome?.amenities.includes(
                                    "Smoke alarm"
                                  ) ? (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5} alignItems={"center"}>
                                          <MdOutlineSmokeFree size={22} />
                                          <Flex direction={"column"}>
                                            <Text>Smoke alarm</Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  ) : null}

                                  {singleHome?.amenities.includes(
                                    "Carbon monoxide alarm"
                                  ) ? (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5} alignItems={"center"}>
                                          <RiAlarmWarningFill size={22} />
                                          <Flex direction={"column"}>
                                            <Text>Carbon monoxide alarm</Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  ) : null}

                                  {singleHome?.amenities.includes(
                                    "Self checkIn"
                                  ) ? (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5} alignItems={"center"}>
                                          <GiCarKey size={22} />
                                          <Flex direction={"column"}>
                                            <Text>Self checkIn</Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  ) : null}
                                </Flex>
                              </Box>

                              <Box mt={8}>
                                <Text textColor={"black"} fontWeight={"bold"}>
                                  Internet and office
                                </Text>
                                {singleHome?.amenities.includes("wifi") ? (
                                  <>
                                    <Box height="40px" mt={4}>
                                      <Flex gap={5}>
                                        <BsWifi size={22} />
                                        <Text>Wifi</Text>
                                      </Flex>
                                    </Box>
                                    <Divider colorScheme={"gray"} mt={2} />
                                  </>
                                ) : null}

                                {singleHome?.amenities.includes("Tv") ? (
                                  <>
                                    <Box height="40px" mt={4}>
                                      <Flex gap={5}>
                                        <IoTvSharp size={22} />
                                        <Text>Tv</Text>
                                      </Flex>
                                    </Box>
                                    <Divider colorScheme={"gray"} mt={2} />
                                  </>
                                ) : null}
                              </Box>

                              <Box mt={8}>
                                <Text textColor={"black"} fontWeight={"bold"}>
                                  Kitchen and dining
                                </Text>
                                <Flex direction={"column"}>
                                  {singleHome?.amenities.includes(
                                    "Refrigerator"
                                  ) ? (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <CgSmartHomeRefrigerator size={22} />
                                          <Text>Refrigerator</Text>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  ) : null}

                                  {singleHome?.amenities.includes("Kitchen") ? (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <FaKitchenSet size={22} />
                                          <Flex direction={"column"}>
                                            <Text>Kitchen</Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  ) : null}

                                  {singleHome?.amenities.includes("Dishes") ? (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <BiDish size={22} />
                                          <Flex direction={"column"}>
                                            <Text>Dishes and silverware</Text>
                                            <Text fontSize={"xs"}>
                                              Bowls, chopsticks, plates, cups,
                                              etc.
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  ) : null}

                                  {singleHome?.amenities.includes(
                                    "Coffee maker"
                                  ) ? (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <MdOutlineCoffeeMaker size={22} />
                                          <Flex direction={"column"}>
                                            <Text>Coffee maker</Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  ) : null}
                                </Flex>
                              </Box>

                              <Box mt={8}>
                                <Text textColor={"black"} fontWeight={"bold"}>
                                  Services
                                </Text>
                                <Flex direction={"column"}>
                                  {singleHome?.amenities.includes(
                                    "petsallowed"
                                  ) ? (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <MdPets size={22} />
                                          <Flex direction={"column"}>
                                            <Text>Pets allowed</Text>
                                            <Text fontSize={"xs"}>
                                              Assistance animals are always
                                              allowed
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                    </>
                                  ) : null}

                                  <Divider colorScheme={"gray"} mt={2} />

                                  {singleHome?.amenities.includes(
                                    "Breakfast"
                                  ) ? (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <MdFreeBreakfast size={22} />
                                          <Flex direction={"column"}>
                                            <Text>Breakfast</Text>
                                            <Text fontSize={"xs"}>
                                              Breakfast is provided
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  ) : null}

                                  {singleHome?.amenities.includes(
                                    "washing mashin"
                                  ) ? (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <GiWashingMachine size={22} />
                                          <Flex direction={"column"}>
                                            <Text>Washing Mashin</Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  ) : null}

                                  {singleHome?.amenities.includes(
                                    "Air Conditionary"
                                  ) ? (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <MdAir size={22} />
                                          <Flex direction={"column"}>
                                            <Text>Air Conditionary</Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  ) : null}

                                  {singleHome?.amenities.includes(
                                    "Hair dryer"
                                  ) ? (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <BiSolidDryer size={22} />
                                          <Flex direction={"column"}>
                                            <Text>Hair dryer</Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  ) : null}

                                  {singleHome?.amenities.includes("shampoo") ? (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <MdCleanHands size={22} />
                                          <Flex direction={"column"}>
                                            <Text>shampoo</Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  ) : null}

                                  {singleHome?.amenities.includes(
                                    "Building staff"
                                  ) ? (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <GiGuards size={22} />
                                          <Flex direction={"column"}>
                                            <Text>Building staff</Text>
                                            <Text fontSize={"xs"}>
                                              Someone is available 24 hours a
                                              day to let guests in
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  ) : null}
                                </Flex>
                              </Box>

                              <Box mt={8}>
                                <Text textColor={"black"} fontWeight={"bold"}>
                                  Not included
                                </Text>

                                <Flex direction={"column"}>
                                  {singleHome?.amenities.includes(
                                    "Kitchen"
                                  ) ? null : (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <FaKitchenSet size={22} />
                                          <Flex direction={"column"}>
                                            <Text decoration={"line-through"}>
                                              Kitchen
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  )}

                                  {singleHome?.amenities.includes(
                                    "Tv"
                                  ) ? null : (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <LiaTvSolid size={22} />
                                          <Flex direction={"column"}>
                                            <Text decoration={"line-through"}>
                                              Tv
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  )}

                                  {singleHome?.amenities.includes(
                                    "washing mashin"
                                  ) ? null : (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <GiWashingMachine size={22} />
                                          <Flex direction={"column"}>
                                            <Text decoration={"line-through"}>
                                              Washing machine
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  )}

                                  {singleHome?.amenities.includes(
                                    "Air Conditionary"
                                  ) ? null : (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <BsSnow2 size={22} />
                                          <Flex direction={"column"}>
                                            <Text decoration={"line-through"}>
                                              Air conditioning
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  )}

                                  {singleHome?.amenities.includes(
                                    "Hair dryer"
                                  ) ? null : (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <TbBrandAirbnb size={22} />
                                          <Flex direction={"column"}>
                                            <Text decoration={"line-through"}>
                                              Hair dryer
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  )}

                                  {singleHome?.amenities.includes(
                                    "Carbon monoxide alarm"
                                  ) ? null : (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <MdOutlineAlarmOff size={22} />
                                          <Flex direction={"column"}>
                                            <Text decoration={"line-through"}>
                                              Carbon monoxide alarm
                                            </Text>
                                            <Text fontSize={"xs"}>
                                              Host has indicated that no carbon
                                              monoxide detector is necessary.
                                              Contact the host with any
                                              questions.
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  )}

                                  {singleHome?.amenities.includes(
                                    "shampoo"
                                  ) ? null : (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <RiHandSanitizerLine size={22} />
                                          <Flex direction={"column"}>
                                            <Text decoration={"line-through"}>
                                              Shampoo
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  )}

                                  {singleHome?.amenities.includes(
                                    "Self checkIn"
                                  ) ? null : (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <GiCarKey size={22} />
                                          <Flex direction={"column"}>
                                            <Text decoration={"line-through"}>
                                              Self checkIn
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  )}

                                  {singleHome?.amenities.includes(
                                    "Building staff"
                                  ) ? null : (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <GiGuards size={22} />
                                          <Flex direction={"column"}>
                                            <Text decoration={"line-through"}>
                                              Building staff
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  )}

                                  {singleHome?.amenities.includes(
                                    "Coffee maker"
                                  ) ? null : (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <MdOutlineCoffeeMaker size={22} />
                                          <Flex direction={"column"}>
                                            <Text decoration={"line-through"}>
                                              Coffee maker
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  )}

                                  {singleHome?.amenities.includes(
                                    "Tv"
                                  ) ? null : (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <LiaTvSolid size={22} />
                                          <Flex direction={"column"}>
                                            <Text decoration={"line-through"}>
                                              Tv
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  )}

                                  {singleHome?.amenities.includes(
                                    "Dishes"
                                  ) ? null : (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <BiDish size={22} />
                                          <Flex direction={"column"}>
                                            <Text decoration={"line-through"}>
                                              Dishes
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  )}

                                  {singleHome?.amenities.includes(
                                    "essentials"
                                  ) ? null : (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <GiComb size={22} />
                                          <Flex direction={"column"}>
                                            <Text decoration={"line-through"}>
                                              Essentials
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  )}

                                  {singleHome?.amenities.includes(
                                    "heating"
                                  ) ? null : (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <FaTemperatureHigh size={22} />
                                          <Flex direction={"column"}>
                                            <Text decoration={"line-through"}>
                                              Heating
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  )}

                                  {singleHome?.amenities.includes(
                                    "Smoke alarm"
                                  ) ? null : (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <MdOutlineSmokeFree size={22} />
                                          <Flex direction={"column"}>
                                            <Text decoration={"line-through"}>
                                              Smoke alarm
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  )}

                                  {singleHome?.amenities.includes(
                                    "petsallowed"
                                  ) ? null : (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <MdPets size={22} />
                                          <Flex direction={"column"}>
                                            <Text decoration={"line-through"}>
                                              pets Allowed
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  )}

                                  {singleHome?.amenities.includes(
                                    "Indoor Fireplace"
                                  ) ? null : (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <GiFireplace size={22} />
                                          <Flex direction={"column"}>
                                            <Text decoration={"line-through"}>
                                              Indoor Fireplace
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  )}

                                  {singleHome?.amenities.includes(
                                    "wifi"
                                  ) ? null : (
                                    <>
                                      <Box height="40px" mt={4}>
                                        <Flex gap={5}>
                                          <BsWifi size={22} />
                                          <Flex direction={"column"}>
                                            <Text decoration={"line-through"}>
                                              Wifi
                                            </Text>
                                          </Flex>
                                        </Flex>
                                      </Box>
                                      <Divider colorScheme={"gray"} mt={2} />
                                    </>
                                  )}
                                </Flex>
                              </Box>
                            </Box>
                          </ModalBody>
                        </>
                      </ModalContent>
                    </Modal>
                  </Box>
                </Skeleton>
              </Box>
            </Box>
            {/* sticky box */}
            <Hide below="md">
              {/* <Skeleton fitContent isLoaded={!loading}> */}
                <Box w={"40%"}>
                  <Box position={"sticky"} top={20}>
                    <FlothingSlide singlehome={singleHome} />
                  </Box>
                </Box>
              {/* </Skeleton> */}
            </Hide>
            <Show below="md">
              <Box
                border={'1px solid grey'}
                zIndex={500}
                h={"80px"}
                position={"fixed"}
                bottom={0}
                w={"100%"}
                bg={"white"}
              >
                <Flex justifyContent={"space-between"}>
                  <Box p={3}>
                    <Text>&#8377;{singleHome?.price}</Text>
                    <Text decoration={"underline"}>nights</Text>
                  </Box>
                  <Box p={3}>
                    <Button colorScheme="red" variant="solid">
                      Reserve
                    </Button>
                  </Box>
                </Flex>
              </Box>
            </Show>
          </Flex>

          <Divider colorScheme={"gray"} />
          <Skeleton fitContent isLoaded={!loading}>
            <Review singleHome={singleHome} />
          </Skeleton>

          <Divider colorScheme={"gray"} />

          <Skeleton fitContent isLoaded={!loading}>
            <Box p={2}>
              <Text fontSize={"2xl"} fontWeight={"bold"} mt={5}>
                Things to know
              </Text>

              <Flex
                justifyContent={"space-between"}
                mt={3}
                ml={[88, "108px", 0, 0]}
                direction={{ base: "column", md: "row" }}
              >
                <Box w={["50%", "100%", "50%", "30%"]} mb={8}>
                  <Text fontWeight={"bold"}>House rules</Text>
                  <Text fontSize={"xs"} py={1}>
                    Check-in after 2:00 pm
                  </Text>
                  <Text fontSize={"xs"} py={1}>
                    Checkout before 12:00 pm
                  </Text>
                  <Text fontSize={"xs"} py={1}>
                    2 guests maximum
                  </Text>
                  <Text decoration={"underline"} fontWeight={"bold"}>
                    Show more
                  </Text>
                </Box>

                <Box w={["50%", "100%", "50%", "30%"]} mb={8}>
                  <Text fontWeight={"bold"}>Safety & property</Text>
                  <Text fontSize={"xs"} py={1}>
                    Carbon monoxide alarm not reported
                  </Text>
                  <Text fontSize={"xs"} py={1}>
                    Smoke alarm not reported
                  </Text>
                  <Text fontSize={"xs"} py={1}>
                    Not suitable for infants (under 2 years)
                  </Text>
                  <Text decoration={"underline"} fontWeight={"bold"}>
                    Show more
                  </Text>
                </Box>

                <Box w={["50%", "100%", "50%", "35%"]} mb={8}>
                  <Text fontWeight={"bold"}>Cancellation policy</Text>
                  <Text fontSize={"xs"} py={1}>
                    Cancel before 10 Aug for a partial refund.
                  </Text>
                  <Text fontSize={"xs"} py={2}>
                    Review the Host’s full cancellation policy which applies
                    even if you cancel for illness or disruptions caused by
                    COVID-19.
                  </Text>
                  <Text decoration={"underline"} fontWeight={"bold"}>
                    Show more
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Skeleton>

        </Box>
      </Layout>
      <Divider colorScheme={"gray"} />
      <Footer />
    </>
  );
};

export default SinglePage;
