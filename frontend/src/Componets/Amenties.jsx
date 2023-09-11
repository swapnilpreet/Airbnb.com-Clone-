import { Box, Flex, Input, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { BiWifi } from "react-icons/bi";

// const amenities =()=>{
   
// }
const amenities = [
  {value: "wifi", text: "Wifi"}, 
  {value: "Indoor Fireplace", text: "Indoor Fireplace"}, 
  {value: "petsallowed", text: "pets allowed"},  
  {value: "essentials", text: "Essentials"}, 
  {value: "heating", text: "Heating"},
  {value: "Smoke alarm", text: "Smoke alarm"},
  {value: "Dishes", text: "Dishes"},
  {value: "Coffee maker", text: "Coffee maker"},
  {value: "Kitchen", text: "Kitchen"},
  {value: "Tv", text: "TV"},
  {value: "Self checkIn", text: "Self checkIn"},
  {value: "washing mashin", text: "washing mashin"},
  {value: "Building staff", text: "Building staff"},
  {value: "Hair dryer", text: "Hair dryer"},
  {value: "Air Conditionary", text: "Air Conditionary"},
  {value: "Carbon monoxide alarm", text: "CO alarm"},
  {value: "shampoo", text: "shampoo"}
];



const Amenties = ({ selected, onChange }) => {

   const handleCbClick = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected].filter((selectedName) => selectedName !== name));
    }
  };

  return (
    <>
    <Box>
        <SimpleGrid columns={[2,3,3,5]}>
          {amenities.map((options,index)=>(
              <Box border={'1px solid gray'} bg={'gray.100'} borderRadius={"2xl"} m={2}>
                <Flex gap={2} alignItems={'center'}  alignContent={'center'} p={'20px'} justifyContent={'start'}>
                  <input
                    key={index}
                    style={{ width: "20px", height: "20px"}}
                    type="checkbox"
                    border={'1px solid gray'}
                    checked={selected?.includes(`${options.value}`)}
                    name={`${options.value}`}
                    onChange={handleCbClick}>
                  </input>
                   <Text fontSize={'xs'}>{options.text}</Text>
                </Flex>
              </Box>
          ))}
        </SimpleGrid>
    </Box>
    </>
  );
};

export default Amenties;