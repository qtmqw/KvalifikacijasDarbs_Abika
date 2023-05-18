import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";
import { useUserData, useCartData } from '../API/CartAPI'
import PDF from './Pasutijums'
const Checkout = () => {

    const [showModal, setShowModal] = useState(false);
    const userData = useUserData();
    const { cart, isLoading, total } = useCartData(userData);

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
                                                    <label >
                                                        <div className='flex'>
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
                                                                    <p className='text-lg font-semibold'>Daudzums</p>
                                                                    <p className="text-base font-black text-gray-800">
                                                                        {item.quantity}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </label>
                                                ))))}
                                        <div className='flex justify-between mt-5 border-b-2 border-solid border-black'>
                                            <p className=' font-semibold'>Kopsumma</p>
                                            <div className='text-base font-black text-gray-800'>
                                                {total.toFixed(2)} €
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end pt-3 rounded-b  ">
                                            <PDF/>
                                            <Button
                                                className="ml-5 bg-gray-300 leading-none text-red-600 text-sm"
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
