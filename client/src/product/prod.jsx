import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Slider, makeStyles } from '@material-ui/core/';

const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
    { id: 4, name: 'Product 4', price: 40 },
    { id: 5, name: 'Product 5', price: 50 },
];

const useStyles = makeStyles({
    root: {
      color: 'red', // change color here
    },
  });

const ProductPage = () => {
    const [value, setValue] = useState([20, 80]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleInputChange = (index) => (event) => {
        const newValue = [...value];
        newValue[index] = event.target.value;
        setValue(newValue);
    };

    
      const classes = useStyles();

    const filteredProducts = products.filter((product) => {
        return product.price >= value[0] && product.price <= value[1];
    });

    return (
        <div>
            <div>
                Price <br />
                <div className='flex justify-between mt-3'>
                    <input
                        type="number"
                        value={value[0]}
                        onChange={handleInputChange(0)}
                        min={0}
                        max={1000}
                        className="w-[20%] rounded-xl text-center appearance-none m-0 focus:outline-none focus:ring-0 bg-white"
                    />
                    <input
                        type="number"
                        value={value[1]}
                        onChange={handleInputChange(1)}
                        min={0}
                        max={1000}
                        className="w-[20%] rounded-xl text-center appearance-none m-0 focus:outline-none focus:ring-0 bg-white"
                    />
                </div>
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    step={1}
                    marks={[
                        {
                            value: 0,
                            label: "0",
                        },
                        {
                            value: 100,
                            label: "100",
                        },
                    ]}
                    classes={{ root: classes.root }}
                />
            </div>
            <div className="flex flex-wrap gap-4">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="group relative shadow-sm rounded-md mb-5">
                        <div className="max-h-30 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-transparent group-hover:opacity-75 lg:aspect-none lg:h-60 shadow-md">
                            <img
                                src={`/uploads/${product.image}`}
                                alt="..."
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                        </div>
                        <div className="mt-2 flex justify-between mx-2">
                            <div>
                                <h3 className="text-xs text-gray-700">
                                    <Link to={`/products/${product.id}`} className="text-black no-underline">
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {product.name}
                                    </Link>
                                </h3>
                                <p className="mt-1 text-xs text-gray-500">Price: {product.price} €</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
