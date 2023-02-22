import useFetch from "../../helper/useFetch";
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './OrderHistory.css';
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

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
          userData: orderData[key].userData
        })
      }
      setOrders(loadedOrders);
    }
  }, [orderData]);

  return (
    <>
      <Button className="go-back" onClick={() => {
        navigate('..')
      }}><KeyboardReturnIcon />Back</Button>
      {isLoading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="order-container">
          <ul style={{ listStyleType: 'none' }}>
            {orders.reverse().map(order => (
              <li key={order.id}>
                <Card className="history-card">
                  <Card.Header style={{ color: "#f49c19" }}>Id: {order.id}</Card.Header>
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <ul style={{ listStyleType: 'none' }}>
                        {order.itemsInCart.map(item => (
                          <li key={item.id}>
                            <img style={{ width: '100px' }} src={item.image} alt={item.name} />
                            {item.name} x{item.quantity}
                          </li>
                        ))}
                      </ul>
                      <p style={{ color: '#5d9c70' }}>Order Placed on: {order.date}</p>
                      <p style={{ color: 'rgb(122, 133, 200)' }}>Ordered By:
                      </p>
                      <ul className="user-data">
                        <li>
                          Name: {order.userData.name}
                        </li>
                        <li>Email: {order.userData.email}</li>
                        <li>Address: {order.userData.address}</li>
                      </ul>
                      <footer className="blockquote-footer">
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default OrderHistory;