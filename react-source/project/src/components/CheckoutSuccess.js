import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotals } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { URL } from "../constants";
import axios from "axios";

const CheckoutSuccess = () => {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(localStorage.getItem("token"));
  const [orders, setOrders] = useState([]);
  const userToken=localStorage.getItem("token")
  
  
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);


  useEffect(() => {
    axios.get(`${URL}/orders`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }})
    .then((response) => {      
      console.log(response.data);
      setOrders(response.data);
    })
    .catch((error) => {
      console.error("Error fetching orders:", error);
    });
  }, []);
  
  return (
    <>
    {console.log(orders)}
      {
      
      orders?.length !== 0 ? (
        <div className="container">
          <h2 className="text-center">Orders Summary</h2>
          <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">Payment Status</th>
            <th scope="col">Delivery Status</th>
            <th scope="col">paymentIntentId</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <th scope="row">{index + 1}</th>
              <td>
                {order.products.map(product => (
                  <div key={product._id} className="d-flex">
                    <img
                      src={product.img}
                      alt={product.name}
                      style={{ height: "100px", width: "100px" }}
                    />
                    <div>
                      <small>{product.name}</small>
                      <br />
                      <small>{product.desc}</small>
                      <br />
                    </div>
                  </div>
                ))}
              </td>
              <td className="p-3">${order.subtotal}</td>
              <td className="p-3">
                <span className="p-1">
                  {order.products.reduce((totalQuantity, product) => totalQuantity + product.cartQuantity, 0)}
                </span>
              </td>
              <td className="p-3">${order.total}</td>
              <td className="p-3">{order.payment_status}</td>
              <td className="p-3">{order.delivery_status}</td>
              <td className="p-3">{order.paymentIntentId}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} className="text-center">
              <button
                className="btn btn-outline-secondary px-5"
                type="button"
                onClick={() => navigate("/")}
              >
                <i className="bi bi-arrow-left-short"></i> Continue Shopping
              </button>
            </td>
          </tr>
        </tfoot>
      </table>

        </div>
      ) : (
        <div className="container">
          <h2 className="text-center">Shopping Cart</h2>
          <h5 className="text-center text-muted my-3">
            Your cart is currently empty
          </h5>
          <button
            className="btn btn-outline-secondary d-block mx-auto my-4"
            type="button"
            onClick={() => navigate("/")}
          >
            <i className="bi bi-arrow-left-short text-center"></i> Start
            Shopping
          </button>
        </div>
      )}
    </>
  );
};

export default CheckoutSuccess;
