import React, { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { Container } from 'react-bootstrap'
import { GetAllUser, DeleteUser } from '../API/Users'
import Spinner from '../assets/Spinner.gif'
import { Button } from "@material-tailwind/react"
import { toast } from 'react-toastify';

export default function AdminPage({ userData }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        getAllUser();
    }, []);

    const getAllUser = () => {
        const res = GetAllUser({ setData });
    };

    const deleteUser = (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}`)) {
            const res = DeleteUser({ getAllUser, userid: id })
            toast("User deleted")
        } else {

        }
    }

    return (
        <Container className="flex flex-col">
            <h1 className='md:text-7xl sm:text-5xl text-3xl font-bold pt-[60px] text-center mx-auto mb-5'>Lietotāji</h1>

            <div className="flex flex-col my-10">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 h-[80px]">
                                    <tr className="text-left text-xs font-medium text-black uppercase tracking-wider">
                                        <th
                                            scope="col"
                                            className="px-6 py-3"
                                        >
                                            Vārds
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3"
                                        >
                                            E-pasts
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3"
                                        >
                                            Admin/User
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3"
                                        >
                                            Izdzēst
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {!data.length ? (
                                        <img src={Spinner} alt="loading.." className='mx-auto my-auto w-[10%]' />
                                    ) : (
                                        data.map(i => (
                                            <tr key={i.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{i.username}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{i.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{i.userType}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Button className="bg-red-500" onClick={() => deleteUser(i._id, i.username)}>
                                                        <BsFillTrashFill
                                                            className="text-sm" 
                                                        />
                                                    </Button>
                                                </td>
                                            </tr>
                                        )))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}