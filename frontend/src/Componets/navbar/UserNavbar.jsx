import { Box, Divider, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import mainlogo from '../../Accests/mainlogo.svg'

const UserNavbar = () => {
  return (
    <Box>
         <Flex justifyContent={'center'} p={2}>
              <Image src={mainlogo} alt='mainlogo'></Image>
         </Flex>
         <Divider/>
    </Box>
  )
}

export default UserNavbar