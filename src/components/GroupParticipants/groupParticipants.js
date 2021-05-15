/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Flex,
    Box,
    Avatar,
    Text,
} from "@chakra-ui/react";
import firebase from 'firebase/app';

import './groupParticipant.css';

const dummyIcon = "https://bit.ly/sage-adebayo";

const GroupParticipantsModal = ({ isOpen, handleModalClose, roomID }) => {
    const [participants, setparticipants] = useState(null);

    useEffect(() => {
        getParticipants();
    }, [roomID]);

    const getParticipants = async () => {
        let dbData = await firebase.database().ref(`/groups/${roomID}`).once('value');
        let members = dbData.val() ? Object.values(dbData.val().members) : [];

        setparticipants(members);
    };

    return (
        <Modal isOpen={isOpen} onClose={handleModalClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Participant</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    {
                        participants?.map((participant, ind) => (
                            <div key={ind.toString()} className="memberItem">
                                <Flex>
                                    <Avatar src={participant?.img ? participant?.img : dummyIcon} />
                                    <Box ml="3">
                                        <Text fontWeight="bold">
                                            {participant?.memberName}
                                        </Text>
                                        {/* <Text fontSize="sm">UI Engineer</Text> */}
                                    </Box>
                                </Flex>
                            </div>
                        ))
                    }

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default GroupParticipantsModal;
