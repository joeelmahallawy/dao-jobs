import { Center, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <Center justifyContent="flex-end" bg="#F1F4FF" p="3.5%">
      <FontAwesomeIcon icon={faCopyright} color="black" />
      <Text fontFamily="Arial" fontWeight="500" color="black">
        Copyright 2021
      </Text>
    </Center>
  );
};
export default Footer;