import {
  Box,
  Heading,
  Text,
  Stack,
  Image,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Flex,
  useToast,
  Divider,
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { AddtoWishlist, GetAllWislistProducts } from "../../ApiCalls/wishlist";
import { useEffect, useState } from "react";
import redheart from '../../Accests/heart-red.png';

// const data = [
//   {
//     name: " Nice Chair, pink",
//     price: "$57",
//     image:
//       "https://images.unsplash.com/photo-1499887142886-791eca5918cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     name: " Nice Chair, pink",
//     price: "$57",
//     image:
//       "https://images.unsplash.com/photo-1499887142886-791eca5918cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     name: " Nice Chair, pink",
//     price: "$57",
//     image:
//       "https://images.unsplash.com/photo-1499887142886-791eca5918cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     name: " Nice Chair, pink",
//     price: "$57",
//     image:
//       "https://images.unsplash.com/photo-1499887142886-791eca5918cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     name: " Nice Chair, pink",
//     price: "$57",
//     image:
//       "https://images.unsplash.com/photo-1499887142886-791eca5918cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     name: " Nice Chair, pink",
//     price: "$57",
//     image:
//       "https://images.unsplash.com/photo-1499887142886-791eca5918cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     name: " Nice Chair, pink",
//     price: "$57",
//     image:
//       "https://images.unsplash.com/photo-1499887142886-791eca5918cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//   },
// ];




export default function Card() {
  const toast= useToast();
  const { loading } = useSelector((state) => state.loaders);
  const navigate = useNavigate();
  const [wishlist, setwishlist] = useState([])
  console.log(wishlist)
  const handleWishlist = async (id) => {
    try {
      const response = await AddtoWishlist({ prodId: id });
      if (response.success) {
         toast({
          title: 'Remove from your Wishlist',
          status: 'success',
          duration: 4000,
          isClosable: true,
         })
         getWishlist();
      } else {
        throw new Error("Failed to add wihlist");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getWishlist =async()=>{
    try {
      const response = await GetAllWislistProducts();
      if (response.success) {
        setwishlist(response.data.wishlist);
      } else {
        throw new Error("Couldn't get wishlist products");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    getWishlist();
  },[])

  return (
     <>
     {wishlist.length !== 0 ? (
      <SimpleGrid row={"auto"} columns={[1, 2, 3, 3]} spacing="40px">
      {wishlist.map((item) => (
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
          mt={20}
         
        >
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"230px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${item.image})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Skeleton isLoaded={!loading}>
              <Link to={`/homes/${item._id}`}>
              <Image
                rounded={"lg"}
                height={230}
                width={282}
                objectFit={"cover"}
                src={item.photos[0]}
                alt="#"
                cursor={"pointer"}
              />
              </Link>
            </Skeleton>

          </Box>
          
          <Stack pt={10} align={"left"}>
            <SkeletonText isLoaded={!loading}>
              <Text
                color={"gray.500"}
                fontSize={"sm"}
                h={10}
                textTransform={"uppercase"}
              >
                {item.title}
              </Text>
              <Heading fontSize={"xl"} fontFamily={"body"} fontWeight={500}>
                {item.Category}
              </Heading>
                <Flex justifyContent={'space-between'}>
                  <Box>
                    <Text fontWeight={800} fontSize={"xl"}>
                    &#8377;{" "}
                        {new Intl.NumberFormat("en-IN").format(item.price)}
                    </Text>
                  </Box>
                    <Image boxSize={"30px"} src={redheart}  cursor={'pointer'} onClick={()=>handleWishlist(item._id)}></Image>
                </Flex>
            </SkeletonText>
          </Stack>
        </Box>
      ))}
    </SimpleGrid>
     ):(
        <>
        <Text py={2}>No Wishlist Homes</Text>
        <Button variant={"outline"} onClick={() => navigate("/")}>
          Start Searching
        </Button>
        <Divider mt={2} />
      </>
     )}
     </>
  );
}
