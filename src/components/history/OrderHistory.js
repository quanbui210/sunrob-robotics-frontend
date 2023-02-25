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
          userData: orderData[key].userData,
          total: orderData[key].total
        })
      }
      setOrders(loadedOrders.reverse()); 
    }
  }, [orderData]);

  return (
    <>
      <Button className="go-back" onClick={() => {
        navigate('..')
      }}><KeyboardReturnIcon />Back</Button>
      <h1 style={{textAlign:'center', color: '#333'}}>Order History</h1>
      {isLoading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="order-container">
          <ul style={{ listStyleType: 'none' }}>
            {orders.map(order => (
              <li key={order.id}>
                <Card className="history-card">
                  <Card.Header style={{ color: "#f49c19" }}>Id: {order.id}</Card.Header>
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <ul style={{ listStyleType: 'none' }}>
                        {order.itemsInCart.map(item => (
                          <li key={item.id}>
                            <img style={{ width: '100px' }} src={item.image} alt={item.name} />
                            {item.name.split(" ")[0]} x{item.quantity}
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
                        <li>Email: {order.userData.email.replace(/(\w{1})[\w.-]+@([\w.]+\w)/, "$1******@$2")}</li>
                        <li>Address: {order.userData.address}</li>
                      </ul>
                      <footer className="blockquote-footer">
                        <h3 style={{
                          marginTop: '35px',
                          textAlign: 'center'
                        }}>Total: ${order.total}</h3>
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