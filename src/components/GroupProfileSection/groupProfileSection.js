/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    Avatar, Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    SimpleGrid,
} from "@chakra-ui/react";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { Divider } from "@chakra-ui/react";
// import { AiFillFolder, AiFillFile } from 'react-icons/ai';
// import { RiFolderShieldFill, RiMovieFill } from 'react-icons/ri';
// import { BsThreeDotsVertical, BsImageFill, BsFiles } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import {
    useParams,
} from "react-router-dom";

// import FileThumbnail from '../FileThumbnail/fileThumbnail';
// import FileList from '../FileList/fileList';
import './groupProfile.css';
import FirebaseService from 'Utils/firebaseService';

import { groupDetail } from 'Actions'

const dummyIcon = "https://bit.ly/sage-adebayo";
const groupIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRNTZ5wdImOinohfS8KAbiAvzj6ekn87c9Dg&usqp=CAU";

const GroupProfileSection = () => {
    const [groupDetails, setGroupsDetails] = useState(null);
    const isRightPanelOpen = useSelector(state => state.dashboard.rightPanelOpen);
    const dispatch = useDispatch();
    const { roomID } = useParams();

    const handleSideDrawer = (bool) => {
        dispatch({ type: "RIGHT_PANEL", payload: bool });

        dispatch({ type: "SHOW_RIGHT_DRAWER_MOBILE", payload: false });
    };

    useEffect(() => {
        fetchGroupDetails();
    }, [roomID]);

    const fetchGroupDetails = async () => {
        const group = await groupDetail(`/groups/${roomID}`);

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
                        <Avatar name="Dan Abrahmov" size="lg" src={groupIcon} />
                        <p className="groupName">
                            {groupDetails?.groupName}
                        </p>
                        <div className="membersCount">
                            {groupDetails?.members.length || 0} Members
                    </div>
                        {/* <div className="filesCollage">
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
                        <FileList fileBackground="#FFE4DE" Icon={<BsFiles color="#C46E5B" />} title="Other" description="49 files, 194MB" /> */}
                        <Accordion allowToggle>
                            <AccordionItem>
                                <AccordionButton>
                                    <div className="groupMembers">
                                        Group members
                                    </div>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    <SimpleGrid className="simpleGridContainer" columns={2} spacing={5}>
                                        {
                                            groupDetails?.members.map((member, ind) => (
                                                <div key={ind.toString()} className="userCard">
                                                    <img className="userImage" src={member.img ? member.img : dummyIcon} alt={member.memberName} />
                                                    <p className="userName">{member.memberName}</p>
                                                </div>
                                            ))
                                        }
                                    </SimpleGrid>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </>
                    :
                    null
            }
        </div>
    )
}

export default GroupProfileSection;
