import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Hide,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import mainlogo from "../../Accests/mainlogo.svg";
import { TbWorldCancel } from "react-icons/tb";
import {useDispatch, useSelector} from 'react-redux';
import {FaBars} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import { SetUser } from "../../Redux/userSlice";

const PagesNavbar = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout =()=>{
    Navigate('/login')
     dispatch(SetUser(null))
     localStorage.removeItem('token');
  }
  const {user} =useSelector((state)=>state?.users);
  
  return (
    <>
    <Box pos="fixed" w={'100%'}  bg={'white'}  top={0} zIndex={"200"}>

      <Flex justifyContent={"space-between"} p={2} w={["100%","100%","100%","60%"]} alignItems={'center'} m={'auto'}>
        <Box>
          <Link to={'/'}>
          <Image src={mainlogo} w={"28"}></Image>
          </Link>
        </Box>
        <Box>
          <Flex alignItems={"center"} gap={1}>
            <Hide below="md">
            <Button fontSize={"xs"} variant="outline" borderRadius={'full'} onClick={()=>Navigate('/airbnb-your-home')}>
              Airbnb your home
            </Button>
            <TbWorldCancel size={22} />

            </Hide>

            <Menu >
              <MenuButton
                transition="all 0.2s"
                borderRadius="full"
                borderWidth="1px"
              >
                <Flex gap={2} p={1} alignItems={'center'}>
                  <Box>
                    <Text>
                      <FaBars size={20}/>
                    </Text>
                  </Box>
                  <Box bg={'black'} borderRadius={"full"}>
                    <Text pl={2} pr={2} color={'white'}>
                      {user?.name.charAt(0)}
                    </Text>
                  </Box>
                </Flex>
              </MenuButton>
              <MenuList >
              <MenuItem minH='48px'>
                <Flex alignItems={'center'}>
                  <Box>
                  <Image
                    boxSize='2rem'
                    borderRadius='full'
                    src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
                    alt='Fluffybuns the destroyer'
                    mr='12px'
                  />
                  </Box>
                  <Flex flexDirection={'column'}>
                    <Text>{user?.name}</Text>
                    <Text fontSize={'xs'}>{user?.email}</Text>
                  </Flex>
                </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem>Message</MenuItem>
                <Link to={'/trip'}><MenuItem>Trips</MenuItem></Link>
                <Link to={'/wishlist'}><MenuItem>Wishlist</MenuItem></Link>
                
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
      <Divider p={2}/>
    </Box>
    </>
  );
};

export default PagesNavbar;
