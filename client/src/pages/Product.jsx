import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Product, userR, CartA } from '../utils/APIRoutes';
import { Container } from "react-bootstrap";
import { BsCart2 } from 'react-icons/bs'
import "../product/styles.css"
import { toast } from "react-toastify";


function Productshow() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [userData, setUserData] = useState(null);
    const [quantityq, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const isLoggedIn = window.localStorage.getItem("loggedIn")
    const [averageRating, setAverageRating] = useState(0);
    const [rating, setRating] = useState(0);
    const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);



    const fetchAverageRating = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:8080/rating/rating/${productId}`);
            setAverageRating(response.data.averageRating);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        axios
            .get(`${Product}/${id}`)
            .then((res) => {
                setProduct(res.data)
                console.log(res.data)
            })
            .catch((err) => console.log(err));
        fetchAverageRating(id);
    }, [id]);

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

    if (!product) {
        return <div>Loading...</div>;
    }

    const addToCart = async (userId, productId, quantity) => {
        if (!isLoggedIn) {
            return toast('You must be logged in');
        } else {
            try {
                const response = await axios.post(CartA, {
                    userId,
                    productId,
                    quantity,
                });
                return response.data.data; // Return the added cart item
            } catch (error) {
                console.error(error);
                return null; // Return null on error
            }
        }
    };

    const handleAddToCart = async () => {
        const userId = userData?.userId;
        const productId = product._id;
        const cartItem = await addToCart(userId, productId, quantityq);
        if (cartItem) {
            setIsAddingToCart(true);
            toast("Product added to cart");
        } else {
            setIsAddingToCart(false);
            console.log("Failed to add product to cart.");
        }
    };

    const renderStars = (value) => {
        const starCount = 5;
        const filledStars = Math.floor(value);
        const hasHalfStar = value - filledStars >= 0.5;

        const stars = [];

        for (let i = 1; i <= starCount; i++) {
            if (i <= filledStars) {
                stars.push(<span key={i} style={{ color: 'gold' }}>&#9733;</span>);
            } else if (i === filledStars + 1 && hasHalfStar) {
                stars.push(
                    <span key={i} style={{ color: 'gold' }}>
                        &#9733;
                    </span>
                );
            } else {
                stars.push(<span key={i} style={{ color: 'gray' }}>&#9733;</span>);
            }
        }

        return stars;
    };

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleRatingSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/rating/rating`, {
                value: rating,
                user: userData?._id,
                product: id,
            });

            console.log(response.data);
            setRating(0);
            setIsRatingSubmitted(true);
            fetchAverageRating(id);
        } catch (error) {
            console.error(error);
            toast('Failed to submit rating');
        }
    };

    return (
        <Container fluid="sm">

            <section>
                <nav className="flex mt-5" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-3">
                        <li class="inline-flex items-center">
                            <Link to="/" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black">
                                <svg aria-hidden="true" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                Sākums
                            </Link>
                        </li>
                        <li>
                            <div class="flex items-center">
                                <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <Link to="/Sortiments" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black">Sortiments</Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div class="flex items-center">
                                <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Product</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div class="relative mx-auto max-w-screen-xl lg:px-4 sm:px-0 pb-8">
                    <div class="grid grid-cols-1 items-start lg:gap-8 sm:gap-2 lg:grid-cols-2">
                        <div class=" lg:border-r-2 border-solid border-orange ">
                            <img
                                src={`/uploads/${product.image}`}
                                /* alt={product.imageAlt} */
                                className="aspect-square w-full rounded-xl object-cover"
                            />


                        </div>

                        <div class=" top-0 lg:border-0 sm:border-t-2 border-solid border-orange">
                            <div class=" space-y-2">
                                <div className="flex justify-between mt-2" >
                                    <h1 class="text-xl font-bold sm:text-2xl">
                                        {product.title}
                                    </h1>
                                    <div className="font-bold flex flex-col justify-end ">
                                        <div className="items-center flex">

                                            <div className="text-lg font-bold mb-2">
                                                {product.discount && product.discount.type !== 0
                                                    ? `${product.discountPrice.toFixed(2)} €`
                                                    : `${product.price} €`}
                                            </div>
                                            {product.discount ?
                                                product.discount.type > 0 && (
                                                    <div className="text-[#FF7D1A] bg-[#FFEDE0] w-max px-2 rounded mb-2 lg:ml-10 sm:ml-5 h-6">
                                                        {product.discount.type}%
                                                    </div>
                                                )
                                                : " "
                                            }
                                        </div>
                                        {product.discount ?
                                            product.discount.type > 0 && (
                                                <div className="text-[#76787F] line-through ">
                                                    {product.price} €
                                                </div>
                                            )
                                            : " "
                                        }
                                    </div>
                                </div>
                                <p class="text-sm">ID: {product._id}</p>
                                <p class="text-md">Produkta reitings</p>
                                <div className='flex'>
                                    <div className='text-2xl'>{renderStars(averageRating)}</div><div className='my-auto ml-3'>{averageRating} no 5</div>
                                </div>
                                {isRatingSubmitted ? (
                                    <div>
                                        <p>Reitings tika saglabāts</p>
                                    </div>
                                ) : (
                                    <div>
                                        <div>
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <span
                                                    key={value}
                                                    onClick={() => handleRatingChange(value)}
                                                    style={{
                                                        cursor: 'pointer',
                                                        color: rating >= value ? 'gold' : 'gray',
                                                    }}
                                                >
                                                    &#9733;
                                                </span>
                                            ))}
                                        </div>
                                        <button onClick={handleRatingSubmit}>Submit Rating</button>
                                    </div>
                                )}
                            </div>

                            <div class="mt-4">
                                <div class="prose max-w-none">
                                    <p>
                                        {product.description}
                                    </p>
                                </div>
                            </div>

                            <div class="mt-8">
                                <fieldset>
                                    <legend class="mb-1 text-sm font-medium">Color</legend>

                                    <div class="flex flex-wrap gap-1">
                                        <label for="color_tt" class="cursor-pointer">
                                            <input
                                                type="radio"
                                                name="color"
                                                id="color_tt"
                                                class="peer sr-only"
                                            />

                                            <span
                                                class="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                                            >
                                                {product.color}
                                            </span>
                                        </label>
                                    </div>
                                </fieldset>

                                <fieldset class="mt-4">
                                    <legend class="mb-1 text-sm font-medium">Size</legend>

                                    <div class="flex flex-wrap gap-1">
                                        <label for="size_xs" class="cursor-pointer">
                                            <input
                                                type="radio"
                                                name="size"
                                                id="size_xs"
                                                class="peer sr-only"
                                            />

                                            <span
                                                class="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                                            >
                                                {product.size}
                                            </span>
                                        </label>
                                    </div>
                                </fieldset>

                                <div class="mt-8 flex lg:gap-4 sm:gap-0">
                                    <div className="quantity-container w-full bg-[#F7F8FD] rounded-lg h-14 mb-4 flex items-center justify-between px-6 lg:px-3 font-bold sm:mr-3 lg:mr-5 lg:w-1/3">
                                        <button
                                            className="text-[#FF7D1A] text-2xl leading-none font-bold mb-1 lg:text-3xl hover:opacity-60"
                                            onClick={() => {
                                                if (quantityq > 1) {
                                                    setQuantity(quantityq - 1);
                                                }
                                            }}
                                        >
                                            -
                                        </button>
                                        <input
                                            className="focus:outline-none bg-[#F7F8FD] font-bold flex text-center w-full border-0"
                                            type="number"
                                            defaultValue={1}
                                            min={1}
                                            max={100}
                                            value={quantityq}
                                            onChange={(event) => {
                                                const value = parseInt(event.target.value);
                                                if (isNaN(value) || value <= 0 || value % 1 !== 0) {
                                                    // If value is null, negative or zero, or a decimal
                                                    event.preventDefault();
                                                } else {
                                                    setQuantity(value);
                                                }
                                            }}
                                        />
                                        <button
                                            className="text-[#FF7D1A] text-2xl leading-none font-bold lg:text-3xl hover:opacity-60"
                                            onClick={() => {
                                                if (quantityq < 100) {
                                                    setQuantity(quantityq + 1);
                                                }
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button className="cart w-full h-14 bg-[#FF7D1A] rounded-lg lg:rounded-xl mb-2 shadow-[#FFC799] shadow-2xl text-white flex items-center justify-center lg:w-3/5 hover:opacity-60"
                                        onClick={handleAddToCart} disabled={!isLoggedIn || isAddingToCart} >
                                        <i className='cursor-pointer text-white text-xl leading-0 pr-3 pb-1'>
                                            <BsCart2 name='cart-outline'></BsCart2>
                                        </i>
                                        {isAddingToCart ? "Adding..." : "Add to cart"}
                                    </button>
                                </div>
                                {!isLoggedIn && <div className="text-center">
                                    Lai ievietotu preci grozā nepieciešams pieslēgties
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default Productshow;