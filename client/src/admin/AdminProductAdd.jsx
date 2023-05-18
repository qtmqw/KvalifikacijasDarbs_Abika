import React, { useEffect, useState } from 'react'
import { Product, Category } from '../utils/APIRoutes'
import { Button } from "@material-tailwind/react";
import axios from 'axios'
import { toast } from 'react-toastify';

const AdminProductAdd = () => {


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [discount, setDiscount] = useState('');
    const [discounts, setDiscounts] = useState([]);



    useEffect(() => {
        axios
            .get(Category)
            .then((response) => setCategory(response.data))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8080/d/discountAll') // Assuming you have a route for fetching discounts
            .then((response) => setDiscounts(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('color', color);
        formData.append('size', size);
        formData.append('price', price);
        formData.append('categoryIds', categories.join(','));
        formData.append('discount', discount);
        formData.append('image', image);
        try {
            const res = await axios.post(`${Product}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(res.data);
            // clear form data
            setTitle('');
            setDescription('');
            setColor([]);
            setSize([]);
            setPrice('');
            setCategories([]);
            setDiscount('');
            setImage(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };


    return (
        <>
            <Button
                className='bg-blue-500 w-[50%] font-bold '
                type="button"
                onClick={() => setShowModal(true)}
            >
                Pievienot preci</Button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative  my-6 mx-auto max-w-3xl w-[100%]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none w-[100%]">
                                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Pievienot preci
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
                                                    placeholder="Nosaukums"
                                                    class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                            </div>
                                            <div className='w-[50%] pr-2'>
                                                <h3>Cena</h3>
                                                <input
                                                    required
                                                    id="price"
                                                    type="Number"
                                                    placeholder="Cena"
                                                    class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>
                                        </label>
                                        <label className='mb-3'>
                                            <h3>Apraksts</h3>
                                            <textarea
                                                id="description"
                                                required
                                                type="text"
                                                placeholder="Apraksts"
                                                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </label>
                                        <label className='mb-3 flex'>
                                            <div className='w-[30%] pl-2'>
                                                <h3>Krāsa</h3>
                                                <select
                                                    multiple
                                                    id="color"
                                                    required
                                                    class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                                    value={color}
                                                    onChange={(e) => setColor([e.target.value])}
                                                >
                                                    <option value="">--Select a color--</option>
                                                    <option value="Red">Sarkans</option>
                                                    <option value="Green">Zaļš</option>
                                                    <option value="Blue">Zils</option>
                                                    <option value="White">Balts</option>
                                                    <option value="Brown">Brūns</option>
                                                    <option value="Purple">Violēts</option>
                                                    <option value="Black">Melns</option>
                                                </select>
                                            </div>

                                            <div className='w-[40%] pl-2'>
                                                <h3>Kategorijas</h3>
                                                {category.map((category) => (
                                                    <div key={category._id}>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                value={category._id}
                                                                className=' rounded-md mr-2 '
                                                                checked={categories.includes(category._id)}
                                                                multiple
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        setCategories([...categories, e.target.value]);
                                                                    } else {
                                                                        setCategories(categories.filter((id) => id !== e.target.value));
                                                                    }
                                                                }}
                                                            />
                                                            {category.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className='w-[30%] pl-2'>
                                                <h3>Izmērs</h3>
                                                <select
                                                    multiple
                                                    id="size"
                                                    required
                                                    class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                                    value={size}
                                                    onChange={(e) => setSize([e.target.value])}
                                                >
                                                    <option value="">--Select a size--</option>
                                                    <option value="XS">XS</option>
                                                    <option value="S">S</option>
                                                    <option value="M">M</option>
                                                    <option value="L">L</option>
                                                    <option value="XL">XL</option>
                                                    <option value="XXL">XXL</option>
                                                </select>
                                            </div>
                                        </label>
                                        <label className="mb-3">
                                            <h3>Atlaide</h3>
                                            <select
                                                id="discount"
                                                className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                                value={discount}
                                                onChange={(e) => setDiscount(e.target.value)}
                                            >
                                                <option value="">-- Atlaides nav --</option>
                                                {discounts.map(item => (
                                                    <option key={item._id} value={item._id}>
                                                        {item.title}, {item.type}%
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                        <h3>Attēls</h3>
                                        <label
                                            className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">

                                            <span className="flex items-center space-x-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <span className="font-medium text-gray-600">
                                                    Drop files to Attach, or
                                                    <span className="text-blue-600 underline pl-1">browse</span>
                                                </span>
                                            </span>
                                            <input
                                                type="file"
                                                id='image'
                                                className="hidden form-control-file"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                        <div className="flex items-center justify-end pt-3 border-t border-solid border-blueGray-200 rounded-b mt-4 jus">
                                            <Button type="submit" >Pievienot produktu</Button>
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Aizvērt
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}
export default AdminProductAdd