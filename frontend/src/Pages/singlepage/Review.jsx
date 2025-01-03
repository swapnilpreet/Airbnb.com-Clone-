import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormLabel,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  AddReview,
  DeleteReviewById,
  EditReview,
  GetAllReview,
  GetReviewById,
} from "../../ApiCalls/review";
import { useSelector } from "react-redux";
import { BiSolidStar } from "react-icons/bi";

const Rating = [
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

const ratingoption = Rating.map((option,index) => {
  return <option key={index} value={option.value}>{option.text}</option>;
});

const Review = ({ singleHome }) => {
  const { user } = useSelector((state) => state.users);
  const [rating, setrating] = useState("");
  const [ids, setids] = useState("");
  const [comment, setcomment] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addModel = useDisclosure();

  const [ReviewsData, setReviewData] = useState([]);
 
  const handleAddReview = async (id) => {
    try {
      const response = await AddReview(id, {
        rating: rating,
        comment: comment,
      });
      if (response.success) {
        getReviews(singleHome?._id);
        toast({
          title: "Review added successfully",
          description: response.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setrating("");
        setcomment("");
      }else{
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: "Error Occured in adding review",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      const response = await DeleteReviewById(id);
      if (response.success) {
        toast({
          title: "Review deleted successfully",
          description: response.message,
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        getReviews(singleHome?._id);
      }else{
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: "Error Occured in Delete review",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleEditReview = async (id) => {
    try {
      const response = await EditReview(id, {
        rating,
        comment,
      });
      if (response.success) {
        toast({
          title: "Review updated successfully",
          description: response.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setrating("");
        setcomment("");
        setids("");
        getReviews(singleHome?._id);
      }else{
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: "Error Occured in updated review",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const getReviewByidhanlde = async (id) => {
    try {
      setids(id);
      const response = await GetReviewById(id);
      setrating(response.data.rating);
      setcomment(response.data.comment);
    } catch (error) {
      toast({
        title: "Error Occured in Get Review By Id",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const getReviews = async (id) => {
    try {
      const response = await GetAllReview(id);
      if (response.success) {
        setReviewData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: "Error Occured in Get Reviews",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };


  useEffect(() => {
    if(singleHome){
      getReviews(singleHome?._id);
    }
  },[singleHome]);

  console.log("ReviewsData",ReviewsData)

  return (
    <Box pt={2}>
      <Box m={2}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Flex
              alignItems={"center"}
              gap={2}
              fontSize={"xl"}
              fontWeight={"bold"}
            >
              <Box>
                <BiSolidStar size={20} />
              </Box>
              <Box>{singleHome?.rating}</Box>
              <Box>Reviews</Box>
              <Box>{ReviewsData?.length}</Box>
            </Flex>
          </Box>
          <Box>
            {singleHome?.owner._id !== user?._id ? (
              <Box>
                <Button onClick={addModel.onOpen}>Add Reviews</Button>
              </Box>
            ) : null}
          </Box>
        </Flex>
      </Box>

      {ReviewsData.length !== 0 ? (
        <>
          <Box h={"300px"} width={"100%"} overflow={"scroll"}>
            <SimpleGrid columns={[1, 1, 2, 2]} spacing={10} m={2}>
              {ReviewsData?.map((item, index) => (
                 
                  <Box key={index}>
                    <Card>
                      <CardHeader>
                        <Flex spacing="4">
                          <Flex
                            flex="1"
                            gap="4"
                            alignItems="center"
                            flexWrap="wrap"
                          >
                            <Avatar
                              name="Segun Adebayo"
                              src="https://bit.ly/sage-adebayo"
                            />
                            <Box>
                              <Heading size="sm">{item?.user?.name}</Heading>
                              <Text>{item?.user?.role}, Airbnb</Text>
                            </Box>
                          </Flex>

                          <>
                            <Menu>
                              {item?.user?._id === user?._id ? (
                                <MenuButton
                                  as={Button}
                                  variant="ghost"
                                  colorScheme="gray"
                                  aria-label="See menu"
                                >
                                  <BsThreeDotsVertical />
                                </MenuButton>
                              ) : null}
                              <MenuList>
                                <MenuItem
                                  onClick={() => handleDeleteReview(item?._id)}
                                >
                                  Delete
                                </MenuItem>
                                <MenuItem
                                  onClick={() => getReviewByidhanlde(item?._id)}
                                >
                                  <Text onClick={onOpen}>Edit</Text>
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </>
                        </Flex>
                      </CardHeader>

                      <CardBody>
                        <Flex gap={2}>
                          <BiSolidStar size={20} />
                          <Text>{item?.rating}</Text>
                        </Flex>
                        <Box h={"24"} overflow={"scroll"}>
                          <Text>{item?.comment}</Text>
                        </Box>
                      </CardBody>
                    </Card>
                  </Box>
                
              ))}
            </SimpleGrid>
          </Box>
        </>
      ) : null}

      {/* Edit modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Flex direction={"column"}>
                <FormLabel mt={8} color={"gray.500"}>
                  select Rating
                </FormLabel>
                <Select
                  variant="outline"
                  placeholder={rating}
                  value={rating}
                  onChange={(e) => setrating(e.target.value)}
                >
                  {ratingoption}
                </Select>
                <FormLabel mt={4} color={"gray.500"}>
                  Comment
                </FormLabel>
                <Input
                  value={comment}
                  focusBorderColor="pink.400"
                  onChange={(e) => setcomment(e.target.value)}
                  type="text"
                />
                <Button
                  mt={4}
                  // onClick={() => handleEditReview(item?._id)}
                  onClick={() => handleEditReview(ids)}
                >
                  <Text onClick={onClose}>Edit Review</Text>
                </Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* add model */}
      <Modal isOpen={addModel.isOpen} onClose={addModel.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Flex direction={"column"}>
                <FormLabel mt={8} color={"gray.500"}>
                  select Rating
                </FormLabel>
                <Select
                  variant="outline"
                  placeholder="select Rating"
                  value={rating}
                  onChange={(e) => setrating(e.target.value)}
                >
                  {ratingoption}
                </Select>
                <FormLabel mt={4} color={"gray.500"}>
                  Comment
                </FormLabel>
                <Input
                  value={comment}
                  focusBorderColor="pink.400"
                  onChange={(e) => setcomment(e.target.value)}
                  type="text"
                />
                <Button mt={4} onClick={() => handleAddReview(singleHome?._id)}>
                  <Text onClick={addModel.onClose}>Add Review</Text>
                </Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Review;
