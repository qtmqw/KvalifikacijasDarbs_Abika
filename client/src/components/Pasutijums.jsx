import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink, Font } from '@react-pdf/renderer';
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import axios from 'axios';
import { OrderP, CartR } from "../utils/APIRoutes";

import { useUserData, useCartData } from '../API/CartAPI'

Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
});

const styles = StyleSheet.create({
    page: {
        fontFamily: "Roboto"
    },
    text: {
        textAlign: 'center',
        marginTop: 20,
    },
    info: {
        padding: 20,
    },
});

const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page} >
            <View>
                <Text style={styles.text}>Rezervācija</Text>
                <Text style={styles.info}>Paldies par Jūs rezervāciju mēs sagatavosim Jūs preces 5 darba dienu laikā un gaidīsim Jūs mūsu veikalā.</Text>
            </View>
        </Page>
    </Document>
);

const DownloadPDFButton = () => {
    const userData = useUserData();
    const { cart, total, setCart } = useCartData(userData);
    const placeOrder = async () => {
        try {
            const cartId = cart[0]._id;
            // Create an array of items with their respective quantity
            const items = cart.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
            }));

            // Data to send in the request body
            const data = {
                userId: userData?.userId,
                cartId: cartId,
                items: items,
                total: total, // Total amount of the order
                readyDate: getNextWorkDays(5), // Set readyDate to the next 5 work days
            };
            console.log(data);
            const response = await axios.post(OrderP, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = response.data;
            console.log("Order placed successfully", result.order);
        } catch (error) {
            console.error("Failed to communicate with the server", error);
        }
    };

    const getNextWorkDays = (numDays) => {
        // Helper function to calculate the next work days
        const today = new Date();
        let count = 0;

        while (count < numDays) {
            today.setDate(today.getDate() + 1); // Move to the next day

            // Check if it's a work day (Monday to Friday)
            if (today.getDay() !== 0 && today.getDay() !== 6) {
                count++;
            }
        }

        // Format the date as "YYYY-MM-DD"
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const deleteCartItems = async (userId) => {
        try {
            const response = await axios.delete(`${CartR}/${userId}/delete`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete cart items');
        }
    };

    const handleDeleteCart = () => {
        deleteCartItems(userData._id)
            .then(() => {
                setCart([]);
                window.location.reload(); // Clear the cart state
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <PDFDownloadLink document={<MyDocument />} fileName="Pasūtījums.pdf">
            {({ blob, url, loading, error }) => (
                <Link to='/'>
                    <Button className="bg-orange leading-none  text-sm" disabled={loading} onClick={() => { placeOrder(); handleDeleteCart(); }}>
                        {loading ? 'Izveido PDF...' : 'Rezervēt'}
                    </Button>
                </Link>
            )}
        </PDFDownloadLink>
    );
};

const Add = () => {
    return (
        <div>
            <DownloadPDFButton />
        </div>
    );
};

export default Add;
