import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product, Category } from "../utils/APIRoutes";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const productParams = selectedCategories.length === 0 ? "" : `?categoryId=${selectedCategories.join(",")}`;
    axios
      .get(`${Product}${productParams}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(Category)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedCategories]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    }
  };

  const filterProducts = (products) => {
    if (selectedCategories.length === 0) {
      return products;
    } else {
      return products.filter((product) => {
        return product.category.some((category) => selectedCategories.includes(category._id));
      });
    }
  };


  return (
    <div>
      <div>
        <h1 className='font-bold text-2xl ml-5'>Category</h1>
        <div className='flex flex-col space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 ml-10'>
          {categories.map(({ _id: id, name }) => (
            <label key={id}>
              <input
                type="checkbox"
                value={id}
                className=" mr-2 h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange"
                onChange={handleCategoryChange}
                checked={selectedCategories.includes(id)}
              />
              {name}
            </label>
          ))}
          <button className="bg-orange p-2 w-[50%] mx-auto">Clear All Categories</button>
        </div>
      </div>
      <div>
        <h2>Products</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Color</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filterProducts(products).map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.color.join(", ")}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
