import useFetch from "../../helper/useFetch";
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './OrderHistory.css';
import { useNavigate } from "react-router";
import Grid from '@mui/material/Grid';
const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const { data: orderData, isLoading } = useFetch('https://sunrob-ebf44-default-rtdb.europe-west1.firebasedatabase.app/orders.json');

  useEffect(() => {
    if (orderData) {
      const loadedOrders = [];
      for (let key in orderData) {
        loadedOrders.push({
          id: key,
          date: orderData[key].date,
          itemsInCart: orderData[key].orderedProducts,
          userData: orderData[key].userData,
          total: orderData[key].total
        })
      }
      setOrders(loadedOrders.reverse()); 
    }
  }, [orderData]);

  return (
    <>
      {isLoading ? (
        <p>Loading orders...</p>
      ) : (
        <Card className="order-card-container">
          <div className="history-card">
          <ul style={{ listStyleType: 'none' }}>
            {orders.length === 0 && <h3 style={{textAlign: 'center'}}>No orders yet, please make an order</h3>}
            {orders.map(order => (
              <li  key={order.id}>
                <Grid container spacing={2} className="order-grid">
                  <Grid item xs={8}>
                    <div style={{ color: "#f49c19" }}>Id: {order.id}</div>
                      <ul style={{ listStyleType: 'none', marginBottom: "20px" }}>
                        {order.itemsInCart.map(item => (
                          <li key={item.id}>
                            <img style={{ width: '100px' }} src={item.image} alt={item.name} />
                            {item.name.split(" ")[0]} x{item.quantity}
                          </li>
                        ))}
                      </ul>
                  </Grid>
                  <Grid item xs={4}>
                  <p style={{ color: '#5d9c70' }}>Order Placed on: {order.date}</p>
                      <p style={{ color: 'rgb(122, 133, 200)' }}>Ordered By:
                      </p>
                      <ul className="user-data">
                        <li>
                          Name: {order.userData.name}
                        </li>
                        <li>Email: {order.userData.email.replace(/(\w{1})[\w.-]+@([\w.]+\w)/, "$1******@$2")}</li>
                        <li>Address: {order.userData.address}</li>
                      </ul>

                      <footer className="blockquote-footer">
                        <h3 style={{
                          marginTop: '35px',
                          color:'red'
                        }}>Total: ${order.total}</h3>
                        <button className="order-btn">View Order</button>
                      </footer>
                  </Grid>
                </Grid>
              </li>
            ))}
          </ul>
          </div>

        </Card>
      )}
    </>
  )
}

export default OrderHistory;