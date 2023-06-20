import React, { useEffect, useState } from 'react';
import { Product, Category } from '../utils/APIRoutes';
import { Button } from "@material-tailwind/react";
import axios from 'axios';
import { PickerOverlay } from 'filestack-react';

const AdminProductAdd = () => {
    const [image, setImage] = useState('');
    const [isPickers, setIsPickers] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios
            .get(Category)
            .then((response) => setCategory(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleSubmit = async (e) => {
        try {
            const datas = { image: image.filesUploaded[0].url, title, description, color, size, price, categoryIds: categories.join(',') };
            let res = await axios.post(Product, datas);
            console.log(res.data);
        } catch (error) {
        }
    };


    return (
        <>
            <Button
                className='bg-blue-500 w-[50%] font-bold '
                type="button"
                onClick={() => setShowModal(true)}
            >
                Pievienot preci</Button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative  my-6 mx-auto max-w-3xl w-[100%]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none w-[100%]">
                                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Pievienot preci
                                    </h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
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
                                                <h3>Cena</h3>
                                                <input
                                                    required
                                                    id="price"
                                                    type="Number"
                                                    placeholder="Cena"
                                                    class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>
                                        </label>
                                        <label className='mb-3 w-full'>
                                            <h3>Apraksts</h3>
                                            <textarea
                                                id="description"
                                                required
                                                type="text"
                                                placeholder="Apraksts"
                                                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </label>
                                        <label className='mb-3 flex pb-10 justify-between'>
                                            <div className=' w-[30%] pl-2'>
                                                <h3>Krāsa</h3>
                                                <select
                                                    multiple
                                                    id="color"
                                                    required
                                                    class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full h-full"
                                                    value={color}
                                                    onChange={(e) => setColor([e.target.value])}
                                                >
                                                    <option value="">--Krāsas izvēle--</option>
                                                    <option value="Sarkans">Sarkans</option>
                                                    <option value="Zaļš">Zaļš</option>
                                                    <option value="Zils">Zils</option>
                                                    <option value="Brūns">Brūns</option>
                                                    <option value="Violēts">Violēts</option>
                                                    <option value="Melns">Melns</option>
                                                    <option value="Balts">Balts</option>
                                                    <option value="Rozs">Rozs</option>
                                                    <option value="Dzeltens">Dzeltens</option>
                                                    <option value="Orandž">Orandž</option>
                                                    <option value="Pelēks">Pelēks</option>
                                                </select>
                                            </div>

                                            <div className='w-auto pl-2'>
                                                <h3>Kategorijas</h3>
                                                {category.map((category) => (
                                                    <div key={category._id}>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                value={category._id}
                                                                className=' rounded-md mr-2 '
                                                                checked={categories.includes(category._id)}
                                                                multiple
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        setCategories([...categories, e.target.value]);
                                                                    } else {
                                                                        setCategories(categories.filter((id) => id !== e.target.value));
                                                                    }
                                                                }}
                                                            />
                                                            {category.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className='w-[30%] pl-2'>
                                                <h3>Izmērs</h3>
                                                <select
                                                    multiple
                                                    id="size"
                                                    required
                                                    class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full h-full"
                                                    value={size}
                                                    onChange={(e) => setSize([e.target.value])}
                                                >
                                                    <option value="">--Izmēra izvēle--</option>
                                                    <option value="XS">XS</option>
                                                    <option value="S">S</option>
                                                    <option value="M">M</option>
                                                    <option value="L">L</option>
                                                    <option value="XL">XL</option>
                                                    <option value="XXL">XXL</option>
                                                    <option value="30">30</option>
                                                    <option value="30.5">30.5</option>
                                                    <option value="31">31</option>
                                                    <option value="32">32</option>
                                                    <option value="32.5">32.5</option>
                                                    <option value="33">33</option>
                                                    <option value="33.5">33.5</option>
                                                    <option value="34.5">34.5</option>
                                                    <option value="35">35</option>
                                                    <option value="35.5">35.5</option>
                                                    <option value="36">36</option>
                                                    <option value="37">37</option>
                                                    <option value="37.5">37.5</option>
                                                    <option value="38">38</option>
                                                    <option value="39">39</option>
                                                    <option value="40">40</option>
                                                    <option value="41">41</option>
                                                    <option value="41.5">41.5</option>
                                                    <option value="42">42</option>
                                                    <option value="43">43</option>
                                                </select>
                                            </div>
                                        </label>
                                        <h3>Attēls</h3>
                                        <label
                                            className="flex justify-center "
                                        >
                                            {image ? (
                                                <img
                                                    src={image && image.filesUploaded[0].url}
                                                    alt="imageUploded"
                                                    className="w-[10%] h-[10%] object-cover mx-auto"
                                                />
                                            ) : (
                                                <button
                                                    onClick={() => (isPickers ? setIsPickers(false) : setIsPickers(true))}
                                                    type="button"
                                                    className="w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none text-blue-500 font-semibold"
                                                >
                                                    Attēla izvēle
                                                </button>
                                            )}
                                        </label>
                                        <div className="mt-4 relative">
                                            {isPickers && (
                                                <PickerOverlay
                                                    apikey={"AZ7q1o1bGQjKxGTdI4G9rz"}
                                                    onSuccess={(res) => {
                                                        setImage(res);
                                                        setIsPickers(false);
                                                    }}
                                                    onError={(res) => alert(res)}
                                                    pickerOptions={{
                                                        maxFiles: 1,
                                                        accept: ["image/*"],
                                                        errorsTimeout: 2000,
                                                        maxSize: 1 * 1000 * 1000,
                                                    }}
                                                />
                                            )}
                                        </div>

                                        <div className="flex items-center justify-end pt-3 border-t border-solid border-blueGray-200 rounded-b mt-4 jus">
                                            <Button type="submit">Pievienot produktu</Button>
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Aizvērt
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}
export default AdminProductAdd