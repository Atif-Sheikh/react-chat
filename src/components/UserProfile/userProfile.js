import React from 'react';

// Todo: Maybe used in future
// import { Avatar, AvatarBadge } from "@chakra-ui/react";
// import { BsChevronDown } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { AiTwotoneSetting } from 'react-icons/ai';
import firebase from 'firebase/app';

import './userProfile.css';

const UserProfile = ({ history }) => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await firebase.auth().signOut().then(() => {
                dispatch({ type: "LOGOUT", payload: null });
                history.replace('/login');
            })
                .catch(err => {
                    throw err;
                });
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="profileContainer">
            <div>
                <AiTwotoneSetting onClick={handleLogout} className="profileSettingsIcon" />
                {/* Todo: Maybe use in future */}
                {/* <Avatar name="Dan Abrahmov" size="lg" src={user?.img ? user?.img : "https://bit.ly/dan-abramov"}>
                    <AvatarBadge boxSize="20px" bg="green.500" />
                </Avatar> */}
            </div>
            <p className="userProfileName">
                {user?.name}
            </p>
            {/* <div className="userStatus">
                <span>available</span>
                <BsChevronDown />
            </div> */}
        </div>
    )
}

export default UserProfile;
