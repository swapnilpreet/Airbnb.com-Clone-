import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Tfoot,
  Button,
} from "@chakra-ui/react";
import { GetAllHome, UpdateHomeStatus } from "../../ApiCalls/home";
import moment from "moment";

const AllHomes = () => {
  const [Homes, setHomes] = useState([]);

  const getData = async () => {
    try {
      const response = await GetAllHome();
      if (response.success) {
        console.log("all homes", response.data);
        setHomes(response.data);
      } else {
        throw new Error("Couldn't gets all homes");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onHomeStatusUpdate = async (id, status) => {
    try {
      const response = await UpdateHomeStatus(id, status);
      if (response.success) {
        getData();
      } else {
        throw new Error("Couldn't gets all homes");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Imperial to metric conversion factors</TableCaption>

          <Thead>
            <Tr>
              <Th>Images</Th>
              <Th>title</Th>
              <Th>ownername</Th>
              <Th>category</Th>
              <Th>createdAt</Th>
              <Th>status</Th>
              <Th>change status</Th>
              <Th isNumeric>price</Th>
            </Tr>
          </Thead>

          {Homes?.map((homes, index) => (
            <Tbody key={index}>
              <Tr>
                <Th>
                  <Image boxSize={"80px"} src={homes.photos[0]}></Image>
                </Th>
                <Th>{homes.title}</Th>
                <Th>{homes.owner.name}</Th>
                <Th>{homes.Category}</Th>
                <Th>{moment(homes.createdAt).format("Do MMMM, YYYY")}</Th>
                <Th>{homes.status}</Th>
                <Th>
                  {homes.status === "approved" && (
                    <Button
                      onClick={() => onHomeStatusUpdate(homes._id, "pending")}
                      color={"red"}
                    >
                      Block
                    </Button>
                  )}
                  {homes.status === "pending" && (
                    <Button
                      onClick={() => onHomeStatusUpdate(homes._id, "approved")}
                      color={"Green"}
                    >
                      Approve
                    </Button>
                  )}
                </Th>
                <Th isNumeric>{homes.price}</Th>
              </Tr>
            </Tbody>
          ))}

          <Tfoot>
            <Tr>
              <Th>Images</Th>
              <Th>title</Th>
              <Th>ownername</Th>
              <Th>category</Th>
              <Th>createdAt</Th>
              <Th>status</Th>
              <Th>change status</Th>
              <Th isNumeric>price</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllHomes;
