import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Product } from '../utils/APIRoutes';
import { Container } from "react-bootstrap";
import tee from '../assets/tee.jpg'
import { BsCart2 } from 'react-icons/bs'

function Productshow() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios
            .get(`${Product}/${id}`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="py-10">
            <div className="flex md:flex-wrap lg:flex-nowrap justify-between w-full">
                <div className=" w-[50%]">
                    <div className="w-[70%] border-8 border-[#FF7D1A] rounded-xl mx-auto mb-4">
                        <img
                            src={`/uploads/${product.image}`}
                            /* alt={product.imageAlt} */
                            className="w-full h-full rounded-2xl"
                        />
                    </div>
                    <div className="flex gap-4 justify-center">
                        <div className="w-[15%] border-4 border-[#FF7D1A] rounded-xl mt-1">
                            <img src={tee} className="rounded-2xl" />
                        </div>
                        <div className="w-[15%] border-4 border-[#FF7D1A] rounded-xl mt-1">
                            <img src={tee} className="rounded-2xl" />
                        </div>
                        <div className="w-[15%] border-4 border-[#FF7D1A] rounded-xl mt-1">
                            <img src={tee} className="rounded-2xl" />
                        </div>
                        <div className="w-[15%] border-4 border-[#FF7D1A] rounded-xl mt-1">
                            <img src={tee} className="rounded-2xl" />
                        </div>
                    </div>
                </div>

                <div className="w-[40%]">
                    <h2 className="company uppercase text-[#FF7D1A] font-bold text-sm sm:text-md tracking-wider pb-3 sm:pb-5">
                        abika
                    </h2>
                    <h3 cclassName="font-bold text-3xl sm:text-4xl sm:leading-none pb-3">
                        {product.title}
                    </h3>
                    <p className="text-[#76787F] pb-6 lg:py-7 lg:leading-6">
                        {product.description}
                    </p>
                    <p className='md:text-xl sm:text-2xl pb-6 lg:pb-7 lg:leading-6'>Color: {product.color}</p>
                    <div className="amount font-bold flex items-center justify-between lg:flex-col lg:items-start mb-6">
                        <div className="discount-price items-center flex">
                            <div className="text-3xl">{product.price} €</div>
                            <div className="discount text-[#FF7D1A] bg-[#FFEDE0] w-max px-2 rounded mx-5 h-6">
                                50%
                            </div>
                        </div>
                        <div className="original-price text-[#76787F] line-through lg:mt-2">
                            {product.price} €
                        </div>
                    </div>
                    <div className="sm:flex lg:mt-8 w-full">
                        <div className="quantity-container w-full bg-[#F7F8FD] rounded-lg h-14 mb-4 flex items-center justify-between px-6 lg:px-3 font-bold sm:mr-3 lg:mr-5 lg:w-1/3">
                            <button className="text-[#FF7D1A] text-2xl leading-none font-bold mb-1 lg:text-3xl hover:opacity-60">-</button>
                            <input className="focus:outline-none text-dark-blue bg-[#F7F8FD] font-bold flex text-center w-full" type="number" defaultValue={1} min={1} max={100} name="quantity" aria-label="quantity number" />
                            <button className="text-[#FF7D1A] text-2xl leading-none font-bold lg:text-3xl hover:opacity-60">+</button>
                        </div>

                        <button className="cart w-full h-14 bg-[#FF7D1A] rounded-lg lg:rounded-xl mb-2 shadow-[#FFC799] shadow-2xl text-white flex items-center justify-center lg:w-3/5 hover:opacity-60">
                            <i className='cursor-pointer text-white text-xl leading-0 pr-3'>
                                <BsCart2 name='cart-outline'></BsCart2>
                            </i>
                            Add to cart
                        </button>
                    </div>

                </div>
            </div>



        </Container>
    );
}

export default Productshow;