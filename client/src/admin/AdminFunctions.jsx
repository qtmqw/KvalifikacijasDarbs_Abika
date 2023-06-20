import React, { useEffect, useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { Button } from '@material-tailwind/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BsFillTrashFill } from 'react-icons/bs'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { DiscountAdd, DiscountA, Category, CategoryId, RatingP, Discount } from '../utils/APIRoutes';

const AdminFunctions = () => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [validUntil, setValidUntil] = useState('');
    const [name, setName] = useState('');
    const [discount, setDiscount] = useState([]);
    const [category, setCategory] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [modalDiscount, setModalDiscount] = useState(null);
    const [modalCategory, setModalCategory] = useState(null);
    const [modalRating, setModalRating] = useState(null);


    const handleModalOpenDiscount = () => {
        setModalDiscount(true);
    };

    const handleModalCloseDiscount = () => {
        setModalDiscount(false);
    };

    const handleModalOpenCategory = () => {
        setModalCategory(true);
    };

    const handleModalCloseCategory = () => {
        setModalCategory(false);

    }; const handleModalOpenRating = () => {
        setModalRating(true);
    };

    const handleModalCloseRating = () => {
        setModalRating(false);
    };

    const fetchRatings = async () => {
        try {
            const response = await axios.get(RatingP);
            setRatings(response.data.ratings);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        axios
            .get(DiscountA)
            .then((response) => setDiscount(response.data))
            .catch((error) => console.error(error));
        axios
            .get(Category)
            .then((response) => setCategory(response.data))
            .catch((error) => console.error(error));
        fetchRatings();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(DiscountAdd, {
                title,
                type,
                validUntil,
            });
            console.log(res.data);
            toast("Atlaide tika pievienota")
            window.location.reload();
            setTitle('');
            setType('');
            setValidUntil('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmitCat = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(Category, {
                name,
            });
            console.log(res.data);
            toast("Jauna kategorija tika pievienota")
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    const MySwal = withReactContent(Swal);

    const handleRemove = async (itemId) => {
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
                    const response = await axios.delete(`${CategoryId}/${itemId}`);
                    if (response.status === 200) {
                        setCategory(prevCart => prevCart.filter(item => item._id !== itemId));
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

    const handleRemoveDisc = async (itemId) => {
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
                    const response = await axios.delete(`${Discount}/${itemId}`);
                    if (response.status === 200) {
                        setDiscount(prevCart => prevCart.filter(item => item._id !== itemId));
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

    return (
        <Container >
            <h1 className="md:text-7xl sm:text-5xl text-3xl font-bold pt-[60px] text-center mx-auto mb-5">
                Funkcijas
            </h1>
            <div className='flex justify-between w-full gap-4 my-5'>
                <div className="border-0 rounded-lg shadow-lg  flex flex-col mx-auto  bg-white w-[33%]">
                    <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Atlaide
                        </h3>
                    </div>
                    <div className="relative p-6 flex-auto">
                        <form onSubmit={handleSubmit} className="flex-col flex" encType='multipart/form-data'>
                            <label className='mb-3 flex'>
                                <div className='w-[50%] pr-2'>
                                    <h3>Nosaukums</h3>
                                    <input
                                        required
                                        type="text"
                                        id="title"
                                        placeholder="Nosaukums"
                                        class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className='w-[50%] pr-2'>
                                    <h3>Datums</h3>
                                    <input
                                        required
                                        type="date"
                                        placeholder="Datums"
                                        class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        value={validUntil}
                                        onChange={(e) => setValidUntil(e.target.value)}
                                    />
                                </div>
                            </label>
                            <label className='mb-3 '>
                                <h3>Procenti</h3>
                                <div className='flex w-full items-center'>
                                    <input
                                        required
                                        type='Number'
                                        class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-[90%]"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                    </input>
                                    <div className='  mx-auto'>
                                        %
                                    </div>
                                </div>
                            </label>
                            <Button type="submit" className='bg-orange'>
                                Izveidot
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="border-0 rounded-lg shadow-lg  flex flex-col mx-auto  bg-white w-[33%]">
                    <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Kategorija
                        </h3>
                    </div>
                    <div className="relative p-6 flex-auto">
                        <form onSubmit={handleSubmitCat} className="flex-col flex">
                            <label className='mb-3 flex'>
                                <div className='w-[100%]'>
                                    <h3>Nosaukums</h3>
                                    <input
                                        required
                                        type="text"
                                        id="name"
                                        placeholder="Nosaukums"
                                        class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </label>
                            <Button type="submit" className='bg-orange mt-[30%]'>
                                Izveidot
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="border-0 rounded-lg shadow-lg  flex flex-col mx-auto  bg-white w-[33%]">
                    <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-2xl font-semibold">
                            Reitingi, Atlaides, Kategorijas
                        </h3>
                    </div>
                    <div className='flex flex-col w-full my-auto'>
                        <div className='p-3'>
                            <Button className='bg-orange w-[100%]' onClick={handleModalOpenRating}>
                                Apskatīt reitingus
                            </Button>
                        </div>
                        <Modal show={modalRating} onHide={handleModalCloseRating}>
                            <Modal.Header closeButton>
                                <Modal.Title>Reitingi</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {ratings && ratings.map((ratingItem) => (
                                    <div className='border-b-2 border-gray-300'>
                                        <div key={ratingItem.id} className='w-full'>
                                            <h5>Lietotāja ID: {ratingItem.user}</h5>
                                            <h5>Produkta ID: {ratingItem.product}</h5>
                                            <h5>Vērtējums: {ratingItem.value}</h5>
                                        </div>
                                    </div>
                                ))}
                            </Modal.Body>
                        </Modal>
                        <div className='p-3'>
                            <Button className='bg-orange w-[100%]' onClick={handleModalOpenDiscount}>
                                Apskatīt atlaides
                            </Button>
                        </div>
                        <Modal show={modalDiscount} onHide={handleModalCloseDiscount}>
                            <Modal.Header closeButton>
                                <Modal.Title>Atlaides</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {discount && discount.map((discountItem) => (
                                    <div className='flex border-b-2 border-gray-300'>
                                        <div key={discountItem.id} className='w-full'>
                                            <h5>Nosaukums: {discountItem.title}</h5>
                                            <p>Procenti: {discountItem.type} %</p>
                                            <p>Derīgs līdz: {discountItem.validUntil}</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <BsFillTrashFill
                                                className='text-red-500 cursor-pointer mr-5'
                                                rounded={false}
                                                block={false}
                                                iconOnly={false}
                                                ripple="light"
                                                onClick={() => handleRemoveDisc(discountItem._id)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </Modal.Body>
                        </Modal>
                        <div className='p-3'>
                        <Button className='bg-orange w-[100%]' onClick={handleModalOpenCategory}>
                            Apskatīt kategorijas
                        </Button>
                    </div>
                    <Modal show={modalCategory} onHide={handleModalCloseCategory}>
                        <Modal.Header closeButton>
                            <Modal.Title>Kategorijas</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {category && category.map(categoryItem => (
                                <div className='flex border-b-2 border-gray-300'>
                                    <div key={categoryItem.id} className='w-full'>
                                        <h5>Nosaukums: {categoryItem.name}</h5>
                                    </div>
                                    <div className='flex items-center'>
                                        <BsFillTrashFill
                                            className='text-red-500 cursor-pointer mr-5'
                                            rounded={false}
                                            block={false}
                                            iconOnly={false}
                                            ripple="light"
                                            onClick={() => handleRemove(categoryItem._id)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Modal.Body>
                    </Modal>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default AdminFunctions