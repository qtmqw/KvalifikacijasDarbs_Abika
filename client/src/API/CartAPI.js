import { useState, useEffect } from 'react';
import axios from 'axios';
import { userR, CartR } from "../utils/APIRoutes";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { toast } from 'react-toastify';

export const useUserData = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios
            .post(userR, { token })
            .then((response) => {
                setUserData(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return userData;
};

export const useCartData = (userData) => {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);
    const threshold = 15;

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
                    console.log(result.data);
                } else {
                    console.error(result.error);
                }
            }
        };
        fetchCart();
    }, [userData]);

    useEffect(() => {
        let updatedSubtotal = 0;
        let updatedDiscount = 0;

        cart.forEach((item) => {
            if (item.product.discount && item.product.discountPrice > 0) {
                updatedSubtotal += item.product.discountPrice * item.quantity;
            } else {
                updatedSubtotal += item.product.price * item.quantity;
            }
        });

        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

        if (totalQuantity >= threshold) {
            updatedDiscount = updatedSubtotal * 0.05;
        }

        const updatedTax = updatedSubtotal * 0.1;
        const updatedTotal = updatedSubtotal - updatedDiscount + updatedTax;

        setSubtotal(updatedSubtotal);
        setDiscount(updatedDiscount);
        setTax(updatedTax);
        setTotal(updatedTotal);
    }, [cart]);

    return { cart, setCart, isLoading, subtotal, tax, discount, total };
};

export const useUpdateCartItemQuantity = () => {
    const updateCartItemQuantity = async (itemId, quantity) => {
        try {
            await axios.put(`${CartR}/${itemId}`, { quantity });
            toast.success("Quantity updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update quantity");
        }
    };

    return updateCartItemQuantity;
};
