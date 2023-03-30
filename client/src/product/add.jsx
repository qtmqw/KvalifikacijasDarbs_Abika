import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch all categories and store in state
        axios.get("http://localhost:8080/prod/Cat").then((res) => {
            setCategories(res.data);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send a POST request to create the new product
        axios
            .post("http://localhost:8080/prod/", {
                name,
                description,
                price,
                categoryId: category, // Pass the selected category ID
            })
            .then((res) => {
                console.log(res.data);
                // Clear the form fields
                setName("");
                setDescription("");
                setPrice(0);
                setCategory("");
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <h2>Add a new product</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;