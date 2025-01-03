import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../../Redux/userSlice";
import { GetCurrentUser } from "../../ApiCalls/user";
import { useToast } from "@chakra-ui/react";

const ProtectedPage = ({children}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        navigate("/login");
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: "Error occurred while protectedpage",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);

  return <div>{children}</div>;
};

export default ProtectedPage;
