import React, { useEffect, useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { Button } from "@material-tailwind/react";
import axios from 'axios';
import { OrderG } from "../utils/APIRoutes";
import { toast } from 'react-toastify';
import { BsFillTrashFill } from 'react-icons/bs'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const AdminOrderPage = () => {

    const [orders, setOrder] = useState([]);

    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleModalOpen = (order) => {
        setSelectedOrder(order);
    };

    const handleModalClose = () => {
        setSelectedOrder(null);
    };

    useEffect(() => {
        axios
            .get(OrderG)
            .then((res) => {
                setOrder(res.data.orders);
            })
            .catch((err) => console.log(err));
    }, []);

    const MySwal = withReactContent(Swal);

    const deleteOrder = (orderId) => {
        axios
            .delete(`${OrderG}/${orderId}`)
            .then((res) => {
                const updatedOrders = orders.filter((order) => order._id !== orderId);
                setOrder(updatedOrders);
                toast.success("Order deleted successfully");
            })
            .catch((err) => {
                toast.error("Failed to delete order");
            });
    };

    const handleDeleteOrder = (orderId) => {
        MySwal.fire({
            title: 'Vēlaties izdzēst?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF7D1A',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Jā, izdzēst!',
            cancelButtonText: 'Atcelt'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteOrder(orderId);
            }
        });
    };


    return (
        <Container>
            <h1 className="md:text-7xl sm:text-5xl text-3xl font-bold pt-[60px] text-center mx-auto mb-5">
                Pasūtījumi
            </h1>
            <div className="flex flex-col my-10">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr className="text-black text-left text-xs font-medium uppercase tracking-wider">
                                        <th scope="col" className="px-6 py-3">
                                            Lietotājs
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Produkti
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Gala datums
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Kopsumma
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th>
                                            Dzēst
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.user.username} ({order.user.email})
                                            </td>
                                            <td className="pl-6 py-4 whitespace-nowrap">
                                                <Button className='bg-orange' onClick={() => handleModalOpen(order)}>
                                                    Produkts
                                                </Button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(order.readyDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.total.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select
                                                    id="status"
                                                    required
                                                    className="placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-auto"
                                                    onChange={(e) => {
                                                        const newStatus = e.target.value;
                                                        axios.patch(`${OrderG}/${order._id}/status`, { status: newStatus })
                                                            .then((res) => {
                                                                toast("Status tika izmainīts")
                                                                window.location.reload();
                                                            })
                                                            .catch((err) => {
                                                                toast("Status netika izmainīts")
                                                            });
                                                    }}
                                                >
                                                    <option>{order.status}</option>
                                                    <option value="Gatavs">Gatavs</option>
                                                    <option value="Atcelts">Atcelts</option>
                                                </select>
                                            </td>
                                            <td>
                                                {order.status.includes('Gatavs') || order.status.includes('Atcelts') ? (
                                                    <BsFillTrashFill
                                                        className="cursor-pointer text-2xl"
                                                        color="red"
                                                        buttonType="filled"
                                                        rounded={false}
                                                        block={false}
                                                        iconOnly={false}
                                                        ripple="light"
                                                        onClick={() => handleDeleteOrder(order._id)}
                                                    />
                                                ) : (
                                                    <></>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {
                                selectedOrder && (
                                    <Modal show={selectedOrder !== null} onHide={handleModalClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Pasūtījuma preces</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            {selectedOrder.items.map((item) => (
                                                <div key={item.product._id} className='border-b-2 border-solid border-gray-500'>
                                                    <p>Produkta ID: {item.product._id}</p>
                                                    <p>Daudzums: {item.quantity}</p>
                                                </div>
                                            ))}
                                        </Modal.Body>
                                    </Modal>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AdminOrderPage;
