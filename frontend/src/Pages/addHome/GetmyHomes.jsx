import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  DeleteAirbnbHome,
  EditAirbnbHome,
  GetAirbnbHomeById,
  GetUserHome,
} from "../../ApiCalls/home";
import { BiSolidHomeHeart } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import PhotosUploader from "../../Componets/PhotosUploader";
import Amenties from "../../Componets/Amenties";
import { useDispatch, useSelector } from "react-redux";
import { SetUserHome } from "../../Redux/HomeSlice";

const countries = [
  { value: "Camping", text: "Camping" },
  { value: "Rooms", text: "Rooms" },
  { value: "Cabins", text: "Cabins" },
  { value: "Amazing pools", text: "Amazing pools" },
  { value: "Bed&Farms", text: "Farms" },
  { value: "Amazing Views", text: "Amazing Views" },
  { value: "Lakefront", text: "Lakefront" },
  { value: "OMG!", text: "OMG !" },
  { value: "Beachfront", text: "Beachfront" },
  { value: "Tiny homes", text: "Tiny homes" },
  { value: "Historical homes", text: "Historical homes" },
  { value: "Trending", text: "Trending" },
  { value: "Tropical", text: "Tropical" },
  { value: "National parks", text: "National parks" },
  { value: "Caves", text: "Caves" },
  { value: "Islands", text: "Islands" },
  { value: "Castles", text: "Castles" },
  { value: "Design", text: "Design" },
  { value: "Play", text: "Play" },
  { value: "Windmills", text: "Windmills" },
  { value: "Golfing", text: "Golfing" },
];

const options = countries.map((option) => {
  return <option value={option.value}>{option.text}</option>;
});

const ratings = [
  { value: "1.0", text: "1.0" },
  { value: "2.0", text: "2.0" },
  { value: "3.0", text: "3.0" },
  { value: "4.0", text: "4.0" },
  { value: "4.1", text: "4.1" },
  { value: "4.2", text: "4.2" },
  { value: "4.3", text: "4.3" },
  { value: "4.4", text: "4.4" },
  { value: "4.5", text: "4.5" },
  { value: "4.6", text: "4.6" },
  { value: "4.7", text: "4.7" },
  { value: "4.8", text: "4.8" },
  { value: "4.9", text: "4.9" },
  { value: "5.0", text: "5.0" },
];

const ratingoptions = ratings.map((option) => {
  return <option value={option.value}>{option.text}</option>;
});

const region = [
  { value: "Asia", text: "Asia" },
  { value: "United states", text: "United states" },
  { value: "Indonesia", text: "Indonesia" },
  { value: "Europe", text: "Europe" },
  { value: "United kingdom", text: "United kingdom" },
];

const regionoptions = region.map((option) => {
  return <option value={option.value}>{option.text}</option>;
});

const GetmyHomes = () => {
  const {userHomes} = useSelector(state =>state?.homes);
  const dispatch=useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [Category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [amenities, setamenities] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [region, setregion] = useState("");
  const [rating, setrating] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [ids, setids] = useState("");
  const [price, setPrice] = useState(0);


  const getHomesData = async () => {
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

  const handleEditHome = async (id) => {
    try {
      setids(id);
      const response = await GetAirbnbHomeById(id);
      if (response.success) {
        setCategory(response.data.Category);
        setTitle(response.data.title);
        setAddress(response.data.address);
        setAddedPhotos(response.data.photos);
        setDesc(response.data.description);
        setamenities(response.data.amenities);
        setExtraInfo(response.data.extraInfo);
        setCheckIn(response.data.checkIn);
        setCheckOut(response.data.checkOut);
        setMaxGuests(response.data.maxGuests);
        setPrice(response.data.price);
        setregion(response.data.region);
        setrating(response.data.rating);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const HandleEditHome = async () => {
    const placeData = {
      id: ids,
      Category,
      title,
      address,
      addedPhotos,
      desc,
      amenities,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      region,
      rating,
      price,
    };
    try {
      const response = await EditAirbnbHome(placeData);
      if (response.success) {
        toast({
          title: "Edit successfull",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        getHomesData();
      } else {
        console.log(response.message);
      }
    } catch (error) {
      toast({
        title: "error Occured",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
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
        getHomesData();
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

  return (
    <Box>
      {userHomes.filter((offer) => offer.status !== "pending").length !== 0 ? (
        <>
          {userHomes
            .filter((offer) => offer.status !== "pending")
            .map((offer, index) => (
              <Card
                key={index}
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                mb={2}
              >
                {/* <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={offer.photos[0]}
                  alt="Caffe Latte"
                /> */}
                <Box
                  onClick={() => navigate(`/homes/${offer._id}`)}
                  cursor={"pointer"}
                  h={'250px'}
                >
                  <Image
                    objectFit="cover"
                    h={"100%"}
                    w={['100%','350px','350px','350px']}
                    src={offer.photos[0]}
                    alt="Caffe Latte"
                  />

                </Box>

                <Stack>
                  <CardBody>
                    <Heading size="md">{offer.title}</Heading>
                    <Text>{offer.address}</Text>
                    <Flex gap={10} py={2}>
                      <Text>{offer.region}</Text>
                      <Text>{offer.Category}</Text>
                    </Flex>
                  </CardBody>

                  <CardFooter>
                    <Flex gap={10}>
                      <Button
                        variant="solid"
                        colorScheme="red"
                        onClick={() => handleDelete(offer._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="solid"
                        colorScheme="green"
                        onClick={onOpen}
                      >
                        <Text onClick={() => handleEditHome(offer._id)}>
                          Edit
                        </Text>
                      </Button>
                    </Flex>
                  </CardFooter>
                </Stack>
              </Card>
            ))}
        </>
      ) : (
        <>
          <Heading py={2}>My Homes</Heading>
          <Divider />
          <Text py={2}>No Approved Homes</Text>
          <Text fontSize={"xs"} py={2}>
            Admin Not Approve your Homes or else you din't add any home yet!
          </Text>
          <Button variant={"outline"} onClick={() => navigate("/")}>
            Start Searching
          </Button>
          <Divider mt={2} />
        </>
      )}

      {/* Edit model */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={900}>
          <ModalHeader>Edit Home</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box p={4}>
              <FormControl>
                {/* title */}
                <FormLabel color={"gray.500"}>Title for your Home</FormLabel>
                <Input
                  type="text"
                  focusBorderColor="pink.400"
                  isRequired={true}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <FormHelperText color={"gray.500"}>
                  Should be short and catchy as in advertisement
                </FormHelperText>

                {/* Address */}
                <FormLabel mt={4} color={"gray.500"}>
                  Address of your Home
                </FormLabel>
                <Input
                  value={address}
                  focusBorderColor="pink.400"
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                />
                <FormHelperText color={"gray.500"}>
                  Should be short and catchy as in advertisement
                </FormHelperText>

                <FormLabel mt={4} color={"gray.500"}>
                  Add photos of your Home
                </FormLabel>
                <PhotosUploader
                  addedPhotos={addedPhotos}
                  setAddedPhotos={setAddedPhotos}
                />

                <Text mb="8px" mt={4} color={"gray.500"}>
                  Add description
                </Text>
                <Textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  focusBorderColor="pink.400"
                  placeholder="add description to your place"
                  size="sm"
                />
                <FormHelperText color={"gray.500"}>
                  explain about your Home
                </FormHelperText>

                <FormLabel mt={8} color={"gray.500"}>
                  select Amenities of your Home
                </FormLabel>
                <Amenties selected={amenities} onChange={setamenities} />

                <FormLabel mt={8} color={"gray.500"}>
                  select Category
                </FormLabel>
                <Select
                  variant="outline"
                  placeholder="select home Category"
                  value={Category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {options}
                </Select>

                <FormLabel mt={8} color={"gray.500"}>
                  select Rating
                </FormLabel>
                <Select
                  variant="outline"
                  placeholder={rating}
                  value={rating}
                  onChange={(e) => setrating(e.target.value)}
                >
                  {ratingoptions}
                </Select>

                <FormLabel mt={8} color={"gray.500"}>
                  select Region
                </FormLabel>
                <Select
                  variant="outline"
                  placeholder={region}
                  value={region}
                  onChange={(e) => setregion(e.target.value)}
                >
                  {regionoptions}
                </Select>

                <Text mb="8px" mt={8} color={"gray.500"}>
                  Add Extra information
                </Text>
                <Textarea
                  value={extraInfo}
                  focusBorderColor="pink.400"
                  onChange={(e) => setExtraInfo(e.target.value)}
                  placeholder="Add Extra information about your place"
                  size="sm"
                />

                <FormLabel mt={8} color={"gray.500"}>
                  Check in&out times,add check in and out times, remember to
                  have some time window forcleaning the room between guests.
                </FormLabel>
                <Box>
                  <SimpleGrid columns={[2, 3, 3, 4]} spacing={10}>
                    <Box height="80px">
                      <FormLabel>ChekIn Time</FormLabel>
                      <Input
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        type="text"
                      />
                    </Box>
                    <Box height="80px">
                      <FormLabel>ChekOut Time</FormLabel>
                      <Input
                        type="text"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                      />
                    </Box>

                    <Box height="80px">
                      <FormLabel>Number of guests</FormLabel>
                      <Input
                        type="text"
                        value={maxGuests}
                        onChange={(e) => setMaxGuests(e.target.value)}
                      />
                    </Box>

                    <Box height="80px">
                      <FormLabel>1 Night price</FormLabel>
                      <Input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </Box>
                  </SimpleGrid>
                </Box>
                <Flex justifyContent={"center"} mt={5} onClick={onClose}>
                  <Button
                    onClick={HandleEditHome}
                    isDisabled={
                      title === "" ||
                      address === "" ||
                      addedPhotos === "" ||
                      desc === "" ||
                      extraInfo === "" ||
                      checkIn === "" ||
                      checkOut === "" ||
                      maxGuests === "" ||
                      price === ""
                    }
                    leftIcon={<BiSolidHomeHeart />}
                    colorScheme="red"
                    variant="solid"
                    letterSpacing={"2px"}
                  >
                    Completed
                  </Button>
                </Flex>
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GetmyHomes;
