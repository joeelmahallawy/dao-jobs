import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Text,
    Flex,
    Heading,
} from '@chakra-ui/react'
import request, { gql } from 'graphql-request'
import React, { useEffect, useState } from 'react'
import getEmployerForCurrentJob from '../../../helpers/graphql/queries/getEmployerFromJob'
import { Dao, JobPostingValues } from '../../../utils/types'

const JobPostingModal = ({
    job,
    employer,
}: {
    job: JobPostingValues
    employer: any
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex
            onClick={onOpen}
            borderRadius={5}
            _hover={{ outline: '1px solid gray', cursor: 'pointer' }}
            fontFamily="Arial"
            w={['90%', '80%', '70%', '70%', '70%', '60%']}
            p={5}
            bg="gray.200"
            mt={10}
            justifyContent="space-between"
        >
            <Heading fontFamily="Arial" fontSize="2rem">
                {job.jobTitle}
            </Heading>
            <Button>Check out job</Button>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <Flex justifyContent="space-between" p={3}>
                        <ModalHeader>{job.jobTitle}</ModalHeader>
                        {/* get employer who posted it */}
                    </Flex>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight="bold" mb="1rem">
                            You can scroll the content behind the modal
                        </Text>
                        HERE"S SOME MORE TEXT
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}
export default JobPostingModal
