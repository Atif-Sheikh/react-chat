import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast,
} from "@chakra-ui/react";
import firebase from 'firebase/app';

import InputField from '../inputField/inputField';
import GroupTopicsInput from '../GroupTopicsInput/groupTopicsInput';

import './addGroup.css';

const AddGroup = ({ isOpen, handleModalClose }) => {
    const [groupName, setGroupName] = useState('');
    const [topics, setTopics] = useState([]);
    const [currentTopic, setCurrentTopic] = useState('');
    const toast = useToast();
    const currentUser = firebase.auth().currentUser; //useSelector(state => state.user);

    const addGroup = async () => {
        if (groupName.trim() && topics.length) {
            await firebase.database().ref(`/groups/${groupName}`).set({
                groupName: groupName.trim(),
                topics,
                creatorID: currentUser.uid,
                creatorName: currentUser.displayName || 'New User',
            });
            handleModalClose();
            toast({
                position: "top",
                title: "Group added",
                description: `${groupName} has been created.`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                position: "top",
                title: "Invalid details",
                description: "Please enter all details correctly.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleModalClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add New Group</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <InputField textFieldClass="addLabelTextField" labelClass="addGroupLabel" onChangeHandler={({ target: { value } }) => setGroupName(value)} value={groupName} type="text" label="Group Name" />
                    <GroupTopicsInput topics={topics} handleChange={(_tag) => setCurrentTopic(_tag)} currentTopic={currentTopic} handleChangeInput={(_tags) => setTopics(_tags)} />

                    <Button onClick={addGroup} width="100%" mt={5} isLoading={false} colorScheme="blue">Add Group</Button>

                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    )
}

export default AddGroup;
