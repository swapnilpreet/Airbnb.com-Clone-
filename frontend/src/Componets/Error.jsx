import { Box, Flex, Image, Text } from '@chakra-ui/react'
// import { warning } from 'framer-motion'
import warning from '../Accests/warning.gif'
import React from 'react'

const Error = () => {
  return (
    <Box>
        <Flex textAlign={'center'} direction={'column'} mt={40}>
            <Image maxH={96} margin={'auto'} src={warning} ></Image>
            <Text fontSize={'xs'} color={"red"}>Your aren't Authorization for Admin Route.</Text>
        </Flex>
    </Box>
  )
}

export default Error