import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { theme } from "../../../utils/theme";
import backgroundImage from "../../../attachments/how-it-works-bg.png";
import {
  faArrowAltCircleRight,
  faArrowRight,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import List from "./list";

const AboutUs = () => {
  return (
    <Center gap="1rem" p={5} pt={10} bg="#F1F4FF" flexDir="column">
      <Heading
        fontSize={["1.25rem", "2rem", "2.5rem", "3rem", "4rem"]}
        fontWeight="500"
      >
        <span
          style={{
            color: theme.colors.PrimaryBlue,
            fontWeight: "bold",
          }}
        >
          How{"  "}
        </span>
        it works
      </Heading>

      <Flex w="100%" display={["block", "block", "flex"]}>
        <Center
          gap="1rem"
          w={["100%", "100%", "100%", "50%", "50%"]}
          flexDir="column"
        >
          <Heading
            fontWeight="500"
            fontSize={["1.25rem", "1.5rem", "2rem", "2.25rem", "2.5rem"]}
          >
            Employer
          </Heading>

          <List order={"1"} type={"employer"}>
            Signup as an employer with your discord
          </List>
          <List order={"2"} type={"employer"}>
            Add your DAO's basic information + job postings
          </List>
          <List order={"3"} type={"employer"}>
            Start getting applications and hiring members!
          </List>
        </Center>
        <Stack
          direction="row"
          display={["none", "none", "none", "block", "block"]}
          h={["400px", "400px", "400px", "345px", "400px"]}
          p={0}
          bg="gray.600"
        >
          <Divider orientation="vertical" w="5px" />
        </Stack>
        <Center
          gap="1rem"
          w={["100%", "100%", "100%", "50%", "50%"]}
          flexDir="column"
        >
          <Heading
            fontWeight="500"
            fontSize={["1.25rem", "1.5rem", "2rem", "2.25rem", "2.5rem"]}
          >
            Job seeker
          </Heading>

          <List type={"seeker"} order={"1"}>
            Signup as a job-seeker with your discord
          </List>
          <List type={"seeker"} order={"2"}>
            Apply to your favourite DAO's job positions
          </List>
          <List type={"seeker"} order={"3"}>
            Get employed working for a DAO!
          </List>
        </Center>
      </Flex>
    </Center>
  );
};
export default AboutUs;
