import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const data = useSelector(state => state.user);

    if(!data?.user) return null;
    const {user} = data;
    console.log(user, ">>>>");


    return (
        <div>
            user: {user?.name || user?.displayName}
        </div>
    )
}

export default Dashboard;