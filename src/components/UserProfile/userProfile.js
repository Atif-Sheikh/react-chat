import React from 'react';
import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { BsChevronDown } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { BiChevronLeft } from 'react-icons/bi';
import { Divider } from "@chakra-ui/react";
import { AiTwotoneSetting } from 'react-icons/ai';

import './userProfile.css';

const UserProfile = () => {
    const { user } = useSelector(state => state.user);

    return (
        <div className="profileContainer">
            <div className="leftChevContainer">
                <div className="chevRightIcon">
                    <BiChevronLeft />
                </div>
                <div className="chatHeading">
                    Chat
                </div>
            </div>
            <Divider className="chatHeaderDivider" orientation="horizontal" />
            <div>
                <AiTwotoneSetting className="profileSettingsIcon" />
                <Avatar name="Dan Abrahmov" size="lg" src={user?.img ? user?.img : "https://bit.ly/dan-abramov"}>
                    <AvatarBadge boxSize="20px" bg="green.500" />
                </Avatar>
            </div>
            <p className="userProfileName">
                {user?.name}
            </p>
            <div className="userStatus">
                <span>available</span>
                <BsChevronDown />
            </div>
        </div>
    )
}

export default UserProfile;
