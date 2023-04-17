import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap'
import Spinner from '../assets/Spinner.gif';
import { Button } from '@material-tailwind/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Cart = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allProducts = cart.map((product) => product._id);
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

  /*   const handleRemove = async () => {
      for (const productId of selectedProducts) {
        try {
          if (window.confirm(`Are you sure you want to delete ${productId}`)) {}
          await axios.delete();
          setProducts(products.filter((product) => product._id !== productId));
          toast("Product deleted")
  
        } catch (err) {
          console.log(err);
        }
      }
      setSelectedProducts([]);
    }; */

  return (
    <Container className='py-10 mx-auto'>
      <h1 className='md:text-7xl sm:text-5xl text-3xl font-bold text-center my-3 pb-5 '>Grozs</h1>
      <Button className="bg-red-500">
        Delete
      </Button>
      <div className='flex flex-wrap'>
        <div className="flex flex-col my-10 w-[65%] mr-[5%]">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className='text-black text-xs font-medium uppercase tracking-wider flex justify-between'>
                      <th
                        scope="col"
                        className="px-6 py-3"
                      >
                        <input
                          type="checkbox"
                          className='checkbox checkbox-error'
                          onChange={handleSelectAll}
                          checked={selectedProducts.length === cart.length}
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
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 "
                      >
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {!cart.length ? (
                      <img src={Spinner} alt="loading.." className='mx-auto w-[15%]' />
                    ) : (
                      cart.map(cat => (
                        <tr key={cat.id}>
                          <td scope="row" className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              className='checkbox checkbox-error'
                              value={cat._id}
                              checked={selectedProducts.includes(cat._id)}
                              onChange={handleSelectOne}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{cat.productId?.title}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{cat.quantity}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {cat.productId?.price}
                          </td>
                        </tr>
                      )))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='w-[30%] border-4 rounded-lg'>
          <table className="min-w-full divide-y divide-gray-200 rounded-xl">
            <thead className="bg-gray-50 rounded-xl w-full">
              <tr className='text-black text-xs font-medium uppercase tracking-wider '>
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
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  )
}

export default Cart