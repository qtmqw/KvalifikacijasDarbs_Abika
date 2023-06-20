import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import PP from '../assets/user.png'
import { Button } from "@material-tailwind/react";
import axios from 'axios';
import { host, Product, OrderG } from "../utils/APIRoutes";

export default function Profils({ userData }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .get(`${OrderG}/${userData._id}`)
            .then((res) => {
                setOrders(res.data.orders);
            })
            .catch((err) => console.log(err));
    }, [userData]);


    if (!userData) {
        return <div>Loading...</div>;
    }

    const logOut = () => {
        window.localStorage.clear()
        window.location.href = "./"
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');
        try {
            const response = await axios.patch(`${host}/${userData._id}`, {
                username,
                email,
            });
            console.log(response.data);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    const isFormValid = () => {
        return username.length >= 6 && username.length <= 20;
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await axios.patch(`${OrderG}/${orderId}/status`, {
                status: 'Atcelts',
            });
            const order = orders.find((order) => order._id === orderId);
            if (order) {
                const productId = order.items[0].product._id;
                const productResponse = await axios.get(`${Product}/${productId}`);
                const product = productResponse.data;
                const updatedQuantity = product.quantity + order.items[0].quantity;
                await axios.patch(`${Product}/q/${productId}`, {
                    quantity: updatedQuantity,
                });
            }
            window.location.reload();
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <Container fluid='sm'>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <div>
                        <h2 className=' md:text-7xl sm:text-5xl text-3xl font-bold text-center my-5'>Lietotāja profils</h2>
                    </div>
                    <div className='max-w-[100%] flex justify-between'>
                        <div className='mb-3 lg:w-[50%]'>
                            <div className='lg:w-[50%] flex flex-col mx-auto'>
                                <img src={PP} alt="profil picture" className='w-[70%] h-[100%] mx-auto rounded-full border-4 border-orange mb-3' />
                                <Button className='w-[100%] mx-auto bg-orange' onClick={logOut}>Izrakstīties</Button>
                            </div>
                        </div>
                        <div className=' lg:w-[50%] sm:w-full flex flex-col gap-4 border-4 border-orange rounded-xl p-4 justify-center '>
                            <h3>Lietotājvārds: {userData.username}</h3>
                            <h3>Vārds Uzvārds: {userData.name} {userData.lastname}</h3>
                            <h3>E-pasts: {userData.email}</h3>
                            <h3>Uzņēmums: {userData.company}</h3>
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between'>
                        <div className='mb-5 lg:w-[60%] sm:w-full'>
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
                                                                Rezervācijas ID
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 "
                                                            >
                                                                Saņemšanas datums
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 "
                                                            >
                                                                Status
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 "
                                                            >
                                                                Atcelt rezervāciju
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200 ">
                                                        {!orders.length ? (
                                                            <p className=' mx-3 font-bold text-lg my-3 justify-center'>
                                                                Jums nav rezervāciju
                                                            </p>
                                                        ) : (
                                                            orders.map((order) => (
                                                                <tr key={order._id}>
                                                                    <td className="px-6 py-4 whitespace-wrap">
                                                                        <div className="text-sm text-gray-900 ">{order._id}</div>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="text-sm text-gray-900">{new Date(order.readyDate).toLocaleDateString()}</div>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className={`status ${order.status.includes('Gatavs') ? 'text-green-500' : order.status.includes('Atcelts') ? 'text-red-500' : 'text-blue-500'}`}>
                                                                            {order.status}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        {order.status.includes('Apstrādā') ? (
                                                                            <Button
                                                                                className="bg-red-400"
                                                                                onClick={() => handleCancelOrder(order._id)}
                                                                            >
                                                                                Atcelt
                                                                            </Button>
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            )))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='lg:w-[35%] sm:w-full mb-5'>
                            <div className='border-b-2 border-orange mb-3'>
                                <h2 className='mt-5'>Profila Vārda/Epasta maiņa</h2>
                            </div>
                            <div className='w-full flex lg:flex-row sm:flex-col'>
                                <div className='w-full flex justify-center my-3 '>
                                    <form onSubmit={handleFormSubmit} className=' flex flex-col gap-3'>
                                        <div className='text-xl'>
                                            Lietotājvārda maiņa
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
                                        <Button type="submit" className='w-[90%] bg-orange' disabled={!isFormValid()}>
                                            Mainīt
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}