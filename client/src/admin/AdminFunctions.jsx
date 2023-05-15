import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Button } from '@material-tailwind/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BsFillTrashFill } from 'react-icons/bs'

const AdminFunctions = () => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [validUntil, setValidUntil] = useState('');
    const [discount, setDiscount] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/d/discountAll')
            .then((response) => setDiscount(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/d/discount', {
                title,
                type,
                validUntil,
            });
            console.log(res.data);
            toast("Atlaide tika pievienota")
            setTitle('');
            setType('');
            setValidUntil('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container >
            <h1 className="md:text-7xl sm:text-5xl text-3xl font-bold pt-[60px] text-center mx-auto mb-5">
                Funkcijas
            </h1>
            <div className='flex justify-between w-full gap-4 my-5'>
                <div className="border-0 rounded-lg shadow-lg  flex flex-col mx-auto  bg-white w-[33%]">
                    <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Atlaide
                        </h3>
                    </div>
                    <div className="relative p-6 flex-auto">
                        <form onSubmit={handleSubmit} className="flex-col flex" encType='multipart/form-data'>
                            <label className='mb-3 flex'>
                                <div className='w-[50%] pr-2'>
                                    <h3>Nosaukums</h3>
                                    <input
                                        required
                                        type="text"
                                        id="title"
                                        placeholder="Title"
                                        class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className='w-[50%] pr-2'>
                                    <h3>Datums</h3>
                                    <input
                                        required
                                        type="date"
                                        placeholder="Datums"
                                        class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        value={validUntil}
                                        onChange={(e) => setValidUntil(e.target.value)}
                                    />
                                </div>
                            </label>
                            <label className='mb-3 '>
                                <h3>Procenti</h3>
                                <select
                                    required
                                    type='Number'
                                    class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="">Izvēlies atlaidi</option>
                                    <option value="5">5%</option>
                                    <option value="10">10%</option>
                                    <option value="20">20%</option>
                                    <option value="25">25%</option>
                                    <option value="30">30%</option>
                                    <option value="50">50%</option>
                                    <option value="90">90%</option>
                                    <option value="100">100%</option>
                                </select>
                            </label>
                            <Button type="submit" className='bg-orange'>
                                Izveidot
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="border-0 rounded-lg shadow-lg  flex flex-col mx-auto  bg-white w-[33%]">
                    <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Something
                        </h3>
                    </div>
                </div>
                <div className="border-0 rounded-lg shadow-lg  flex flex-col mx-auto  bg-white w-[33%]">
                    <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Something
                        </h3>
                    </div>
                </div>
            </div>
            <div className='flex justify-between w-full gap-4 mb-5'>
                <div className=" border border-3 rounded-lg shadow-lg flex flex-col bg-white w-[32%]">
                    {discount.map(item => (
                        <div className='flex'>
                            <div className="relative p-2 flex-auto border-b border-solid border-blueGray-200">
                                <p>Title: {item.title}</p>
                                <p>Type: {item.type}</p>
                                <p>Date: {item.validUntil}</p>
                            </div>
                            <div className='flex items-center mr-5'>
                                <BsFillTrashFill  className='text-red-500 cursor-pointer'/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default AdminFunctions