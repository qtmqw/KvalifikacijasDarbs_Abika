import React from 'react';
import { Document, Page, Text, Image, View, StyleSheet, PDFViewer, PDFDownloadLink, Font } from '@react-pdf/renderer';
import { Button } from "@material-tailwind/react";
import axios from 'axios';
import { OrderP, CartR, Product } from "../utils/APIRoutes";
import Abika from '../assets/abika.png'
import { useUserData, useCartData } from '../API/CartAPI'

Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
});

const styles = StyleSheet.create({
    page: {
        fontFamily: "Roboto"
    },
    flexContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderBottom: "1pt solid black",
        paddingBottom: 10,
    },
    image: {
        width: 180,
        height: 80,
        paddingTop: 15,
        paddingLeft: 15,
    },
    text: {
        padding: 15,
        marginLeft: "auto",
        marginTop: "auto",
    },
    flexContainerInfo: {
        display: "flex",
        alignItems: "center",
        paddingTop: 20,
    },
    info: {
        padding: 20,
        fontSize: 12,
        backgroundColor: "lightyellow",
        borderRadius: 10,
    },
    flexContainerText: {
        padding: 20,
        fontSize: 16,
    },
    text1: {
        paddingBottom: 15,
    },
    text2: {
        paddingBottom: 15,
    },
});
const MyDocument = ({ userName }) => (
    <Document>
        <Page size="A4" style={styles.page} >
            <View style={styles.flexContainer}>
                <Image src={Abika} style={styles.image} />
                <Text style={styles.text}>Rezervācija saņemta</Text>
            </View>
            <View style={styles.flexContainerInfo}>
                <Text style={styles.info}>Lūdzu, ņemiet vērā, ka rezervācijas statusu var apskatīties Jūsu profilā, kā arī tur pat var to atcelt.</Text>
            </View>
            <View style={styles.flexContainerText}>
                <Text style={styles.text1}>Sveiki {userName} </Text>
                <Text style={styles.text1}>Paldies, ka rzervējāt preces pie mums Abika.netlify.app!</Text>
                <Text style={styles.text1}>Nosūtam jums rezervācijas apstiprinājumu un rēķinu. Līdzko rezervācija būs gatava, varēsiet to saņemt mūsu uzņēmumā, kas atrodas Vagonu ielā 23.</Text>
                <Text style={styles.text1}>Jūsu rezervācijas numurs atrodas jūsu profilā, parādot to un šo lapu uz vietas, mūsu uzņēmumā, jūs varēsiet saņemt savas rezervētās preces.</Text>
                <Text style={styles.text1}>Rezervācijas informāciju atradīsiet tālāk.</Text>
                <Text style={styles.text2}>Ar cieņu</Text>
                <Text style={styles.text2}>Jūsu Abika.netlify.app komanda</Text>
            </View>
        </Page>
    </Document>
);

const DownloadPDFButton = ({ userName  }) => {
    const userData = useUserData();
    const { cart, total, setCart } = useCartData(userData);
    const placeOrder = async () => {
        try {
            const cartId = cart[0]._id;
            const items = cart.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
            }));
            const data = {
                userId: userData?.userId,
                cartId: cartId,
                items: items,
                total: total,
                readyDate: getNextWorkDays(5), 
            };

            const updatedItems = await Promise.all(
                items.map(async (item) => {
                    const response = await axios.get(`${Product}/${item.product}`);
                    const product = response.data;
                    console.log(product);
                    if (product.quantity >= item.quantity) {
                        await axios.patch(`${Product}/q/${item.product}`, { quantity: product.quantity - item.quantity });
                        return item;
                    } else {
                        console.error(
                            `Insufficient quantity for product ${product._id}`
                        );
                        throw new Error(
                            `Insufficient quantity for product ${product._id}`
                        );
                    }
                })
            );

            const updatedData = {
                ...data,
                items: updatedItems,
            };

            const response = await axios.post(OrderP, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = response.data;
            console.log("Order placed successfully", result.order);
            window.location.reload();
        } catch (error) {
            console.error("Failed to communicate with the server", error);
        }
    };

    const getNextWorkDays = (numDays) => {
        const today = new Date();
        let count = 0;
        while (count < numDays) {
            today.setDate(today.getDate() + 1);
            if (today.getDay() !== 0 && today.getDay() !== 6) {
                count++;
            }
        }
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
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <PDFDownloadLink document={<MyDocument userName={userName}/>} fileName="Pasūtījums.pdf">
            {({ blob, url, loading, error }) => (
                <>
                    {loading ? (
                        <Button className="bg-orange leading-none text-sm" disabled>
                            Izveido PDF...
                        </Button>
                    ) : (
                        <Button
                            className="bg-orange leading-none text-sm"
                            onClick={() => { placeOrder(); handleDeleteCart(); }}
                        >
                            Rezervēt
                        </Button>
                    )}
                    {error && <div>Error: {error.message}</div>}
                </>
            )}
        </PDFDownloadLink>
    );
};

const Add = () => {

    const userData = useUserData();
    const userName = userData?.name;

    return (
        <div>
            <DownloadPDFButton userName={userName}/>
        </div>
    );
};

export default Add;
