import React from 'react'
import { Container } from 'react-bootstrap';
import PP from '../assets/pp.png'

export default function Profils({ userData }) {

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <div>
                        <h2 className=' text-center p-3'>User Profile</h2>
                    </div>
                    <div className='max-w-[100%] flex justify-between'>
                        <div className='max-w-[50%] '>
                            <img src={PP} alt="profil picture" className='w-[43%] h-[83%] rounded-full border-4 border-orange'/>
                        </div>
                        <div className='max-w-[50%] flex flex-col gap-4 border-4 border-orange rounded-xl p-2'>
                            <h3>User ID: {userData.userId}</h3>
                            <h3>Name: {userData.username}</h3>
                            <h3>Email: {userData.email}</h3>
                            <h3>User Type: {userData.userType}</h3>
                        </div>
                    </div>
                    <div className=' border-b-2 border-orange mb-5'>
                        <h2 className='mt-5'>Profile Settings</h2>
                    </div>


                </div>
            </div>
        </Container>
    );
}