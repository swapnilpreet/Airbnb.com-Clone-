import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Login from "./user/Login";
import Register from "./user/Register";
import Wishlist from "./wishlist/Wishlist";
import ProtectedPage from "../Componets/protected/ProtectedPage";
import Trips from "./trip/Trips";
import AddHome from "./addHome/AddHome";
import Admin from "./admin/Admin";
import AdminProtected from "../Componets/protected/AdminProtected";
import Error from "../Componets/Error";
import { Box } from "@chakra-ui/react";
import SinglePage from "./singlepage/SinglePage";
import GetmyHomes from "./addHome/GetmyHomes";
import UserHomes from "./addHome/UserHomes";

const MainRoutes = () => {
  return (
    <Box>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/error" element={<Error />} />
        <Route
          path="/"
          element={
            <ProtectedPage>
              <Home />
            </ProtectedPage>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedPage>
              <Wishlist />
            </ProtectedPage>
          }
        />
        <Route
          path="/trip"
          element={
            <ProtectedPage>
              <Trips />
            </ProtectedPage>
          }
        />
        <Route
          path="/airbnb-your-home"
          element={
            <ProtectedPage>
              <UserHomes/>
            </ProtectedPage>
          }
        />

        <Route
          path="/airbnb-your-home/:id"
          element={
            <ProtectedPage>
              <UserHomes/>
            </ProtectedPage>
          }
        />
        
        <Route
          path="/get-my-homes"
          element={
            <ProtectedPage>
              <GetmyHomes/>
            </ProtectedPage>
          }
        />

        <Route
          // /product/:id
          path="/homes/:id"
          element={
            <ProtectedPage>
                <SinglePage />
            </ProtectedPage>
          }
        />
         <Route
          path="/admin"
          element={
            <ProtectedPage>
              <AdminProtected>
                 <Admin />
              </AdminProtected>
            </ProtectedPage>
          }
        />
      </Routes>
    </Box>
  );
};

export default MainRoutes;
