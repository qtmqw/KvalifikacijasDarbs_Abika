import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import PP from '../assets/pp.png'
import { Switch, Button } from "@material-tailwind/react";
import axios from 'axios';
import { host } from '../utils/APIRoutes';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

export default function Profils({ userData }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const logOut = () => {
        window.localStorage.clear()
        window.location.href = "./"
    }

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');
        try {
            const response = await axios.patch(`${host}/6465fdbfbf7b32ae21baa27d`, {
                username,
                email,
            });
            console.log(response.data);

            // Handle the response or any necessary actions after updating the data

        } catch (err) {
            console.error(err);
            // Handle the error
        }
    };

    return (
        <Container fluid='sm'>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <div>
                        <h2 className=' text-center pt-5 pb-3'>Lietotāja profils</h2>
                    </div>
                    <div className='max-w-[100%] flex flex-wrap justify-between'>
                        <div className='mb-3'>
                            <div className=' flex flex-col justify-center'>
                                <img src={PP} alt="profil picture" className='w-[50%] h-[100%] mx-auto rounded-full border-4 border-orange mb-3' />
                                <Button className='w-[50%] mx-auto bg-orange' onClick={logOut}>Izrakstīties</Button>
                            </div>
                        </div>
                        <div className=' flex flex-col gap-4 border-4 border-orange rounded-xl p-4 justify-center'>
                            <h3>Vārds: {userData.username}</h3>
                            <h3>E-pasts: {userData.email}</h3>
                            <h3>Status: {userData.userType}</h3>
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between'>
                        <div className='mb-5 lg:w-[45%] sm:w-full'>
                            <div className='border-b-2 border-orange'>
                                <h2 className='mt-5'>Letotāja pasūtījumi</h2>
                            </div>
                            <div>
                                <div className="flex flex-col my-10">
                                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr className='text-black text-left text-xs font-medium uppercase tracking-wider'>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 "
                                                            >
                                                                Pasūtījuma ID
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 "
                                                            >
                                                                Pasūtīšanas datums
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 "
                                                            >
                                                                Status
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        <tr>
                                                            <td className="px-6 py-4 whitespace-wrap">
                                                                <div className="text-sm text-gray-900 ">sdf</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">sdf</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">sdf</div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='lg:w-[50%] sm:w-full mb-5'>
                            <div className='border-b-2 border-orange mb-3'>
                                <h2 className='mt-5'>Profila iestatījumi</h2>
                            </div>
                            <div className='w-full flex lg:flex-row sm:flex-col'>
                                <div className='lg:w-[50%] sm:w-full flex justify-between my-3 mr-auto'>
                                    <form onSubmit={handleFormSubmit} className=' flex flex-col gap-3'>
                                        <div className='text-xl'>
                                            Vārda maiņa
                                            <input
                                                type="text"
                                                placeholder={userData.username}
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="w-[90%] px-3 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow-md outline-none focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className='text-xl'>
                                            E-pasta maiņa
                                            <input
                                                type="text"
                                                placeholder={userData.email}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-[90%] px-3 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow-md outline-none focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <Button type="submit" className='w-[90%] bg-orange'>Submit</Button>
                                    </form>
                                </div>
                                <div className=' lg:w-[45%] sm:w-full  flex justify-between my-3'>
                                    <div className='text-xl'>
                                        Dark mode <br />
                                        <Switch />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}