import React, { useEffect, useState } from 'react'
import Profils from '../pages/Profils'
import AdminUserBoard from '../admin/AdminUserBord'
import { UserData } from '../API/Users'

export default function UserDetails() {
    const [userData, setUserData] = useState("");
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const res = UserData({setAdmin, setUserData});
        console.log(res);
    }, []);

    return admin ? <AdminUserBoard /> : <Profils userData={userData} />;
}