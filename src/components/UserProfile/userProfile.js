import React from 'react';
import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { BsChevronDown } from 'react-icons/bs';
import { useSelector } from 'react-redux';

import './userProfile.css';

const UserProfile = () => {
    const { user } = useSelector(state => state.user);

    return (
        <div className="profileContainer">
            <Avatar name="Dan Abrahmov" size="lg" src={user?.img ? user?.img : "https://bit.ly/dan-abramov"}>
                <AvatarBadge boxSize="20px" bg="green.500" />
            </Avatar>
            <p className="userProfileName">
                { user?.name }
            </p>
            <div className="userStatus">
                <span>available</span>
                <BsChevronDown />
            </div>
        </div>
    )
}

export default UserProfile;
