import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap'
import Spinner from '../assets/Spinner.gif';
import { Button } from '@material-tailwind/react';
import { toast } from 'react-toastify';
import axios from "axios";
import EC from "../assets/empty-cart.png"


const Cart = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:8080/userData", { token })
      .then((response) => {
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getUserCart = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/cart/${userId}`);
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
        } else {
          console.error(result.error);
        }
      }
    };
    fetchCart();
  }, [userData]);

  const deleteCartItem = async (cartItemId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/cart/${cartItemId}`);
      if (response.data.status === 'OK') {
        setCart(cart.filter((item) => item._id !== cartItemId));
        toast.success('Item removed from cart');
      } else {
        console.error(response.data.error);
        toast.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to remove item from cart');
    }
  }

  return (
    <Container className='py-10'>
      <h1 className='md:text-7xl sm:text-5xl text-3xl font-bold text-center'>Cart</h1>

      <table className='mx-auto shadow-md mt-5'>
        <thead className="bg-gray-50">
          <tr className='text-black uppercase tracking-wider'>
            <th
              scope="col"
              className="px-6 py-3 font-bold"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 font-bold"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 "
            >
              Quantity
            </th>
            <th
              scope="col"
              className="px-6 py-3 "
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 "
            >
              Remove
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-gray-200 rounded-md text-center">
          {!cart.length ? (
            <div className='flex flex-col'>
              <img src={EC} alt="" className=''/>
              <h1 className='text-base font-semibold'>Cart is empty</h1>
            </div>
          ) : (
            cart.map(item => (
              <tr>
                <th
                  scope="col"
                  className="px-6 "
                >
                  {item.product?._id}
                </th>
                <th
                  scope="col"
                  className="px-6 "
                >
                  {item.product?.title}
                </th>
                <th
                  scope="col"
                  className="px-6 "
                >
                  {item.quantity}
                </th>
                <th
                  scope="col"
                  className="px-6  "
                >
                  {item.product?.price}
                </th>
                <th
                  scope="col"
                  className="px-6 py-1 "
                >
                  <Button className="bg-red-500" onClick={() => deleteCartItem(item._id)}>
                    Delete
                  </Button>
                </th>
              </tr>
            )))}
        </tbody>
      </table>

    </Container>
  )
}

export default Cart