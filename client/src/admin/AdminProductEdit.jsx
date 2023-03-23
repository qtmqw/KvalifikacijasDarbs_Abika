import React, { useState } from 'react'
import { Product } from '../utils/APIRoutes'
import { Button } from "@material-tailwind/react";
import axios from 'axios'
import { toast } from 'react-toastify';

const AdminProductEdit = ({ product }) => {

    const [fileName, setFileName] = useState('')
    const [title, setTitle] = useState(product.title);
    const [description, setDescription] = useState(product.description);
    const [color, setColor] = useState(product.color);
    const [price, setPrice] = useState(product.price);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = {
                title,
                description,
                color,
                price,
            };
            if (window.confirm(`Are you sure you want to edit ${title}`)) {
                await axios.put(`${Product}/${product._id}`, productData);
                toast("Product edit successfully!");
            } else {
            }
        } catch (err) {
            console.error(err);
            toast("Error edit product");
        }
    };

    return (
        <>
            <Button
                className='bg-transparent text-green-500 shadow-md '
                type="button"
                onClick={() => setShowModal(true)}
            >
                Edit</Button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative  my-6 mx-auto max-w-3xl w-[100%]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none w-[100%]">
                                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Product Edit
                                    </h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={handleSubmit} className="flex-col flex">
                                        <label className='mb-3 flex'>
                                            <div className='w-[50%] pr-2'>
                                                <h3>Title</h3>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Title"
                                                    class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                            </div>
                                            <div className='w-[50%] pl-2'>
                                                <h3>Color</h3>
                                                <select
                                                    required
                                                    className='px-3 py-3 w-full bg-white rounded shadow outline-none focus:outline-none focus:shadow-outline'
                                                    value={color}
                                                    onChange={(e) => setColor(Array.from(e.target.selectedOptions, option => option.value))}
                                                >
                                                    <option>Colors</option>
                                                    <option value="red">Red</option>
                                                    <option value="green">Green</option>
                                                    <option value="blue">Blue</option>
                                                </select>
                                            </div>
                                        </label>
                                        <label className='mb-3'>
                                            <h3>Description</h3>
                                            <textarea
                                                required
                                                type="text"
                                                placeholder="Description"
                                                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </label>
                                        <label className='mb-3 flex'>
                                            <div className='w-[50%] pr-2'>
                                                <h3>Price</h3>
                                                <input
                                                    required
                                                    type="number"
                                                    placeholder="Price"
                                                    class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>
                                            <div className='w-[50%] pl-2'>
                                                <h3>Category</h3>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Category"
                                                    class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"

                                                />
                                            </div>
                                        </label>
                                        <h3>Image</h3>
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
                                                multiple
                                                type="file"
                                                /* accept='.png, .jpg, .jpeg' */
                                                filename='image'
                                                className="hidden form-control-file"
                                            />
                                        </label>
                                        <div className="flex items-center justify-end pt-3 border-t border-solid border-blueGray-200 rounded-b mt-4 jus">
                                            <Button type="submit" >Edit Product</Button>
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                {/*footer*/}



                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}

export default AdminProductEdit