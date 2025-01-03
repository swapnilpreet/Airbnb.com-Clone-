import React from "react";
import moment from "moment";
import {
  Box,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Button,
  useToast,
} from "@chakra-ui/react";
import { UpdateUserStatus, getAllUsers } from "../../ApiCalls/user";

const GetAllUsers = ({usersData,setusersData}) => {

    const toast = useToast();


    const getData =async()=>{
        try {
            const response = await getAllUsers();
            if(response.success){
              setusersData(response.data);
            }else{
              throw new Error(response.message);
            }
        } catch (error) {
          toast({
            title: "Error Occured in geting All Users",
            description: error.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
    }

    const onStatusUpdate=async(id,status)=>{
        try {
            const response = await UpdateUserStatus(id, status);
            if (response.success) {
              getData();
            } else {
              throw new Error(response.message);
            }
          } catch (error) {
            toast({
              title: "Error Occured in Update User Status",
              description: error.message,
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          }
    }

  return (
    <Box p={2}>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Block</Th>
              <Th>Created Date</Th>
            </Tr>
          </Thead>

         {usersData?.map((user,index)=>(
            <Tbody key={index}>
               <Tr>
                 <Th>{user.name}</Th>
                 <Th>{user.email}</Th>
                 <Th>{user.role}</Th>
                 <Th>
                    <Button color={'green'}>{user.status}</Button>
                 </Th>
                 
                 <Th>
                    {user.status === 'active' && (<Button isDisabled={user.role==="admin"  ? true : false}  onClick={() => onStatusUpdate(user._id, "blocked")} color={'red'}>Block</Button>)}
                    {user.status === 'blocked' && (<Button onClick={() => onStatusUpdate(user._id, "active")} color={'Green'}>Unblock</Button>)}
                 </Th>
                 <Th>{moment(user.createdAt).format("Do MMMM, YYYY")}
                 </Th>
               </Tr>
            </Tbody>
         ))}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GetAllUsers;
