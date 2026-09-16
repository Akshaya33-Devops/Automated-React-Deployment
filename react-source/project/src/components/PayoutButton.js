import React from 'react';
import axios from 'axios';
import { URL } from '../constants';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';

const PayoutButton = ({ cartItems }) => {
  const dispatch = useDispatch();

  const handleCheckOut = async () => {
    try {
      const orderToken = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      const response = await axios.post(
        `${URL}/create-checkout-session`,
        {
          cartItems,
          userId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${orderToken}`
          }
        }
      );

      if (response.data.url) {
        dispatch(clearCart());
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <button className="btn btn-primary px-5" type="button" onClick={handleCheckOut}>
        CheckOut
      </button>
    </>
  );
};

export default PayoutButton;
