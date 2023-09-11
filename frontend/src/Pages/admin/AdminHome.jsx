import React, { useEffect, useState } from 'react'
import { GetUserHome } from '../../ApiCalls/home';
import { Box, Button, Image, Table, TableCaption, TableContainer, Tbody, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import moment from 'moment';

const AdminHome = () => {
    const [myhome, setmyhome] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await GetUserHome();
                if(response.success){
                      if(response.data.length > 0){
                        setmyhome(response.data)
                      }
                }else{
                    throw new Error(response.message)
                }
            } catch (error) {
              console.error(error.message);
            }
          })();
    }, [])
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
              <Th isNumeric>price</Th>
            </Tr>
          </Thead>

          {myhome?.map((homes, index) => (
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
              <Th isNumeric>price</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AdminHome