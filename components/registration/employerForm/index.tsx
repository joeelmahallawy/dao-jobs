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
} from '@chakra-ui/react'
import { Field, Formik, Form } from 'formik'
import React, { useState } from 'react'
import { request, gql } from 'graphql-request'
import Fade from 'react-reveal/Fade'
import { theme } from '../../../utils/theme'
import { useRouter } from 'next/router'

type InitialValues = {
    nameOfDao: string
    discordServerExists: boolean
    discordLink: string
    discordPopulation: string
    twitterUrl: string
    daoGoals: string
    briefDescription: string
}
const EmployerForm = ({ user }) => {
    console.log('user', user)
    const router = useRouter()
    const [navigateToEmployerPage, setNavigateToEmployerPage] = useState(false)
    const toast = useToast()
    const initValues: InitialValues = {
        nameOfDao: '',
        discordServerExists: undefined,
        discordLink: '',
        discordPopulation: '',
        twitterUrl: '',
        daoGoals: '',
        briefDescription: '',
    }

    const [step, setStep] = React.useState<number>(1)

    if (navigateToEmployerPage) {
        router.push('/employerMain')
    }

    // yusss
    // i think it will be an object yuhh lmao
    const [selectedFile, setSelectedFile] = useState<any>() // so lets keep any for now

    const Step1 = ({ handleChange, touched, handleBlur, value }: any) => {
        return (
            <Fade bottom big>
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
                        value={value}
                    />
                </FormControl>

                <Flex mt="1rem" justifyContent="flex-end">
                    <Button
                        // isDisabled={!touched.nameOfDao}
                        mt="1rem"
                        colorScheme="linkedin"
                        type="button"
                        onClick={() => setStep(2)}
                    >
                        Next
                    </Button>
                </Flex>
            </Fade>
        )
    }

    const Step2 = ({
        handleChange,
        touched,
        handleBlur,
        value,
        setFieldValue,
    }: any) => {
        return (
            <Fade bottom big>
                <FormControl isRequired>
                    <FormLabel mt="1.5rem">
                        Does your DAO have a discord server yet?
                    </FormLabel>
                    <RadioGroup
                        value={value}
                        onChange={(event) => {
                            // console.log(typeof Boolean(event))
                            if (event == 'true')
                                setFieldValue('discordServerExists', true)
                            else setFieldValue('discordServerExists', false)
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
                <Flex mt="1rem" justifyContent="space-between">
                    <Button
                        mt="1rem"
                        colorScheme="gray"
                        type="button"
                        onClick={() => setStep(1)}
                    >
                        Back
                    </Button>
                    <Button
                        mt="1rem"
                        colorScheme="linkedin"
                        type="button"
                        onClick={() => setStep(3)}
                    >
                        Next
                    </Button>
                </Flex>
            </Fade>
        )
    }

    const Step3 = ({ handleChange, touched, handleBlur, value }: any) => {
        return (
            <Fade bottom big>
                <FormControl isRequired>
                    <FormLabel mt="1.5rem">
                        If answered yes above, please enter the discord link.
                        Otherwise, write 'N/A'
                    </FormLabel>
                    <Input
                        outline="1px solid gray"
                        _focus={{ bg: 'white' }}
                        placeholder="Ex. https://discord.gg/12345"
                        type="text"
                        name="discordLink"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={value}
                    />
                </FormControl>
                <Flex mt="1rem" justifyContent="space-between">
                    <Button
                        mt="1rem"
                        colorScheme="gray"
                        type="button"
                        onClick={() => setStep(2)}
                    >
                        Back
                    </Button>
                    <Button
                        mt="1rem"
                        // isDisabled={!touched.discordLink}
                        colorScheme="linkedin"
                        type="button"
                        onClick={() => setStep(4)}
                    >
                        Next
                    </Button>
                </Flex>
            </Fade>
        )
    }

    const Step4 = ({ handleChange, touched, handleBlur, value }: any) => {
        return (
            <Fade bottom big>
                <FormControl isRequired>
                    <FormLabel mt="1.5rem">
                        Please enter approximate number of members in the
                        discord server and 'N/A' otherwise
                    </FormLabel>
                    <Input
                        outline="1px solid gray"
                        _focus={{ bg: 'white' }}
                        placeholder="Ex. 1000"
                        type="text"
                        name="discordPopulation"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={value}
                    />
                </FormControl>
                <Flex mt="1rem" justifyContent="space-between">
                    <Button
                        mt="1rem"
                        colorScheme="gray"
                        type="button"
                        onClick={() => setStep(3)}
                    >
                        Back
                    </Button>
                    <Button
                        mt="1rem"
                        // isDisabled={!touched.discordPopulation}
                        colorScheme="linkedin"
                        type="button"
                        onClick={() => setStep(5)}
                    >
                        Next
                    </Button>
                </Flex>
            </Fade>
        )
    }

    const Step5 = ({
        handleChange,
        touched,
        handleBlur,
        value,
        errors,
    }: any) => {
        return (
            <Fade bottom big>
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
                        value={value}
                    />

                    {touched.twitterUrl && (
                        <Text color="red">{errors.twitterUrl}</Text>
                    )}
                </FormControl>
                <Flex mt="1rem" justifyContent="space-between">
                    <Button
                        mt="1rem"
                        colorScheme="gray"
                        type="button"
                        onClick={() => setStep(4)}
                    >
                        Back
                    </Button>

                    <Button
                        mt="1rem"
                        colorScheme="linkedin"
                        type="button"
                        onClick={() => setStep(6)}
                    >
                        Next
                    </Button>
                </Flex>
            </Fade>
        )
    }
    const Step6 = ({ handleChange, handleBlur, value, errors }: any) => {
        return (
            <Fade bottom big>
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
                        value={value}
                    />
                </FormControl>
                <Flex mt="1rem" justifyContent="space-between">
                    <Button
                        mt="1rem"
                        colorScheme="gray"
                        type="button"
                        onClick={() => setStep(5)}
                    >
                        Back
                    </Button>
                    <Button
                        mt="1rem"
                        // isDisabled={!touched.daoGoals}
                        colorScheme="linkedin"
                        type="button"
                        onClick={() => setStep(7)}
                    >
                        Next
                    </Button>
                </Flex>
            </Fade>
        )
    }

    const Step7 = ({
        touched,
        handleChange,
        handleBlur,
        value,
        errors,
    }: any) => {
        return (
            <Fade bottom big>
                <FormControl isRequired>
                    <FormLabel mt="1.5rem">
                        Give a brief general description of your DAO for job
                        seekers to read{' '}
                    </FormLabel>
                    <Textarea
                        outline="1px solid gray"
                        _focus={{ bg: 'white' }}
                        type="text"
                        name="briefDescription"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={value}
                    />
                </FormControl>
                <Flex justifyContent="space-between" mt="1rem">
                    <Button
                        mt="1rem"
                        colorScheme="gray"
                        type="button"
                        onClick={() => setStep(6)}
                    >
                        Back
                    </Button>
                    <Button
                        mt="1rem"
                        // isDisabled={!touched.briefDescription}
                        colorScheme="linkedin"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Flex>
            </Fade>
        )
    }

    return (
        <Box p={3} fontFamily="Arial">
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
                    console.log(values)
                    const errors = {}
                    Object.entries(values).forEach((val) => {
                        if (values[val[0]] == '' || values[val[0]] == undefined)
                            errors[val[0]] = 'Required'
                    })
                    if (
                        !/^(ftp|http|https):\/\/[^ "]+$/.test(values.twitterUrl)
                    )
                        errors['twitterUrl'] = 'Invalid URL'
                    return errors
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    const mutationDao = gql`
                        mutation createDao(
                            $DAODATA: DaoInput!
                            $EMPLOYERID: String!
                        ) {
                            addDao(daoData: $DAODATA, employerID: $EMPLOYERID) {
                                twitterUrl
                            }
                        }
                    `
                    const mutationEmployer = gql`
                        mutation createEmployer($EMPLOYERDATA: EmployerInput!) {
                            addEmployer(employerData: $EMPLOYERDATA) {
                                id
                            }
                        }
                    `
                    const daoMutationVariables = {
                        EMPLOYERID: user.sub,
                        DAODATA: { ...values },
                    }
                    const employerMutationVariables = {
                        EMPLOYERDATA: {
                            profilePicURL: user.avatar_url,
                            discordUsername: user.full_name,
                            id: user.sub,
                        },
                    }

                    const addEmployer = await request(
                        'http://localhost:3000/api/graphql',
                        mutationEmployer,
                        employerMutationVariables,
                    )
                        .then(async () => {
                            const addDao = await request(
                                'http://localhost:3000/api/graphql',
                                mutationDao,
                                daoMutationVariables,
                            )
                            if (!addDao)
                                throw new Error('Could not post DAO data')
                        })
                        .then(() => {
                            setTimeout(() => {
                                setNavigateToEmployerPage(true)
                            }, 2000)
                            return toast({
                                containerStyle: {
                                    fontFamily: 'Arial',
                                    padding: '1rem',
                                },
                                title: 'DAO registered.',
                                description:
                                    'You have successfully registered your DAO!',
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                            })
                            // }
                        })
                        .catch((err) => {
                            alert(err.message)
                        })
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
                        {step === 1 && (
                            <Step1
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values.nameOfDao}
                                touched={touched}
                            />
                        )}
                        {console.log(values)}
                        {step === 2 && (
                            <Step2
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values.discordServerExists}
                                setFieldValue={setFieldValue}
                                touched={touched}
                            />
                        )}

                        {step === 3 && (
                            <Step3
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values.discordLink}
                                touched={touched}
                            />
                        )}

                        {step === 4 && (
                            <Step4
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values.discordPopulation}
                                touched={touched}
                            />
                        )}

                        {step === 5 && (
                            <Step5
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values.twitterUrl}
                                touched={touched}
                                errors={errors}
                            />
                        )}

                        {step === 6 && (
                            <Step6
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values.daoGoals}
                                errors={errors}
                                touched={touched}
                            />
                        )}
                        {console.log('errorss:', errors)}
                        {step === 7 && (
                            <Step7
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values.briefDescription}
                                touched={touched}
                            />
                        )}
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
export default EmployerForm
