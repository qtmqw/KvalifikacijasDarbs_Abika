import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Product } from '../utils/APIRoutes';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import Spinner from '../assets/Spinner.gif';
import AdminProductAdd from '../admin/AdminProductAdd';
import AdminProductEdit from '../admin/AdminProductEdit';
import DIN from '../assets/din.png';
import { toast } from 'react-toastify';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        axios
            .get(Product)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const allProducts = products.map((product) => product._id);
            setSelectedProducts(allProducts);
        } else {
            setSelectedProducts([]);
        }
    };

    const handleSelectOne = (event) => {
        const productId = event.target.value;
        if (event.target.checked) {
            setSelectedProducts([...selectedProducts, productId]);
        } else {
            setSelectedProducts(selectedProducts.filter((id) => id !== productId));
        }
    };

    const handleDelete = async () => {
        for (const productId of selectedProducts) {
            try {
                /* if (window.confirm(`Are you sure you want to delete ${productId}`)) {} */
                await axios.delete(`${Product}/${productId}`);
                setProducts(products.filter((product) => product._id !== productId));
                toast("Product deleted")

            } catch (err) {
                console.log(err);
            }
        }
        setSelectedProducts([]);
    };

    return (
        <Container>
            <h1 className="md:text-7xl sm:text-5xl text-3xl font-bold pt-[60px] text-center mx-auto mb-5">
                Products
            </h1>
            <AdminProductAdd />
            <Button className="bg-red-500 w-[50%]" onClick={handleDelete}>
                Delete
            </Button>

            <div className="flex flex-col my-10">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr className='text-black text-left text-xs font-medium uppercase tracking-wider'>
                                        <th
                                            scope="col"
                                            className="px-6 py-3"
                                        >
                                            <input
                                                type="checkbox"
                                                className='checkbox checkbox-error'
                                                onChange={handleSelectAll}
                                                checked={selectedProducts.length === products.length}
                                            />
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 "
                                        >
                                            Title
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 "
                                        >
                                            Description
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 "
                                        >
                                            Color
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 "
                                        >
                                            Category
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
                                            Edit
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {!products.length ? (
                                        <img src={Spinner} alt="loading.." className='mx-auto w-[15%]' />
                                    ) : (
                                        products.map(product => (
                                            <tr key={product.id}>
                                                <td scope="row" className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        className='checkbox checkbox-error'
                                                        value={product._id}
                                                        checked={selectedProducts.includes(product._id)}
                                                        onChange={handleSelectOne}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-xl" src={`/uploads/${product.image}`} alt="" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-wrap">
                                                    <div className="text-sm text-gray-900 ">{product.description}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{product.color}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{product.category?.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {product.price}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                                    <AdminProductEdit key={product._id} product={product} />
                                                </td>
                                            </tr>
                                        )))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default AdminProducts