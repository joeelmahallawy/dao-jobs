import { Flex, Center, Heading, Box } from "@chakra-ui/react";
import { theme } from "../../../../utils/theme";
import React from "react";

type Props = {
  children: string;
  order: string;
  type: string;
};
const List = ({ children, order, type }: Props) => {
  return (
    <Flex w="100%" p={3} alignItems="center" gap="1rem">
      {type == "employer" ? (
        <Center gap="1rem">
          <Center
            bg={theme.colors.PrimaryBlue}
            w={["30px", "40px", "50px", "60px", "80px"]}
            h={["30px", "40px", "50px", "60px", "80px"]}
            borderRadius="50%"
          >
            <Heading
              color="white"
              fontSize={["1rem", "1rem", "1.25rem", "1.5rem", "1.5rem"]}
            >
              {order}.
            </Heading>
          </Center>
          <Box>
            <Heading
              fontFamily="Arial"
              fontSize={["1rem", "1rem", "1rem", "1.25rem", "1.65rem"]}
              fontWeight="500"
            >
              {children}
            </Heading>
          </Box>
        </Center>
      ) : (
        <Center w="100%" justifyContent="flex-end" gap="1rem">
          <Box>
            <Heading
              fontFamily="Arial"
              fontSize={["1rem", "1rem", "1rem", "1.25rem", "1.65rem"]}
              fontWeight="500"
            >
              {children}
            </Heading>
          </Box>
          <Center
            bg={theme.colors.PrimaryBlue}
            w={["30px", "40px", "50px", "60px", "80px"]}
            h={["30px", "40px", "50px", "60px", "80px"]}
            borderRadius="50%"
          >
            <Heading
              color="white"
              fontSize={["1rem", "1rem", "1.25rem", "1.5rem", "1.5rem"]}
            >
              {order}.
            </Heading>
          </Center>
        </Center>
      )}
      {/* <Center w="100%" gap="1rem" justifyContent="flex-end">
          <Box>
            <Heading
              fontFamily="Arial"
              fontSize={["1rem", "1rem", "1.25rem", "1.25rem", "1.5rem"]}
              fontWeight="500"
            >
              {children}
            </Heading>
          </Box>
          <Center
            bg={theme.colors.PrimaryBlue}
            w={["30px", "40px", "50px", "60px", "70px"]}
            h={["30px", "40px", "50px", "60px", "70px"]}
            borderRadius="50%"
          >
            <Heading
              color="white"
              fontSize={["1rem", "1.25rem", "1.25rem", "1.25rem", "1.25rem"]}
            >
              {order}.
            </Heading>
          </Center>
        </Center> */}
      {/* )} */}
    </Flex>
  );
};
export default List;
