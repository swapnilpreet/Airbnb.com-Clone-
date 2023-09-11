import React, { useEffect, useState } from "react";
import Perks from "../../Componets/Amenties";
import PhotosUploader from "../../Componets/PhotosUploader";

import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "../../ApiCalls/axiosinstance";
import { AddAirbnbHome, EditAirbnbHome } from "../../ApiCalls/home";
import Amenties from "../../Componets/Amenties";
import { BiSolidHomeHeart } from "react-icons/bi";

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

const AddHome = ({getHomesData}) => {
  const toast = useToast()
  const [Category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [amenities, setamenities] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [region, setregion] = useState("");
  const [rating, setrating] = useState("");
  const [price, setPrice] = useState(0);

  const savePlace = async (e) => {
    e.preventDefault();
    const placeData = {
      Category,
      title,
      address,
      addedPhotos,
      desc,
      amenities,
      extraInfo,
      checkIn,
      checkOut,
      region,
      rating,
      maxGuests,
      price,
    };
    try {
      const response = await AddAirbnbHome(placeData);
      if (response.success) {
        toast({
          title: 'Home created.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        getHomesData();
        const myTimeout = setTimeout(myGreeting, 5000);
        function myGreeting() {
          alert(
            "Admin recive Your Home Register Request he will publish as soon as possible Thank your becoming a Airbnb member"
          );
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  };

  return (
    <>
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
            placeholder="select Rating"
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
            placeholder="select Region"
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
            Check in&out times,add check in and out times, remember to have some
            time window forcleaning the room between guests.
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
          <Flex justifyContent={"center"} mt={5}>
            <Button
              onClick={savePlace}
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
              Register
            </Button>
          </Flex>
        </FormControl>
      </Box>
    </>
  );
};

export default AddHome;
