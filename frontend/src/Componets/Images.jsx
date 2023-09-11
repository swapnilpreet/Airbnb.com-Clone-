import React from 'react';
import {Box, Image} from '@chakra-ui/react';

const Images = ({ src, ...rest }) => {

  return( <>
      {/* <Box border={'1px solid red'} w={'100%'} h={44}> */}
      <Image boxSize='174px' w={'full'} src={src} alt='Dan Abramov' borderRadius={'2xl'} />
      {/* </Box> */}
      </> 
  );
};

export default Images;