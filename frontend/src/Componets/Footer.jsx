import {
  Box,
  Container,
  Divider,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <Box bg={"#CBD5E0"}>
      <Container as={Stack} maxW={"6xl"} py={10}>
        <Flex justifyContent={"space-between"}>
          <Stack align={"flex-start"}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Company
            </Text>

            <Box as="a" href={"#"}>
              About Us
            </Box>
            <Box as="a" href={"#"}>
              Blog
            </Box>
            <Box as="a" href={"#"}>
              Careers
            </Box>
            <Box as="a" href={"#"}>
              Contact Us
            </Box>
          </Stack>

          <Stack align={"flex-start"}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Support
            </Text>
            <Box as="a" href={"#"}>
              Help Center
            </Box>
            <Box as="a" href={"#"}>
              Safety Center
            </Box>
            <Box as="a" href={"#"}>
              Community Guidelines
            </Box>
          </Stack>

          <Stack align={"flex-start"}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Legal
            </Text>
            <Box as="a" href={"#"}>
              Cookies Policy
            </Box>
            <Box as="a" href={"#"}>
              Privacy Policy
            </Box>
            <Box as="a" href={"#"}>
              Terms of Service
            </Box>
            <Box as="a" href={"#"}>
              Law Enforcement
            </Box>
          </Stack>
        </Flex>
        <Divider />
        <Box>
          <Flex justifyContent={"space-between"}>
            <Box>
              <Text>© 2022 Chakra Templates. All rights reserved</Text>
            </Box>

            <Box>
              <Stack direction={"row"} spacing={6}>
                <FaTwitter />
                <FaYoutube />
                <FaInstagram />
              </Stack>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
