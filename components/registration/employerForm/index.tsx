import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { Field, Formik, Form } from "formik";
import React from "react";
// import InputFieldComponent from './field'

type InitialValues = {
  nameOfDao: string;
  discordServerExists: string;
  discordLink: string;
  discordPopulation: string;
  twitterUrl: string;
  daoGoals: string;
  briefDescription: string;
};
const EmployerForm = ({ user }) => {
  const initValues: InitialValues = {
    nameOfDao: "",
    discordServerExists: "",
    discordLink: "",
    discordPopulation: "",
    twitterUrl: "",
    daoGoals: "",
    briefDescription: "",
  };
  return (
    <Box fontFamily="Arial" w={["87.5vw", "80vw", "60vw", "40vw", "20vw"]}>
      <Heading
        mb="1rem"
        fontFamily="Arial"
        textAlign="center"
        fontWeight="bold"
      >
        Register your DAO!
      </Heading>
      <Formik
        initialValues={initValues}
        validate={(values) => {
          const errors = {};
          // TODO:TODO:TODO:TODO:
          Object.entries(values).forEach((val) => {
            if (!values[val[0]]) errors[val[0]] = "Required";
          });
          if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.twitterUrl))
            errors["twitterUrl"] = "Invalid URL";
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          console.log("OHYA BABY WE GOT IT WORKING");
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Enter the name of your dao</FormLabel>
              <Input
                placeholder="Ex. Olympus DAO"
                outline="1px solid gray"
                _focus={{ bg: "white" }}
                name="nameOfDao"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nameOfDao}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel mt="1.5rem">
                Does your DAO have a discord server yet?
              </FormLabel>
              <RadioGroup
                value={values.discordServerExists}
                onChange={(event: string) => {
                  setFieldValue("discordServerExists", event);
                }}
              >
                <Stack spacing={5} direction="row">
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel mt="1.5rem">
                If answered yes above, please enter the discord link. Otherwise,
                write 'N/A'
              </FormLabel>
              <Input
                outline="1px solid gray"
                _focus={{ bg: "white" }}
                placeholder="Ex. https://discord.gg/12345"
                type="text"
                name="discordLink"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.discordLink}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel mt="1.5rem">
                Please enter approximate number of members in the discord server
                and 'N/A' otherwise
              </FormLabel>
              <Input
                outline="1px solid gray"
                _focus={{ bg: "white" }}
                placeholder="Ex. 1000"
                type="text"
                name="discordPopulation"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.discordPopulation}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel mt="1.5rem">
                Please enter Twitter URL and 'N/A' otherwise
              </FormLabel>
              <Input
                outline="1px solid gray"
                _focus={{ bg: "white" }}
                placeholder="Ex. https://twitter.com/OlympusDAO"
                type="text"
                name="twitterUrl"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.twitterUrl}
              />
              {touched.twitterUrl && (
                <Text color="red">{errors.twitterUrl}</Text>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel mt="1.5rem">What is the goal of your DAO?</FormLabel>

              <Textarea
                outline="1px solid gray"
                _focus={{ bg: "white" }}
                type="text"
                name="daoGoals"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.daoGoals}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel mt="1.5rem">
                Give a brief general description of your DAO for job seekers to
                read{" "}
              </FormLabel>
              <Textarea
                outline="1px solid gray"
                _focus={{ bg: "white" }}
                type="text"
                name="briefDescription"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.briefDescription}
              />
            </FormControl>

            <Button
              mt="1rem"
              float="right"
              colorScheme="linkedin"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default EmployerForm;
