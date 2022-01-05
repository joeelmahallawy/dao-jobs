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
    Image,
    Flex,
    useToast,
    NumberInput,
    NumberInputField,
} from '@chakra-ui/react'
import { Field, Formik, Form } from 'formik'
import React, { useEffect, useState } from 'react'
import Fade from 'react-reveal/Fade'
import { theme } from '../../../utils/theme'
import { useRouter } from 'next/router'
import { supabase } from '../../../lib/supabase'
import addDaoAndEmployer from '../../../helpers/graphql/mutations/addDaoAndEmployer'

type InitialValues = {
    nameOfDao: string
    discordServerExists: boolean
    discordLink: string
    discordPopulation: number
    twitterUrl: string
    daoGoals: string
    briefDescription: string
}
const EmployerForm = ({ user }) => {
    const router = useRouter()
    const [navigateToEmployerPage, setNavigateToEmployerPage] = useState(false)
    const toast = useToast()
    const initValues: InitialValues = {
        nameOfDao: '',
        discordServerExists: undefined,
        discordLink: '',
        discordPopulation: 0,
        twitterUrl: '',
        daoGoals: '',
        briefDescription: '',
    }

    if (navigateToEmployerPage) {
        router.push('/employerMain')
    }
    const [dp, setdp] = useState({
        file: '',
        imagePreviewUrl:
            'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true',
        active: 'edit',
    })
    function photoUpload(event, setProfilePic) {
        event.preventDefault()
        const reader = new FileReader()
        const file = event.target.files[0]
        reader.onloadend = () => {
            setProfilePic({
                file,
                imagePreviewUrl: reader.result,
            })
        }
        reader.readAsDataURL(file)
    }

    return (
        <Box
            overflow="scroll"
            p={7}
            fontFamily="Arial"
            outline="1px solid black"
            borderRadius={10}
        >
            <Heading
                mb="1rem"
                fontSize="3rem"
                fontFamily="Arial"
                textAlign="center"
                fontWeight="bold"
            >
                Register your{' '}
                <span style={{ color: theme.colors.PrimaryBlue }}>DAO!</span>{' '}
            </Heading>
            <Formik
                initialValues={initValues}
                validate={(values) => {
                    const errors = {}
                    Object.entries(values).forEach((val) => {
                        if (
                            values[val[0]] === '' ||
                            values[val[0]] === undefined
                        )
                            errors[val[0]] = 'Required'
                    })

                    if (
                        !/^(ftp|http|https):\/\/[^ "]+$/.test(values.twitterUrl)
                    )
                        errors['twitterUrl'] = 'Invalid URL'
                    console.log(errors)
                    return errors
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    await supabase.storage
                        .from('dao-images')
                        .upload(`daos/${user.sub}.png`, dp.file, {
                            cacheControl: '3600',
                            upsert: false,
                            contentType: 'image/png',
                        })
                    addDaoAndEmployer(
                        user,
                        values,
                        setNavigateToEmployerPage,
                        toast,
                    )
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
                    <Form
                        onSubmit={(e) => {
                            // if there are errors
                            if (Object.keys(errors).length !== 0)
                                alert('Please fill out all required fields!')

                            handleSubmit(e)
                        }}
                        encType="multipart/form-data"
                    >
                        <FormControl isRequired>
                            <FormLabel>Enter the name of your dao</FormLabel>
                            <Input
                                placeholder="Ex. Olympus DAO"
                                outline="1px solid gray"
                                _focus={{ bg: 'white' }}
                                name="nameOfDao" //aight cool yup ok
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.nameOfDao}
                            />
                        </FormControl>
                        <Flex mt="1rem" justifyContent="flex-end"></Flex>
                        <FormControl isRequired>
                            <FormLabel mt="1.5rem">
                                Does your DAO have a discord server yet?
                            </FormLabel>
                            <RadioGroup
                                // @ts-expect-error
                                value={values.discordServerExists}
                                onChange={(event) => {
                                    if (event == 'true')
                                        setFieldValue(
                                            'discordServerExists',
                                            true,
                                        )
                                    else
                                        setFieldValue(
                                            'discordServerExists',
                                            false,
                                        )
                                }}
                            >
                                <Stack spacing={5} direction="row">
                                    {/* @ts-expect-error */}
                                    <Radio value={true}>Yes</Radio>
                                    {/* @ts-expect-error */}
                                    <Radio value={false}>No</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                        <Flex mt="1rem" justifyContent="space-between"></Flex>
                        <FormControl isRequired>
                            <FormLabel mt="1.5rem">
                                If answered yes above, please enter the discord
                                link. Otherwise, write 'N/A'
                            </FormLabel>
                            <Input
                                outline="1px solid gray"
                                _focus={{ bg: 'white' }}
                                placeholder="Ex. https://discord.gg/12345"
                                type="text"
                                name="discordLink"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.discordLink}
                            />
                        </FormControl>
                        <Flex mt="1rem" justifyContent="space-between"></Flex>
                        <FormControl isRequired>
                            <FormLabel mt="1.5rem">
                                Please enter approximate number of members in
                                the discord server and 0 otherwise
                            </FormLabel>
                            <NumberInput
                                min={0}
                                keepWithinRange={false}
                                clampValueOnBlur={false}
                            >
                                <NumberInputField
                                    outline="1px solid gray"
                                    _focus={{ bg: 'white' }}
                                    placeholder="Ex. 1000"
                                    name="discordPopulation"
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                    onBlur={handleBlur}
                                    value={values.discordPopulation}
                                />
                            </NumberInput>
                            {/* <Input
                    /> */}
                        </FormControl>

                        <FormControl isRequired>
                            <Flex flexDir="column" mt={10} textAlign="center">
                                <label>
                                    <FormLabel textAlign="left">
                                        Discord server picture
                                    </FormLabel>
                                    <Image
                                        _hover={{
                                            cursor: 'pointer',
                                            opacity: '0.85',
                                        }}
                                        fit="cover"
                                        borderRadius="50%"
                                        w="10rem"
                                        h="10rem"
                                        m="0 auto"
                                        src={dp.imagePreviewUrl}
                                    />
                                    <input
                                        style={{ display: 'none' }}
                                        type="file"
                                        onChange={(e) => {
                                            handleChange(e)
                                            photoUpload(e, setdp)
                                        }}
                                    />
                                </label>
                            </Flex>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel mt="1.5rem">
                                Please enter Twitter URL and 'N/A' otherwise
                            </FormLabel>
                            <Input
                                outline="1px solid gray"
                                _focus={{ bg: 'white' }}
                                placeholder="Ex. https://twitter.com/OlympusDAO"
                                type="text"
                                name="twitterUrl" // lmaooo dww
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.twitterUrl}
                            />

                            {touched.twitterUrl && (
                                <Text color="red">{errors.twitterUrl}</Text>
                            )}
                        </FormControl>
                        <Flex mt="1rem" justifyContent="space-between"></Flex>
                        <FormControl isRequired>
                            <FormLabel mt="1.5rem">
                                What is the goal of your DAO?
                            </FormLabel>

                            <Textarea
                                outline="1px solid gray"
                                _focus={{ bg: 'white' }}
                                type="text"
                                name="daoGoals"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.daoGoals}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel mt="1.5rem">
                                Give a brief general description of your DAO for
                                job seekers to read{' '}
                            </FormLabel>
                            <Textarea
                                outline="1px solid gray"
                                _focus={{ bg: 'white' }}
                                type="text"
                                name="briefDescription"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.briefDescription}
                            />
                        </FormControl>

                        <Flex justifyContent="flex-end">
                            <Button
                                mt="1rem"
                                colorScheme="linkedin"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
export default EmployerForm
