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
import { useSelector } from 'react-redux';

import InputField from '../inputField/inputField';
import GroupTopicsInput from '../GroupTopicsInput/groupTopicsInput';

import './addGroup.css';

const AddGroup = ({ isOpen, handleModalClose }) => {
    const [groupName, setGroupName] = useState('');
    const [topics, setTopics] = useState([]);
    const [currentTopic, setCurrentTopic] = useState('');
    const toast = useToast();
    const currentUser = useSelector(state => state.user.user);

    const addGroup = async () => {
        let allGroups = await firebase.database().ref(`/groups`).once('value');
        let groupNames = allGroups.val() ? Object.keys(allGroups.val()).map(name => name.toLowerCase()) : [];
        if (groupNames.includes(groupName.trim().toLowerCase())) {
            toast({
                position: "top",
                title: "Invalid group name",
                description: "Group name already exist.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        if (groupName.trim() && topics.length) {
            await firebase.database().ref(`/groups/${groupName}`).set({
                groupName: groupName.trim(),
                topics,
                creatorID: currentUser.uid,
                creatorName: currentUser.displayName || 'New User',
            });
            await firebase.database().ref(`/groups/${groupName}/members/${currentUser.uid}`).set({
                memberName: currentUser.displayName || 'New User',
                uid: currentUser.uid,
                img: currentUser?.img,
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
