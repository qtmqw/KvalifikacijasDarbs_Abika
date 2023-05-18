import React, { useEffect, useState } from 'react';
import { Product } from '../utils/APIRoutes';
import axios from 'axios';
import Spinner from '../assets/Spinner.gif';

const prod = () => {
  const [productsd, setProductsd] = useState([]);

  useEffect(() => {
    axios
      .get(Product)
      .then((res) => {
        setProductsd(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {productsd.map(product => (
          <div key={product.id}>
              <div>{product.discount?.title} - {product.discount?.type}% off</div>
          </div>
        ))}
    </div>
  )
}

export default prod