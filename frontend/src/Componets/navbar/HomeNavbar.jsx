import React, { useCallback, useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Hide,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import mainlogo from "../../Accests/mainlogo.svg";
import { BiSearchAlt2 } from "react-icons/bi";
import { useTheme } from "@emotion/react";
import { TbWorldCancel } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { SetUser } from "../../Redux/userSlice";
import { SetRegion } from "../../Redux/RegionSlice";
import { GetAllHome, GetHomeBySearch } from "../../ApiCalls/home";
import { SetHomes } from "../../Redux/HomeSlice";

const HomeNavbar = () => {
  const model2 = useDisclosure();
  const searchmodel = useDisclosure();
  const [regionDisplay, setregionDisplay] = useState("");
  const { region } = useSelector((state) => state.region);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputElem = useRef(null);

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const getSearchData = async (value) => {
    try {
      if (value !== "") {
        const response = await GetHomeBySearch(value);
        if (response.success) {
          dispatch(SetHomes(response.data));
        } else {
          throw new Error("Product not fiilters");
        }
      } else {
        getData();
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

  const handleSearch = useCallback(
    debounce((inputVal) => getSearchData(inputVal), 500),
    []
  );

  const handleRegion = (value) => {
    setregionDisplay(value);
    dispatch(SetRegion(value));
  };

  const handleLogout = () => {
    dispatch(SetUser(null));
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const { user } = useSelector((state) => state?.users);

  return (
    <Box pos="fixed" w="100%" bg={"white"} top={0} zIndex={500}>
      <Flex justifyContent={"space-between"} pt={3} pl={8} pr={8}>
        <Box>
          <Image src={mainlogo} w={"28"}></Image>
        </Box>
        <Hide below="md">
          <Box>
            <Flex
              border={"1px solid grey"}
              gap={2}
              borderRadius={"full"}
              fontSize={"xs"}
              p={1}
            >
              <Text
                onClick={model2.onOpen}
                cursor={"pointer"}
                borderRight={"1px solid grey"}
                p={2}
                fontWeight={"bold"}
              >
                {regionDisplay !== "" ? regionDisplay : "Anywhere"}
              </Text>
              <Text borderRight={"1px solid grey"} p={2} fontWeight={"bold"}>
                Anyweek
              </Text>
              <Text borderRight={"1px solid grey"} p={2} fontWeight={"bold"}>
                Add guests
              </Text>
              <Box border={"1px solid red"} mr={1} p={1} borderRadius={"full"}>
                <BiSearchAlt2
                  size={23}
                  color={theme.colors.primary.main}
                  onClick={searchmodel.onOpen}
                  cursor={"pointer"}
                />

                <Modal
                  isOpen={searchmodel.isOpen}
                  onClose={searchmodel.onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Search by Address</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Box>
                        <Input
                          type="text"
                          placeholder="Search Home here..."
                          className="border border-gray-500 rounded-full border-solid w-72 p-2 h-14"
                          ref={inputElem}
                          onChange={() =>
                            handleSearch(inputElem.current?.value)
                          }
                        />
                      </Box>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        colorScheme="red"
                        mr={3}
                        onClick={searchmodel.onClose}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
            </Flex>
          </Box>
        </Hide>

        <Box>
          <Flex alignItems={"center"} gap={2}>
            <Hide below="md">
              <Button
                fontSize={"xs"}
                variant="outline"
                borderRadius={"full"}
                onClick={() => navigate("/airbnb-your-home")}
              >
                Airbnb your home
              </Button>
              <TbWorldCancel size={22} />
            </Hide>

            <Menu>
              <MenuButton
                transition="all 0.2s"
                borderRadius="full"
                borderWidth="1px"
              >
                <Flex gap={2} p={1} alignItems={"center"}>
                  <Box>
                    <Text>
                      <FaBars size={20} />
                    </Text>
                  </Box>
                  <Box bg={"black"} borderRadius={"full"}>
                    <Text pl={2} pr={2} color={"white"}>
                      {user?.name.charAt(0)}
                    </Text>
                  </Box>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem minH="48px">
                  <Flex alignItems={"center"}>
                    <Box>
                      <Image
                        boxSize="2rem"
                        borderRadius="full"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        alt="Fluffybuns the destroyer"
                        mr="12px"
                      />
                    </Box>
                    <Flex flexDirection={"column"}>
                      <Text>{user?.name}</Text>
                      <Text fontSize={"xs"}>{user?.email}</Text>
                    </Flex>
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem>Message</MenuItem>
                <Link to={"/trip"}>
                  <MenuItem>Trips</MenuItem>
                </Link>
                <Link to={"/wishlist"}>
                  <MenuItem>Wishlist</MenuItem>
                </Link>
                <MenuDivider />

                <Link to={"/airbnb-your-home"}>
                  <MenuItem>Airbnb your home</MenuItem>
                </Link>

                <MenuItem>Account</MenuItem>
                {user?.role !== "user" ? (
                  <Link to={"/admin"}>
                    <MenuItem>Admin</MenuItem>
                  </Link>
                ) : null}
                <MenuDivider />
                <MenuItem>Help</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      </Flex>
      <Divider p={2} />

      <Modal isOpen={model2.isOpen} onClose={model2.onOpen}>
        <ModalOverlay />
        <ModalContent maxW={700} h={"450px"}>
          <ModalHeader>Filter By Region</ModalHeader>
          <ModalBody>
            <Box>
              <SimpleGrid columns={3} gap={1} rowGap={6}>
                <Box onClick={model2.onClose} cursor={"pointer"}>
                  <Flex alignItems={"center"} direction={"column"}>
                    <Image
                      width={"100%"}
                      boxSize="150px"
                      border={"1px solid gray"}
                      borderRadius={15}
                      src="https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg"
                      alt="Dan Abramov"
                      onClick={() => handleRegion("")}
                    />
                    <Text fontSize={"xs"} fontWeight={"bold"}>
                      Im Fixiable
                    </Text>
                  </Flex>
                </Box>

                <Box onClick={model2.onClose} cursor={"pointer"}>
                  <Flex alignItems={"center"} direction={"column"}>
                    <Image
                      width={"100%"}
                      boxSize="150px"
                      border={"1px solid gray"}
                      borderRadius={15}
                      src="https://a0.muscache.com/im/pictures/dbb2b5ef-2efe-4099-81ac-c7b957f384ed.jpg?im_w=320"
                      alt="Dan Abramov"
                      onClick={() => handleRegion("United kingdom")}
                    />
                    <Text fontSize={"xs"} fontWeight={"bold"}>
                      United Kingdom
                    </Text>
                  </Flex>
                </Box>

                <Box onClick={model2.onClose} cursor={"pointer"}>
                  <Flex alignItems={"center"} direction={"column"}>
                    <Image
                      width={"100%"}
                      boxSize="150px"
                      border={"1px solid gray"}
                      borderRadius={15}
                      src="https://a0.muscache.com/im/pictures/7b5cf816-6c16-49f8-99e5-cbc4adfd97e2.jpg?im_w=320"
                      alt="Dan Abramov"
                      onClick={() => handleRegion("Europe")}
                    />
                    <Text fontSize={"xs"} fontWeight={"bold"}>
                      Europe
                    </Text>
                  </Flex>
                </Box>

                <Box onClick={model2.onClose} cursor={"pointer"}>
                  <Flex alignItems={"center"} direction={"column"}>
                    <Image
                      width={"100%"}
                      boxSize="150px"
                      border={"1px solid gray"}
                      borderRadius={15}
                      src="https://a0.muscache.com/im/pictures/ebc5a343-8b76-4ae5-8700-eb5e9cec9243.jpg?im_w=320"
                      alt="Dan Abramov"
                      onClick={() => handleRegion("Indonesia")}
                    />
                    <Text fontSize={"xs"} fontWeight={"bold"}>
                      Indonesia
                    </Text>
                  </Flex>
                </Box>

                <Box onClick={model2.onClose} cursor={"pointer"}>
                  <Flex alignItems={"center"} direction={"column"}>
                    <Image
                      width={"100%"}
                      boxSize="150px"
                      border={"1px solid gray"}
                      borderRadius={15}
                      src="https://a0.muscache.com/im/pictures/d77de9f5-5318-4571-88c7-e97d2355d20a.jpg?im_w=320"
                      alt="Dan Abramov"
                      onClick={() => handleRegion("Asia")}
                    />
                    <Text fontSize={"xs"} fontWeight={"bold"}>
                      Asia
                    </Text>
                  </Flex>
                </Box>

                <Box onClick={model2.onClose} cursor={"pointer"}>
                  <Flex alignItems={"center"} direction={"column"}>
                    <Image
                      width={"100%"}
                      boxSize="150px"
                      border={"1px solid gray"}
                      borderRadius={15}
                      src="https://a0.muscache.com/im/pictures/cd9f2bf0-eefc-4980-b7cb-9c8ca3dae883.jpg?im_w=320"
                      alt="Dan Abramov"
                      onClick={() => handleRegion("United states")}
                    />
                    <Text fontSize={"xs"} fontWeight={"bold"}>
                      United States
                    </Text>
                  </Flex>
                </Box>
              </SimpleGrid>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HomeNavbar;

// https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg

// united k
// https://a0.muscache.com/im/pictures/dbb2b5ef-2efe-4099-81ac-c7b957f384ed.jpg?im_w=320

// euorpe
// https://a0.muscache.com/im/pictures/7b5cf816-6c16-49f8-99e5-cbc4adfd97e2.jpg?im_w=320

// indonesia
// https://a0.muscache.com/im/pictures/ebc5a343-8b76-4ae5-8700-eb5e9cec9243.jpg?im_w=320

// asia
// https://a0.muscache.com/im/pictures/d77de9f5-5318-4571-88c7-e97d2355d20a.jpg?im_w=320

// united state
// https://a0.muscache.com/im/pictures/cd9f2bf0-eefc-4980-b7cb-9c8ca3dae883.jpg?im_w=320
