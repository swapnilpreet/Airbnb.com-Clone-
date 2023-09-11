import { Box } from '@chakra-ui/react'
import React from 'react'

const Layout = ({children}) => {
  return (
    <Box w={['100%','100%','100%','60%']} m={'auto'} mt={24}>{children}</Box>
  )
}

export default Layout