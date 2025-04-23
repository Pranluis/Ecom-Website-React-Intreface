import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderDash.css"; // Updated CSS file
import AdminNavbar from "../AdminNavbar/AdminNavbar";

const ORDER_API_URL = "http://localhost:5201/api/Order";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    orderId: "",
    orderStatus: ""
  });

  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch all orders from the API
  const fetchOrders = async () => {
    try {
      const response = await axios.get(ORDER_API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      alert("Error fetching orders: " + (error.response?.data?.message || error.message));
    }
  };

  // Fetch a single order by ID
  const fetchOrderById = async (id) => {
    try {
      const response = await axios.get(`${ORDER_API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      alert("Error fetching order: " + (error.response?.data?.message || error.message));
      return null;
    }
  };

  // Update an existing order's status (PUT)
  const updateOrderStatus = async (id, status) => {
    try {
      const existingOrder = await fetchOrderById(id);
      if (!existingOrder) return;

      const updateUrl = `${ORDER_API_URL}/${id}`;
      console.log("Updating order with URL:", updateUrl);

      // Include all existing order data and update only the orderStatus
      const payload = {
        ...existingOrder,
        orderStatus: status
      };

      await axios.put(updateUrl, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error.response?.data || error.message);
      alert("Error updating order status: " + (error.response?.data?.message || error.message));
    }
  };

  // Delete a product (DELETE)
  const deleteOrder = async (id) => {
    try {
      const deleteUrl = `${ORDER_API_URL}/${id}`;
      console.log("Deleting order with URL:", deleteUrl);

      await axios.delete(deleteUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (error) {
      alert("Error deleting order: " + (error.response?.data?.message || error.message));
    }
  };

  // Reset the form
  const resetForm = () => {
    setFormData({
      orderId: "",
      orderStatus: ""
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <AdminNavbar />
      <div className="order-management-container">
        <h2>Order Management</h2>

        {/* Update Order Status Form */}
        {/* <form
          className="order-management-form"
          onSubmit={(e) => {
            e.preventDefault();
            updateOrderStatus(formData.orderId, formData.orderStatus);
          }}
        >
          <h3>Update Order Status</h3>
          <div className="order-management-form-group">
            <label>Order ID:</label>
            <input
              type="text"
              name="orderId"
              value={formData.orderId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="order-management-form-group">
            <label>Order Status:</label>
            <select
              name="orderStatus"
              value={formData.orderStatus}
              onChange={handleInputChange}
              required
              className="order-management-status-dropdown"
            >
              <option value="" disabled>Select Status</option>
              <option value="Shipped">Shipped</option>
              <option value="On the way">On the way</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <button type="submit" className="order-management-btn order-management-btn-primary">
            Update Order Status
          </button>
          <button type="button" className="order-management-btn order-management-btn-secondary" onClick={resetForm}>
            Reset
          </button>
        </form> */}

        <table className="order-management-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Product Details</th>
              <th>Total Price</th>
              <th>Shipping Address</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.userId}</td>
                <td>{order.productDetailsJson}</td>
                <td>{order.totalPrice}</td>
                <td>{order.shippingAddress}</td>
                <td>{order.orderStatus}</td>
                <td>{order.paymentStatus}</td>
                <td>{new Date(order.orderDateTime).toLocaleString()}</td>
                <td>
                  <select
                    className="order-management-status-dropdown"
                    onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                    defaultValue={order.orderStatus}
                  >
                    <option value="Shipped">Successfully Placed</option>
                    <option value="On the way">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <button className="order-management-btn order-management-btn-delete" onClick={() => deleteOrder(order.orderId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderManagement;
