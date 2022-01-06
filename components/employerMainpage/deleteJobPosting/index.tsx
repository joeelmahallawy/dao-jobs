import { JobPosting } from '.prisma/client'
import { useDisclosure } from '@chakra-ui/hooks'
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast,
} from '@chakra-ui/react'
import { gql } from 'apollo-server-micro'
import request from 'graphql-request'
import React from 'react'
import deleteJobPosting from '../../../helpers/graphql/mutations/deleteJobPosting'

const DeleteJobPosting = ({ closeModal, currentPosting, jobs, setJobs }) => {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen} colorScheme="red">
                Delete job
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent fontFamily="Arial">
                    <ModalHeader>
                        Are you sure you want to delete this job posting?
                    </ModalHeader>

                    <ModalFooter>
                        <Button
                            colorScheme="red"
                            mr={3}
                            _focus={{}}
                            onClick={onClose}
                        >
                            Close
                        </Button>
                        <Button
                            onClick={() => {
                                jobs.forEach((el, i) => {
                                    if (el.id == currentPosting.id) {
                                        jobs.splice(i, 1)
                                        setJobs([...jobs])
                                    }
                                })

                                deleteJobPosting(
                                    Number(currentPosting.id),
                                    toast,
                                )
                                closeModal()
                            }}
                        >
                            Continue
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default DeleteJobPosting
