import { useDisclosure } from '@chakra-ui/hooks'
import {
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Radio,
    RadioGroup,
    Stack,
    Textarea,
    useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import addJobPosting from '../../../helpers/graphql/mutations/addJobPosting'
import { AuthUser } from '../../../interfaces'
import { Dao, JobPostingInputValues } from '../../../utils/types'

const AddJobPostingModal = ({
    dao,
    setJobs,
    jobs,
    user,
}: {
    dao: Dao
    setJobs: Function
    jobs: any[]
    user: AuthUser
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef()
    const inputInitialValues = {
        jobTitle: '',
        jobDescription: '',
        tokenExists: true,
        tokenSymbol: '',
        tokenPrice: 0.1,
        tokenAddress: '',
        currencyOfCompensation: '',
        approximateSalary: '',
        salaryNegotiable: true,
    }
    const [inputValues, setInputValues] =
        useState<JobPostingInputValues>(inputInitialValues)
    const [showSubmittingButton, setShowSubmittingButton] = useState(false)
    const toast = useToast()

    return (
        <>
            <Center
                justifyContent="space-between"
                onClick={() => {
                    setInputValues({ ...inputInitialValues })
                    onOpen()
                }}
                // bg="gray.300"
                outline="2px solid gray"
                borderRadius={5}
                mt="1.5rem"
                _hover={{ outline: '3px solid gray', cursor: 'pointer' }}
                p={[5, 7, 9]}
                w={['100%', '100%', '80%', '70%', '70%', '60%']}
                fontFamily="Arial"
            >
                <Heading
                    fontFamily="Arial"
                    fontSize={['1rem', '1.25rem', '1.5rem', '1.75rem', '2rem']}
                >
                    Add new position
                </Heading>
                <Button colorScheme="linkedin">Add job</Button>
            </Center>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent fontFamily="Arial">
                    <ModalHeader>Create job posting</ModalHeader>
                    <ModalCloseButton />

                    <form
                        onSubmit={async (e) => {
                            e.preventDefault()

                            setShowSubmittingButton(true)
                            return addJobPosting(
                                inputValues,
                                dao,
                                toast,
                                onClose,
                                setShowSubmittingButton,
                                setJobs,
                                jobs,
                                user,
                            )
                        }}
                    >
                        <ModalBody pb={6}>
                            <FormControl isRequired>
                                <FormLabel>Job title</FormLabel>
                                <Input
                                    placeholder="e.g. Solidity developer"
                                    onChange={(e) =>
                                        setInputValues({
                                            ...inputValues,
                                            jobTitle: e.currentTarget.value,
                                        })
                                    }
                                />
                            </FormControl>
                            <FormControl mt={4} isRequired>
                                <FormLabel>Job description</FormLabel>
                                <Textarea
                                    onChange={(e) =>
                                        setInputValues({
                                            ...inputValues,
                                            jobDescription:
                                                e.currentTarget.value,
                                        })
                                    }
                                    placeholder={`e.g. Contribute to building DAO dApps in a team with 3 other developers`}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Token already exists</FormLabel>
                                <RadioGroup
                                    defaultValue="yes"
                                    onChange={(e) => {
                                        if (e == 'yes') {
                                            setInputValues({
                                                ...inputValues,
                                                tokenExists: true,
                                            })
                                        } else {
                                            setInputValues({
                                                ...inputValues,
                                                tokenExists: false,
                                            })
                                        }
                                    }}
                                >
                                    <Stack direction="row">
                                        <Radio value="yes">Yes</Radio>
                                        <Radio value="no">No</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            {inputValues.tokenExists && (
                                <>
                                    <FormControl mt={4} isRequired>
                                        <FormLabel>Token symbol</FormLabel>
                                        <Input
                                            placeholder={`e.g.  FUD`}
                                            onChange={(e) =>
                                                setInputValues({
                                                    ...inputValues,
                                                    tokenSymbol:
                                                        e.currentTarget.value,
                                                })
                                            }
                                        />
                                    </FormControl>
                                    <FormControl isRequired mt={4}>
                                        <FormLabel htmlFor="token-price">
                                            Token price (USD)
                                        </FormLabel>
                                        <NumberInput min={0}>
                                            <InputGroup size="sm">
                                                <InputLeftAddon children="$" />
                                                <NumberInputField
                                                    value={0}
                                                    onChange={(e) =>
                                                        // parseFloat(n.toFixed(4))
                                                        setInputValues({
                                                            ...inputValues,
                                                            tokenPrice:
                                                                parseFloat(
                                                                    e
                                                                        .currentTarget
                                                                        .value,
                                                                ),
                                                        })
                                                    }
                                                    id="token-price"
                                                    placeholder="1.00"
                                                />
                                            </InputGroup>
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                    <FormControl isRequired mt={4}>
                                        <FormLabel>Token address</FormLabel>
                                        <Input
                                            placeholder="0x321162Cd933E2Be498Cd2267a90534A804051b11"
                                            onChange={(e) =>
                                                setInputValues({
                                                    ...inputValues,
                                                    tokenAddress:
                                                        e.currentTarget.value,
                                                })
                                            }
                                        />
                                    </FormControl>
                                </>
                            )}
                            <FormControl isRequired mt={4}>
                                <FormLabel>Currency of compensation</FormLabel>
                                <Input
                                    placeholder="e.g.  FUD token"
                                    onChange={(e) =>
                                        setInputValues({
                                            ...inputValues,
                                            currencyOfCompensation:
                                                e.currentTarget.value,
                                        })
                                    }
                                />
                            </FormControl>
                            <FormControl isRequired mt={4}>
                                <FormLabel>Approximate salary</FormLabel>
                                <Input
                                    onChange={(e) =>
                                        setInputValues({
                                            ...inputValues,
                                            approximateSalary:
                                                e.currentTarget.value,
                                        })
                                    }
                                    placeholder={`e.g. 0.5% of total FUD token supply`}
                                />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Is salary negotiable?</FormLabel>
                                <RadioGroup
                                    defaultValue="yes"
                                    onChange={(e) => {
                                        if (e == 'yes')
                                            setInputValues({
                                                ...inputValues,
                                                salaryNegotiable: true,
                                            })
                                        else
                                            setInputValues({
                                                ...inputValues,
                                                salaryNegotiable: false,
                                            })
                                    }}
                                >
                                    <Stack direction="row">
                                        <Radio value="yes">Yes</Radio>
                                        <Radio value="no">No</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                onClick={() => {
                                    setShowSubmittingButton(false)
                                    onClose()
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                isLoading={showSubmittingButton}
                                type="submit"
                                onSubmit={() => setShowSubmittingButton(true)}
                                colorScheme="linkedin"
                                ml={3}
                            >
                                Add
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}
export default AddJobPostingModal
