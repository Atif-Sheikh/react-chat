/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Avatar } from "@chakra-ui/react";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { Divider } from "@chakra-ui/react";
import { AiFillFolder, AiFillFile } from 'react-icons/ai';
import { RiFolderShieldFill, RiMovieFill } from 'react-icons/ri';
import { BsThreeDotsVertical, BsImageFill, BsFiles } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import {
    useParams,
} from "react-router-dom";

import FileThumbnail from '../FileThumbnail/fileThumbnail';
import FileList from '../FileList/fileList';
import './groupProfile.css';

const GroupProfileSection = () => {
    const [groupDetails, setGroupsDetails] = useState(null);
    const isRightPanelOpen = useSelector(state => state.dashboard.rightPanelOpen);
    const dispatch = useDispatch();
    const { roomID } = useParams();

    const handleSideDrawer = (bool) => {
        dispatch({ type: "RIGHT_PANEL", payload: bool });
    };

    useEffect(() => {
        fetchGroupDetails();
    }, [roomID]);

    const fetchGroupDetails = async () => {
        const group = await (await firebase.database().ref(`/groups/${roomID}`).once('value')).val();

        if (group) {
            let groupCopied = JSON.parse(JSON.stringify(group));
            groupCopied.members = Object.values(groupCopied.members);
            setGroupsDetails(groupCopied);
        }
    };

    return (
        <div className="profileContainer">
            <div className="leftChevContainer">
                <div className="chevRightIcon" onClick={() => handleSideDrawer(!isRightPanelOpen)}>
                    {
                        isRightPanelOpen
                            ?
                            <BiChevronRight />
                            :
                            <BiChevronLeft />
                    }
                </div>
                {
                    isRightPanelOpen ?
                        <div className="chatHeading">
                            Shared files
                    </div>
                        :
                        null
                }
            </div>
            {
                isRightPanelOpen
                    ?
                    <>
                        <Divider className="chatHeaderDivider" orientation="horizontal" />
                        <Avatar name="Dan Abrahmov" size="lg" src={"https://e7.pngegg.com/pngimages/447/166/png-clipart-house-real-estate-property-bank-house-building-grass.png"} />
                        <p className="groupName">
                            {groupDetails?.groupName}
                    </p>
                        <div className="membersCount">
                            {groupDetails?.members.length || 0} Members
                    </div>
                        <div className="filesCollage">
                            <FileThumbnail Icon={<AiFillFolder size={25} color="#00AE94" />} title="All files" count="231" color="#E3F6F4" textColor="#00AE94" />
                            <FileThumbnail Icon={<RiFolderShieldFill size={25} color="#DBE0E6" />} title="All links" count="45" color="#F7F9FB" textColor="#DBE0E6" />
                        </div>
                        <div className="fileTypeSection">
                            <div className="fileType">
                                File type
                        </div>
                            <BsThreeDotsVertical className="verticalDots" />
                        </div>
                        <FileList fileBackground="#E3E5FA" Icon={<AiFillFile color="#6573E3" />} title="Documents" description="126 files, 193MB" />
                        <FileList fileBackground="#F4EDD5" Icon={<BsImageFill color="#CBB983" />} title="Photos" description="53 files, 321MB" />
                        <FileList fileBackground="#E9F8FA" Icon={<RiMovieFill color="#51B8C2" />} title="Movies" description="3 files, 210MB" />
                        <FileList fileBackground="#FFE4DE" Icon={<BsFiles color="#C46E5B" />} title="Other" description="49 files, 194MB" />
                    </>
                    :
                    null
            }
        </div>
    )
}

export default GroupProfileSection;
