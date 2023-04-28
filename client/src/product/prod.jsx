import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductAdd = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState([]);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8080/category/category')
      .then((response) => setCategory(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('color', color);
    formData.append('price', price);
    formData.append('categoryIds', categories.join(','));
    formData.append('image', image);
    try {
      const res = await axios.post('http://localhost:8080/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res.data);
      // clear form data
      setTitle('');
      setDescription('');
      setColor([]);
      setPrice(0);
      setCategories([]);
      setImage(null);
    } catch (err) {
      console.error(err);
      setError(err.response.data.message);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (

    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="color">Color:</label>
        <select
          id="color"
          value={color}
          onChange={(e) => setColor([e.target.value])}
          required
        >
          <option value="">--Select a color--</option>
          <option value="Red">Red</option>
          <option value="Green">Green</option>
          <option value="Blue">Blue</option>
          <option value="White">White</option>
          <option value="Brown">Brown</option>
          <option value="Purple">Purple</option>
        </select>
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="categories">Categories:</label>
        <select
          id="categories"
          value={categories}
          onChange={(e) =>
            setCategories(Array.from(e.target.selectedOptions, (option) => option.value))
          }
          multiple
          required
        >
          <option value="">--Select categories--</option>
          {category.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" onChange={handleImageChange} required />
      </div>
      <button type='submit'>ADD</button>
    </form>
  )

};

export default ProductAdd