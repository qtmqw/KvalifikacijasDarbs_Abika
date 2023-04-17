import { Product, Category } from '../utils/APIRoutes'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewProduct = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [categoryIds, setCategoryIds] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axios.get(Category);
            setCategories(res.data);
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${Product}`, {
                title,
                description,
                color,
                price,
                categoryIds,
            });
            console.log(res.data);
        } catch (err) {
            console.log(err.response.data);
        }
    };

    const handleCategoryChange = (e) => {
        const selectedCategories = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setCategoryIds(selectedCategories);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />

            <label htmlFor="color">Color</label>
            <input
                type="text"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
            />

            <label htmlFor="price">Price</label>
            <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />

            <label htmlFor="category">Categories</label>
            <select
                multiple
                id="category"
                value={categoryIds}
                onChange={handleCategoryChange}
                required
            >
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <button type="submit">Create Product</button>
        </form>
    );
};

export default NewProduct;
