/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    SimpleGrid,
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

                    <SimpleGrid className="memberItem" columns={2} spacing={5}>
                        {
                            participants?.map((member, ind) => (
                                <div key={ind.toString()} className="userCard">
                                    <img className="userImage" src={member.img ? member.img : dummyIcon} alt={member.memberName} />
                                    <p className="userName">{member.memberName}</p>
                                </div>
                            ))
                        }
                    </SimpleGrid>

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default GroupParticipantsModal;
