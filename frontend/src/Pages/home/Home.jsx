import {
  Box,
  Flex,
  Image,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import HomeNavbar from "../../Componets/navbar/HomeNavbar";
import Filters from "./Filters";
import { BiSolidStar } from "react-icons/bi";
import { GetAllHome } from "../../ApiCalls/home";
import { Link, useNavigate } from "react-router-dom";
import { AddtoWishlist } from "../../ApiCalls/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import { GetCurrentUser } from "../../ApiCalls/user";
import { SetUser } from "../../Redux/userSlice";
import redheart from "../../Accests/heart-red.png";
import { SetHomes } from "../../Redux/HomeSlice";
import { SetLoader } from "../../Redux/LoadingSlice";

const Home = () => {
  const { user } = useSelector((state) => state?.users);
  const { homes } = useSelector((state) => state?.homes);
  const { region } = useSelector((state) => state?.region);
  const category= useSelector((state)=>state?.region.category);
  const { loading } = useSelector((state) => state.loaders);
  
  const toast = useToast();

  const dispatch = useDispatch();

  const handleWishlist = async (id) => {
    try {
      const response = await AddtoWishlist({ prodId: id });
      if (response.success) {
        getData1();
        getuser();
      } else {
        throw new Error("Failed to add wihlist");
      }
    } catch (error) {
      toast({
        title: "Error Occured in Update User Status",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const getData1 = async () => {
    try {
      const response = await GetAllHome({Category:category, region: region });
      if (response.success){
        dispatch(SetHomes(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: "Error Occured in get Data 1",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllHome({Category:category, region: region});
      if(response.success){
        dispatch(SetHomes(response.data));
        setTimeout(() => {
          dispatch(SetLoader(false));
        }, 3000);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setTimeout(() => {
        dispatch(SetLoader(false));
      }, 3000);
      toast({
        title: "Error Occured in get Data",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const getuser = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured in get User",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getData();
    getuser();
  }, [region,category]);

  return (
    <>
      <HomeNavbar />
      <Box pt={20}>
        <Filters />
        <Box m={[0, 2, 2, 5]} p={[20, 0, 0, 5]}>
          <SimpleGrid columns={[1, 2, 3, 5]} spacing={[0, 5, 3, 10]}>
            {homes?.filter((home) => home?.status !== "pending")?.map((home, index) => (
              <Box borderRadius={"10px"} w={"100%"} key={index}>
                  <Link to={`/homes/${home?._id}`}>
                  <Skeleton isLoaded={!loading}>
                      <Image
                        h={"200px"}
                        w={"100%"}
                        borderRadius={"10px"}
                        src={home?.photos[0]}
                      ></Image>
                   </Skeleton>
                  </Link>

                  <SkeletonText
                    isLoaded={!loading}
                    mt={2}
                    noOfLines={2}
                    spacing="2"
                    skeletonHeight="5"
                    
                  >
                    <Flex justifyContent={"space-between"} p={2}>
                      <Box>
                        <Box overflow={"hidden"} h={6}>
                          <Text>{home?.address}</Text>
                        </Box>
                        <Text fontSize={"xs"}>{home?.Category}</Text>
                        <Text fontSize={"xs"}>{home?.region}</Text>
                        <Flex alignItems={'center'} gap={1}>
                        <Text fontWeight={'bold'}>
                          &#8377;{" "}
                          {new Intl.NumberFormat("en-IN").format(home?.price)}{" "}
                        </Text>
                        <Text fontSize={'xs'}>night</Text>
                        </Flex>
                      </Box>

                      <Box>
                        <Flex alignItems={"center"} gap={1}>
                          <BiSolidStar size={18}/>
                          <Text fontSize={'xs'}>{home?.rating}</Text>
                        </Flex>
                        <Box
                          onClick={() => handleWishlist(home?._id)}
                          cursor={"pointer"}
                        >
                          {user?.wishlist.includes(home?._id) ? (
                            <>
                              <Image boxSize={"32px"} src={redheart}></Image>
                            </>
                          ) : (
                            <AiOutlineHeart size={32} />
                          )}
                        </Box>
                      </Box>
                    </Flex>
                  </SkeletonText>
                </Box>
              ))}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};

export default Home;
