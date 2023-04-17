import { useState, useEffect } from "react";
import axios from "axios";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/prod/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        axios.get("http://localhost:8080/prod/carts")
            .then((response) => {
                setCart(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleAddToCart = (productId) => {
        axios.post("http://localhost:8080/prod/carts", { productId, quantity: 1 })
            .then((response) => {
                console.log(response.data.message);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <div>
                <h2>Products</h2>
                <ul>
                    {products.map((product) => (
                        <li key={product._id}>
                            {product.name} - ${product.price}
                            <button onClick={() => handleAddToCart(product._id)}>
                                Add to Cart
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {cart.map((cat) => (
                    <li key={cat._id}>
                        {cat.productId?.name} - {cat.quantity} x {cat.productId?.price}$
                    </li>
                ))}
            </div>
        </>
    );
}

export default ProductList;