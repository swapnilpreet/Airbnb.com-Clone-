import React, { useEffect, useState } from "react";
import UserNavbar from "../../Componets/navbar/UserNavbar";
import { Box, Button, Flex, FormControl, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import { LoginUser } from "../../ApiCalls/user";
import { useTheme } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const toast = useToast();
  const theme = useTheme();
  const navigate= useNavigate()
  const [customerSignUp, setCustomerSignUp] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setCustomerSignUp({
      ...customerSignUp,
      [event.target.name]: event.target.value,
    });
  };

  const registerUserHandle = async (event) => {
    event.preventDefault();
    try {
      const response = await LoginUser(customerSignUp);
      if (response.success) {
        localStorage.setItem('token', response.data);
        window.location.href="/";
        setCustomerSignUp({
          email: "",
          password: "",
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: "Error occurred while login",
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
            Login
          </Button>
        </form>
        <Flex gap={2} mt={10} justifyContent='center'>
          <Text>
          Don't have an account ?
          </Text>
          <Link to={'/register'} > <Text color={theme.colors.primary.main}>
          Register
            </Text></Link>
        </Flex>
      </Box>
    </>
  );
};

export default Login;
