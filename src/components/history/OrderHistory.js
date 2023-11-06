import './OrderHistory.css';

import { useState, useEffect, useCallback } from 'react';

import Card from 'react-bootstrap/Card';
import Grid from '@mui/material/Grid';
import {Dialog, DialogTitle, DialogContent} from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { Form } from "react-bootstrap";

import { useNavigate } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const OrderHistory = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null)
  console.log(selectedProductId);
  const [formData, setFormData] = useState({
    rating: "How would you rate this product?",
    title: "",
    comment: "",
  });
  const [reviewSuccess, setReviewSuccess] = useState(false); // New state for tracking review success

  const {myOrders: orders, reviewFailed, reviewError} = useSelector(state => state.cart)
  console.log(reviewFailed, reviewError);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(cartActions.showUserOrder())
  }, [dispatch]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
      setOpenDialog(false); 
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }, [])

  const handleSubmit = (productId, userId) => async (e) => {
    e.preventDefault();
    const newReview = {
      title: formData.title,
      rating: formData.rating,
      comment: formData.comment,
      user: userId,
      product: productId,
    };

    try {
      await dispatch(cartActions.createReview(newReview));
      setFormData({
        rating: 1,
        title: "",
        comment: "",
      });
      setReviewSuccess(true); // Set reviewSuccess to true on successful review
      handleClose();
    } catch (error) {
      console.error("Review failed:", error);
    }
  };


  if (reviewFailed) {
    const confirm = window.confirm('Already review this product')
    if (confirm) {
      dispatch(cartActions.toggleError())
    }
  }

  if (reviewSuccess) {
    window.alert('Thanks for reviewing! We appreciate it.')
    setReviewSuccess(false)
  }

  return (
    <>
        <Card className="order-card-container">
          <div className="history-card">
          <ul style={{ listStyleType: 'none' }}>
            {orders && orders.length === 0 && <h3 style={{textAlign: 'center'}}>No orders yet, please make an order</h3>}
            {orders && orders.map(order => (
              <li  key={order._id}>
                <Grid container spacing={2} className="order-grid">
                  <Grid item xs={8}>
                    <div style={{ color: "#f49c19" }}>Id: {order._id}</div>
                      <ul style={{ listStyleType: 'none', marginBottom: "20px" }}>
                        {order.orderItems.map(item => (
                          <li className="order-li-item" key={item.id}>
                            <img style={{ width: '100px' }} src={item.image} alt={item.name} />
                            {item.name} x{item.quantity}
                          </li>
                        ))}
                      </ul>
                  </Grid>
                  <Grid item xs={4}>
                  <p style={{ color: '#5d9c70' }}>Order Placed on: {order.createdAt.split('T')[0]}</p>
                      <p style={{ color: 'rgb(122, 133, 200)' }}>Status: {order.status}
                      </p>
                      <footer className="blockquote-footer">
                        <h3 style={{
                          marginTop: '35px',
                          color:'red'
                        }}>Total: ${order.total}</h3>
                        <button className="order-btn" onClick={() => {
                            setSelectedOrder(order);
                            setOpenDialog(true);
                            setSelectedProductId(null)
                          }}>
                              View Order & Review
                        </button>
                      </footer>
                  </Grid>
                </Grid>
              </li>
            ))}
          </ul>
          </div>         
            <Dialog
              fullScreen={fullScreen}
              open={openDialog}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
              > 
                <DialogTitle id="responsive-dialog-title">
                  Review a product
                </DialogTitle>
                <DialogContent className="review-dialog">
                <Form onSubmit={(e) => handleSubmit(selectedProductId, selectedOrder.user)(e)} className="review-form">
                  <Form.Select
                  value={selectedProductId || ""}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="review-form-select" aria-label="Product">
                    <option>Select a product to review</option>
                      {selectedOrder.orderItems && selectedOrder.orderItems.map(item => <option key={item._id} value={item.id}>
                        {item.name}
                      </option>)}
                  </Form.Select>
                  <Form.Select value={formData.rating} onChange={handleInputChange} name="rating" className="review-form-select" aria-label="Rating">
                    <option>How would you rate this product?</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Select>
                  <Form.Group  className="review-form-group" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label> <br/>
                    <Form.Control 
                    value={formData.title} 
                    onChange={handleInputChange}  
                    name="title" 
                    size="lg" 
                    className="review-form-input" 
                    type="text" 
                    placeholder="Good product, reccommended" />
                  </Form.Group>
                  <Form.Group className="review-form-group" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comment</Form.Label><br/>
                    <Form.Control value={formData.comment} onChange={handleInputChange} name="comment" as="textarea" className="review-form-input-cmt" placeholder="" />
                  </Form.Group>
                  {reviewFailed && <p>{reviewError}</p>}
                  <button className="review-form-btn submit">Submit</button>
                  <button type="button" className="review-form-btn cancel" onClick={handleClose}>Cancel</button>
                </Form>
                </DialogContent>       
            </Dialog>
        </Card>
  
    </>
  )
}

export default OrderHistory;