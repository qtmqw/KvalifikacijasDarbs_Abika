import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import { toast } from 'react-toastify';
import axios from "axios";
import EEC from "../assets/EEC.gif"
import { userR, CartR } from "../utils/APIRoutes";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BsFillTrashFill } from 'react-icons/bs'
import Checkout from '../components/Checkout';

function Cart() {

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
          console.log(result.data)
        } else {
          console.error(result.error);
        }
      }
    };
    fetchCart();
  }, [userData]);

  const MySwal = withReactContent(Swal);

  const handleRemoveFromCart = async (itemId) => {
    MySwal.fire({
      title: <p>Are you sure?</p>,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#FF7D1A',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${CartR}/${itemId}`);
          if (response.status === 200) {
            setCart(prevCart => prevCart.filter(item => item._id !== itemId));
            toast.success("Item removed from cart");
          } else {
            toast.error("Could not remove item from cart");
          }
        } catch (error) {
          console.error(error);
          toast.error("Server error");
        }
      }
    });
  };

  const handleDecrement = (itemIndex) => {
    const updatedCart = [...cart];
    if (updatedCart[itemIndex].quantity > 1) {
      updatedCart[itemIndex].quantity--;
      updateCartItemQuantity(updatedCart[itemIndex]._id, updatedCart[itemIndex].quantity);
      setCart(updatedCart);
    }
  };

  const handleIncrement = (itemIndex) => {
    const updatedCart = [...cart];
    updatedCart[itemIndex].quantity++;
    updateCartItemQuantity(updatedCart[itemIndex]._id, updatedCart[itemIndex].quantity);
    setCart(updatedCart);
  };

  const updateCartItemQuantity = async (itemId, quantity) => {
    try {
      await axios.put(`${CartR}/${itemId}`, { quantity });
      toast.success("Quantity updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update quantity");
    }
  };

  const totalPrice = cart.reduce((accumulator, item) => {
    if (item.quantity > 15) {
      const discountedPrice =
        item.product.discount && item.product.discount.type !== 0
          ? item.product.discountPrice * item.quantity * 0.95
          : item.product.price * item.quantity * 0.95;
      return accumulator + discountedPrice;
    }
    return accumulator +
      item.product.discount && item.product.discount.type !== 0
      ? item.product.discountPrice * item.quantity
      : item.product.price * item.quantity;
  }, 0);

  const totalDiscountedPrice = cart.reduce((accumulator, item) => {
    if (item.quantity > 14) {
      const discountedPrice =
        item.product.discount && item.product.discount.type !== 0
          ? item.product.discountPrice * item.quantity * 0.05
          : item.product.price * item.quantity * 0.05;
      return accumulator + discountedPrice;
    }
    return accumulator;
  }, 0)

  return (
    <>

      <div className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0" id="chec-div">
        <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
          <div className="flex md:flex-row flex-col justify-end" id="cart">
            <div className="lg:w-full w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden lg:h-screen sm:h-full" id="scroll">
              <Link to={'/Sortiments'} className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left text-orange" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
                <span className="text-lg pl-1 leading-none">Atpakaļ</span>
              </Link>
              <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Grozs</p>
              {isLoading ? (
                // If cart is loading, display loading message
                <h1 className='text-center'>
                  Loading...
                </h1>
              ) : (
                !cart.length ? (
                  <>
                    <img src={EEC} alt='empty cart' className='mx-auto' />
                    <h1 className=' text-center'>
                      Grozs ir tukšs
                    </h1>
                  </>
                ) : (
                  cart.map((item, index) => (
                    <>
                      <div className="lg:block sm:hidden flex items-center mt-4 pt-8 border-t border-gray-200 w-full relative" key={item._id}>
                        <div className='flex items-center'>
                          <div className="xl:w-[15%] lg:w-[20%] ">
                            <img src={`/uploads/${item.product?.image}`} alt />
                          </div>
                          <div className="pl-3 w-[65%] flex justify-between">
                            <div className='w-[30%]'>
                              <p className="text-xs text-gray-800 md:pt-0 ">{item.product?._id}</p>
                              <p className="text-base font-black text-gray-800">{item.product?.title}</p>
                              <p className="text-xs text-gray-600">Size: {item.product?.size}</p>
                              <p className="text-xs text-gray-600 ">Color: {item.product?.color}</p>
                            </div>
                            <div className='xl:w-[45%] lg:w-full flex lg:flex-col sm:flex-row justify-between items-end'>
                              <div className=" w-full bg-[#F7F8FD] rounded-lg h-14 flex items-center justify-between lg:px-3 font-bold xl:w-[40%] lg:w-[50%] sm:w-[50%]">
                                <button
                                  className="text-[#FF7D1A] text-2xl leading-none font-bold mb-1 lg:text-3xl hover:opacity-60"
                                  onClick={() => handleDecrement(index)}
                                >
                                  -
                                </button>
                                <input
                                  className="focus:outline-none bg-[#F7F8FD] font-bold flex text-center w-full border-0"
                                  type="number"
                                  defaultValue={1}
                                  min={1}
                                  max={100}
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const updatedCart = [...cart];
                                    updatedCart[index].quantity = parseInt(e.target.value);
                                    setCart(updatedCart);
                                    updateCartItemQuantity(item._id, parseInt(e.target.value));
                                  }}
                                />
                                <button
                                  className="text-[#FF7D1A] text-2xl leading-none font-bold lg:text-3xl hover:opacity-60"
                                  onClick={() => handleIncrement(index)}
                                >
                                  +
                                </button>
                              </div>
                              <div className='flex items-center'>
                                {item.product.discount ?
                                  item.product.discountPrice > 0 && (
                                    <p className='mr-5 text-[#76787F] line-through text-base font-black leading-none'>{item.product.price} €</p>
                                  )
                                  : " "
                                }
                                <p className="text-base font-black leading-none text-gray-800">
                                  {item.product.discount && item.product.discountPrice !== 0
                                    ? `${item.product.discountPrice.toFixed(2)} €`
                                    : `${item.product.price} €`}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="w-[15%] flex justify-center">
                            <BsFillTrashFill
                              className=" cursor-pointer text-2xl "
                              color="red"
                              buttonType="filled"
                              rounded={false}
                              block={false}
                              iconOnly={false}
                              ripple="light"
                              onClick={() => handleRemoveFromCart(item._id)}
                            />
                          </div>
                        </div>
                      </div>
                      {/* SM */}
                      <div className="flex sm:block lg:hidden items-center mt-4 pt-8 border-t border-gray-200 " key={item._id}>
                        <div className='flex justify-between'>
                          <div className="w-[40%]">
                            <img src={`/uploads/${item.product?.image}`} alt className="" />
                          </div>
                          <div className='w-[30%]'>
                            <p className="text-xs text-gray-800 md:pt-0 ">{item.product?._id}</p>
                            <p className="text-base font-black text-gray-800">{item.product?.title}</p>
                            <p className="text-xs text-gray-600">Size: {item.product?.size}</p>
                            <p className="text-xs text-gray-600 ">Color: {item.product?.color}</p>
                          </div>
                          <div className="w-[20%] flex justify-end items-center">
                            <BsFillTrashFill
                              className=" cursor-pointer text-2xl "
                              color="red"
                              buttonType="filled"
                              rounded={false}
                              block={false}
                              iconOnly={false}
                              ripple="light"
                              onClick={() => handleRemoveFromCart(item._id)}
                            />
                          </div>
                        </div>

                        <div className="w-[full] flex justify-between items-center">
                          <div className="bg-[#F7F8FD] p-3 rounded-lg h-14 flex items-center justify-between lg:px-3 font-bold w-[50%]">
                            <button
                              className="text-[#FF7D1A] text-2xl leading-none font-bold mb-1 lg:text-3xl hover:opacity-60"
                              onClick={() => handleDecrement(index)}
                            >
                              -
                            </button>
                            <input
                              className="focus:outline-none bg-[#F7F8FD] font-bold flex text-center w-full border-0"
                              type="number"
                              defaultValue={1}
                              min={1}
                              max={100}
                              value={item.quantity}
                              onChange={(e) => {
                                const updatedCart = [...cart];
                                updatedCart[index].quantity = parseInt(e.target.value);
                                setCart(updatedCart);
                                updateCartItemQuantity(item._id, parseInt(e.target.value));
                              }}
                            />
                            <button
                              className="text-[#FF7D1A] text-2xl leading-none font-bold lg:text-3xl hover:opacity-60"
                              onClick={() => handleIncrement(index)}
                            >
                              +
                            </button>
                          </div>
                          <p className="text-base font-black leading-none text-gray-800 my-auto">{item.product?.price} €</p>
                        </div>
                      </div>
                    </>
                  ))))}
            </div>
            <div className="xl:w-1/3 lg:w-1/2 sm:w-full w-full bg-gray-100 h-full">
              <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                <div>
                  <p className="text-4xl font-black leading-9 text-gray-800">Kopsavilkums</p>
                  <div className="flex items-center justify-between pt-16 border-b-4">
                    <p className="text-base leading-none text-gray-800">Bez PVN</p>
                    <p className="text-base leading-none text-gray-800">{totalPrice.toFixed(2)} €</p>
                  </div>
                  <div className="flex items-center justify-between pt-5 border-b-4">
                    <p className="text-base leading-none text-gray-800">PVN (10%)</p>
                    <p className="text-base leading-none text-gray-800">{(totalPrice * 0.1).toFixed(2)} €</p>
                  </div>
                  <div className="flex items-center justify-between pt-5 border-b-4">
                    <p className="text-base leading-none text-gray-800">Atlaide</p>
                    {totalDiscountedPrice > 0 && (
                      <p className="text-base leading-none text-gray-800">{totalDiscountedPrice.toFixed(2)} €</p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center pb-2 justify-between lg:pt-5 pt-20">
                    <p className="text-2xl leading-normal text-gray-800">Kopsumma</p>
                    <p className="text-2xl font-bold leading-normal text-right text-gray-800">{((totalPrice * 1.1) - totalDiscountedPrice).toFixed(2)} €</p>
                  </div>
                  <Checkout />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
      <style>
        {` /* width */
                #scroll::-webkit-scrollbar {
                    width: 1px;
                }

                /* Track */
                #scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                /* Handle */
                #scroll::-webkit-scrollbar-thumb {
                    background: rgb(133, 132, 132);
                }
`}
      </style>
    </>
  );
}

export default Cart;