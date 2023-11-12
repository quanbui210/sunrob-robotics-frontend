import { useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router"

import { useEffect} from "react"

import {Card, CardContent, Grid, Typography} from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'


import './Dashboard.css'
import { productActions } from "../../store/product-slice"
import { authActions } from "../../store/auth-slice"
import { cartActions } from "../../store/cart-slice"





export default function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const products = useSelector(state => state.product.products)
    const allOrders = useSelector(state => state.cart.allOrders)
    const {allUsers} = useSelector(state => state.auth) || []

    useEffect(()=> {
        dispatch(productActions.getAllProducts())
        dispatch(authActions.getAllUsers())
        dispatch(cartActions.getAllOrders())
    }, [dispatch])

    function refreshPage() {
        window.location.reload(false);
    }

    const handleDelete = async(id) => {
            const confirm = window.confirm('Delete this book?')
            if(confirm) {
                await dispatch(productActions.deleteProduct(id))
                refreshPage()
            } 
    }
    const totalRev = allOrders.reduce((acc, order) => {
        return acc + order.total;
    }, 0);
    return (
        <div className="dashboard-container" style={{marginTop:"60px"}}>
            <Typography variant="h2" component="h2" mb={4} style={{textAlign:'center'}}>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: '#f8bbd0' }}>
                    <CardContent>
                        <h3>Products</h3>
                        <h2>{products.products.length}</h2>
                    </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: '#c5cae9' }}>
                    <CardContent>
                        <h3>Users</h3>
                        <h2>{allUsers.allUsers.length}</h2>
                    </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: '#ffcc80' }}>
                    <CardContent>
                        <h3>Orders</h3>
                        <h2>{allOrders.length}</h2>
                    </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: '#b2dfdb' }}>
                    <CardContent>
                        <h3>Returned Orders / Complains</h3>
                        <h2>0</h2>
                    </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: '#ffcc80' }}>
                    <CardContent>
                        <h3>Revenue</h3>
                        <h2>${totalRev}</h2>
                    </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: '#b2dfdb' }}>
                    <CardContent>
                        <h3>Categories</h3>
                        <h2>3</h2>
                    </CardContent>
                    </Card>
                </Grid>
            </Grid>

        <div className="admin-actions">
            <div className="admin-table">
            <Card className="data-card">
            <CardContent>
              <h3 style={{textAlign: 'center', marginBottom: '60px'}}>List of Products</h3>
              <AddIcon  className="add-icon" onClick={() => navigate('/dashboard/add')}>
                {' '}
              </AddIcon>
              {products.products.map((product) => (
                <div key={product._id} className="product-item">
                  <img alt="product-img" className="dashboard-img" src={product.image}></img>
                  <h4 className="a-name">{product.name}</h4>
                  <h5 className="a-name"> Category: {product.category}</h5>
                  <h5 className="a-id">Status: {product.status}</h5>
                  <h5>Reviews: {product.numOfReviews}</h5>
                  <h5 className="a-id">Rating: {product.averageRating}/5</h5>
                  <div>
                    <EditIcon
                      className="author-actions"
                      onClick={() =>navigate(`/dashboard/edit/${product._id}`)
                    }
                    />
                    <DeleteIcon
                      className="author-actions"
                        onClick={()=> handleDelete(product._id)}
                        />
                    </div>
                    </div>
                ))}
                </CardContent>
            </Card>
            </div>
         </div>

         <div className="admin-actions">
            <div className="admin-table">
            <Card className="data-card">
            <CardContent>
              <h3 style={{textAlign: 'center', marginBottom: '60px'}}>All Users</h3>
              {allUsers.allUsers.map((user) => (
                <div key={user._id} className="user-item">
                  <h5 className="a-name">{user._id}</h5>
                  <h4 className="a-name">{user.name}</h4>
                  <h5 className="a-name">{user.email}</h5>
                  <h5 className="a-id">Role: {user.role}</h5>
                </div>
                ))}
                </CardContent>
            </Card>
            </div>
         </div>

         <div className="admin-actions">
            <div className="admin-table">
            <Card className="">
                <CardContent>
                    <h3 style={{textAlign: 'center', marginBottom: '60px'}}>Orders</h3>
                    {allOrders && allOrders.map(order => (
                    <li style={{listStyleType:"none"}} key={order._id}>
                        <Grid container spacing={2} className="dashboard-order">
                        <Grid className="dashboard-grid" item xs={8}>
                            <p style={{ color: "#f49c19" }}>Id: {order._id}</p>
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
                            <p style={{ color: 'rgb(122, 133, 200)' }}>Status: {order.status}</p>
                            <p>Total: ${order.total} (tax: $9, subtotal: ${order.subtotal}, shippingFee: $29)</p>
                            <div>
                                Ordered by: {order.user.name}, email: {order.user.email}
                            </div>
                            
                        </Grid>
                        </Grid>
                    </li>
                    ))}
                </CardContent>
            </Card>
            </div>
         </div>

        </div>
    )
}