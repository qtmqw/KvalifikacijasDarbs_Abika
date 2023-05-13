import React from 'react';

function PriceSummary({ cart }) {
  const totalPrice = cart.reduce((accumulator, item) => accumulator + item.product.price * item.quantity, 0);

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-lg font-medium">Price Summary</h3>
      <div className="flex justify-between mt-4">
        <span>Subtotal</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mt-2">
        <span>Tax (10%)</span>
        <span>${(totalPrice * 0.1).toFixed(2)}</span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>${(totalPrice * 1.1).toFixed(2)}</span>
      </div>
    </div>
  );
}

export default PriceSummary;