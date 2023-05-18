import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";
import { toast } from 'react-toastify';
import axios from "axios";
import { userR, CartR } from "../utils/APIRoutes";

const Checkout = () => {

    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState(null);
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .post(userR, { token })
            .then((response) => {
                setUserData(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const getUserCart = async (userId) => {
        try {
            const response = await axios.get(`${CartR}/${userId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "Server Error" };
        }
    };

    useEffect(() => {
        const fetchCart = async () => {
            if (userData && userData.userId) {
                const result = await getUserCart(userData.userId);
                if (result.data) {
                    setCart(result.data);
                    setIsLoading(false);
                } else {
                    console.error(result.error);
                }
            }
        };
        fetchCart();
    }, [userData]);

    return (
        <>
            <Button className="text-base leading-none w-full py-4 bg-orange text-white"
                type="button"
                onClick={() => setShowModal(true)}>
                Checkout
            </Button>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative  my-6 mx-auto max-w-3xl w-[100%]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none w-[100%]">
                                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">Checkout</h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <label className='mb-3 flex'>
                                        <div className='w-full text-center'>
                                            <h3>Jūs apstiprinat, ka vēlaties pasūtīt šis preces?</h3>
                                        </div>
                                    </label>
                                    <form
                                        className="flex-col flex"
                                    >
                                        {isLoading ? (
                                            // If cart is loading, display loading message
                                            <h1 className='text-center'>
                                                Loading...
                                            </h1>
                                        ) : (
                                            !cart.length ? (
                                                <>
                                                    <h1 className=' text-center'>
                                                        Grozs ir tukšs
                                                    </h1>
                                                </>
                                            ) : (
                                                cart.map((item) => (
                                                    <label className='flex'>
                                                        <div className="w-[20%]">
                                                            <img src={`/uploads/${item.product?.image}`} alt className="w-full h-full object-center object-cover" />
                                                        </div>
                                                        <div className='w-full flex justify-between'>
                                                            <div className='flex flex-col justify-center ml-6'>
                                                                <div className="flex">
                                                                    <p className="text-base font-black text-gray-800">{item.product?.title}</p>
                                                                </div>
                                                                <div className='flex gap-3 '>
                                                                    <p className="text-xs text-gray-600">Size: {item.product?.size}</p>
                                                                    <p className="text-xs text-gray-600 ">Color: {item.product?.color}</p>
                                                                </div>
                                                            </div>
                                                            <div className='flex flex-col justify-center mr-[5%] text-right'>
                                                                <p className='text-xl'>Total</p>
                                                                <p className="text-base font-black text-gray-800">
                                                                    {item.product.discount && item.product.discountPrice !== 0
                                                                        ? item.product.discountPrice.toFixed(2) * item.quantity
                                                                        : item.product.price * item.quantity}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </label>
                                                ))))}
                                        <div className="flex items-center justify-end pt-3 border-t border-solid border-blueGray-200 rounded-b mt-4 ">
                                            <Button type="submit" >apstiprinu</Button>
                                            <Button
                                                className="ml-5  "
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                neapstiprinu
                                            </Button>
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
};
export default Checkout;
