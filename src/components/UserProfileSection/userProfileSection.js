/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Avatar } from "@chakra-ui/react";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { Divider } from "@chakra-ui/react";
import { AiFillFolder, AiFillFile } from 'react-icons/ai';
import { RiFolderShieldFill, RiMovieFill } from 'react-icons/ri';
import { BsThreeDotsVertical, BsImageFill, BsFiles } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

import FileThumbnail from '../FileThumbnail/fileThumbnail';
import FileList from '../FileList/fileList';

import { userDetailsById } from 'Actions';

import './userProfileSection.css';

const iconUrl = "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";

const UserProfileSection = () => {
    const [user, setUser] = useState(null);
    const isRightPanelOpen = useSelector(state => state.dashboard.rightPanelOpen);
    const dispatch = useDispatch();
    const { chatID, profileId } = useParams();
    const [isMobile, setIsMobile] = useState(Boolean(window.innerWidth < 550));

    const handleSideDrawer = (bool) => {
        dispatch({ type: "RIGHT_PANEL", payload: bool });
        dispatch({ type: "SHOW_RIGHT_DRAWER_MOBILE", payload: false });
    };

    useEffect(() => {
        setUser();
        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const handleWindowSizeChange = () => {
        setIsMobile(Boolean(window.innerWidth < 550));
    };

    useEffect(() => {
        !profileId && fetchUserDetailsById(chatID);
    }, [chatID]);

    useEffect(() => {
        !chatID && fetchUserDetailsById(profileId);
    }, [profileId]);

    const fetchUserDetailsById = async (id) => {
        const dbUser = await userDetailsById(`/users/${id}`);
        dbUser && setUser(dbUser);
    };

    return (
        <div className="profileContainer">
            <div className="leftChevContainer">
                <div className="chevRightIcon" onClick={() => handleSideDrawer(!isRightPanelOpen)}>
                    {
                        isMobile && !isRightPanelOpen
                            ?
                            null
                            :
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
                        <Avatar name="Dan Abrahmov" size="lg" src={user?.img || iconUrl} />
                        <p className="groupName">
                            {user?.name}
                        </p>
                        <div className="membersCount">
                            {user?.email || "New User"}
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

export default UserProfileSection;
