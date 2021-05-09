import React from 'react';
import { Avatar } from "@chakra-ui/react";
import { BiChevronRight } from 'react-icons/bi';
import { Divider } from "@chakra-ui/react";
import { AiFillFolder } from 'react-icons/ai';
import { RiFolderShieldFill } from 'react-icons/ri';

import FileThumbnail from '../FileThumbnail/fileThumbnail';
import './groupProfile.css';

const GroupProfileSection = () => {

    return (
        <div className="profileContainer">
            <div className="leftChevContainer">
                <div className="chevRightIcon">
                    <BiChevronRight />
                </div>
                <div className="chatHeading">
                    Shared files
                </div>
            </div>
            <Divider className="chatHeaderDivider" orientation="horizontal" />
            <Avatar name="Dan Abrahmov" size="lg" src={"https://e7.pngegg.com/pngimages/447/166/png-clipart-house-real-estate-property-bank-house-building-grass.png"} />
            <p className="groupName">
                Real Estate
            </p>
            <div className="membersCount">
                10 Members
            </div>
            <div className="filesCollage">
                <FileThumbnail Icon={<AiFillFolder size={25} color="#00AE94" />} title="All files" count="231" color="#E3F6F4" textColor="#00AE94" />
                <FileThumbnail Icon={<RiFolderShieldFill size={25} color="#DBE0E6" />} title="All links" count="45" color="#F7F9FB" textColor="#DBE0E6" />
            </div>
        </div>
    )
}

export default GroupProfileSection;
