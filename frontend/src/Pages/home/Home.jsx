import { Box, Flex, Image, SimpleGrid, Text, useToast } from "@chakra-ui/react";
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

const Home = () => {
  const { user } = useSelector((state) => state?.users);
  const { homes } = useSelector((state) => state?.homes);
  const { region } = useSelector((state) => state?.region);
  const dispatch = useDispatch();

  const handleWishlist = async (id) => {
    try {
      const response = await AddtoWishlist({ prodId: id });
      if (response.success) {
        getData();
        getuser();
      } else {
        throw new Error("Failed to add wihlist");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getData = async () => {
    try {
      const response = await GetAllHome({ region: region });
      if (response.success) {
          dispatch(SetHomes(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error.message);
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
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
    getuser();
  }, [region]);

  return (
    <>
      <HomeNavbar />
      <Box pt={20}>
      {/* setmyhome={setmyhome} */}
        <Filters />
        <Box m={[0, 2, 2, 10]} p={[20, 0, 0, 0]}>
          <SimpleGrid columns={[1, 2, 3, 5]} spacing={[0, 5, 3, 6]}>
            {homes
              .filter((home) => home.status !== "pending")
              .map((home, index) => (
                <Box borderRadius={"10px"} w={"280px"} key={index}>
                  <Link to={`/homes/${home._id}`}>
                    <Image
                      h={"200px"}
                      w={"280px"}
                      borderRadius={"10px"}
                      src={home.photos[0]}
                    ></Image>
                  </Link>
                  <Flex justifyContent={"space-between"} p={2}>
                    <Box>
                      <Box overflow={"hidden"} h={6}>
                        <Text>{home.address}</Text>
                      </Box>
                      <Text fontSize={"xs"}>{home.Category}</Text>
                      <Text fontSize={"xs"}>{home.region}</Text>
                      <Text>
                        &#8377;{" "}
                        {new Intl.NumberFormat("en-IN").format(home.price)}{" "}
                        night
                      </Text>
                    </Box>

                    <Box>
                      <Flex alignItems={"center"}>
                        <BiSolidStar />
                        <Text>4.9</Text>
                      </Flex>
                      <Box
                        onClick={() => handleWishlist(home._id)}
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
                </Box>
              ))}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};

export default Home;
