import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { host } from '../utils/APIRoutes';
const OrderForm = () => {
  const [user, setUser] = useState('');
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const handleOrder = async () => {
    try {
      // Send the order data to the backend
      const response = await axios.post(`${host}/ord/order`, { user, cart, total });

      // Handle the response
      if (response.data.success) {
        // Order created successfully
        console.log('Order placed:', response.data.order);
        // Reset the form or show a success message
      } else {
        // Order creation failed
        console.error('Failed to create order:', response.data.error);
        // Show an error message to the user
      }
    } catch (error) {
      console.error('Error creating order:', error);
      // Show an error message to the user
    }
  };

  return (
    <div>
      {/* Form fields for user, cart, and total */}
      <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
      {/* Other form fields for cart and total */}
      <Button onClick={handleOrder}>Place Order</Button>
    </div>
  );
};

export default OrderForm;
