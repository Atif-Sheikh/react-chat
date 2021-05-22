/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalFooter,
    Button,
} from "@chakra-ui/react";
import firebase from 'firebase/app';

import './groupParticipant.css';

const GroupParticipantsModal = ({ isOpen, handleModalClose, roomID, topic, fetchCloseDiscussion }) => {

    const closeRoomDiscussion = async () => {
        await firebase.database().ref(`/groupMessages/${roomID}/${topic}/`).update({ closed: true });
        fetchCloseDiscussion();
        handleModalClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleModalClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Are you sure?</ModalHeader>
                <ModalCloseButton />
                <ModalFooter>
                    <Button onClick={closeRoomDiscussion} colorScheme="blue" mr={3}>
                        Yes
                    </Button>
                    <Button onClick={handleModalClose}>
                        No
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default GroupParticipantsModal;
