import React, { useEffect, useState } from "react";
import UserNavbar from "../../Componets/navbar/UserNavbar";
import { Box, Button, Flex, FormControl, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import {RegisterUser } from "../../ApiCalls/user";
import { useTheme } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";



const Register = () => {

  const toast = useToast();
  const theme = useTheme();
  
  const [customerSignUp, setCustomerSignUp] = useState({
    name:"",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setCustomerSignUp({
      ...customerSignUp,
      [event.target.name]: event.target.value,
    });
  };

  const registerUserHandle = async (event) => {
    event.preventDefault();
    try {
      const response = await RegisterUser(customerSignUp);
      if (response.success) {
        toast({
          title: "Register successful",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/login");
        setCustomerSignUp({
          name:"",
          email: "",
          password: "",
        });
      } else {
        throw new Error('error occurred in Register user');
      }
    } catch (error) {
      toast({
        title: "Error occurred while Register",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate("/")
    }
  },[]);

  return (
    <>
      <UserNavbar />
      <Box w={['90%','80%','50%','25%']} margin={'auto'} mt={10}>
        <form onSubmit={registerUserHandle}>
        <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
             focusBorderColor={theme.colors.primary.main}
             type="name"
              name="name"
              value={customerSignUp.name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired mt={6}>
            <FormLabel>Email</FormLabel>
            <Input
             focusBorderColor={theme.colors.primary.main}
             type="email"
              name="email"
              value={customerSignUp.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired mt={6}>
            <FormLabel>Password</FormLabel>
            <Input
                focusBorderColor={theme.colors.primary.main}
               type="password"
               name="password"
               value={customerSignUp.password}
               onChange={handleChange}
            />
          </FormControl>
          <Button
            bg={theme.colors.primary.main}
            variant="outline"
            type="submit"
            width="full"
            mt={10}
            color={'white'}
          >
            Register
          </Button>
        </form>
        <Flex gap={2} mt={10} justifyContent='center'>
          <Text>
          Have an account ?
          </Text>
          <Link to={'/login'}> <Text color={theme.colors.primary.main}>
          Login
            </Text></Link>
        </Flex>
      </Box>
    </>
  );
};

export default Register;
