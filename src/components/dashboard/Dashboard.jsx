import { useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router"

import { useEffect } from "react"

import {Card, CardContent, Grid, Typography} from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'


import './Dashboard.css'
import { productActions } from "../../store/product-slice"





export default function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const products = useSelector(state => state.product.products)

    useEffect(()=> {
        dispatch(productActions.getAllProducts())
    }, [dispatch])

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
                        <h2>30</h2>
                    </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: '#c5cae9' }}>
                    <CardContent>
                        <h3>Users</h3>
                        <h2>20</h2>
                    </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: '#ffcc80' }}>
                    <CardContent>
                        <h3>Orders</h3>
                        <h2>20</h2>
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
                        <h2>$3200</h2>
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
              <h3>List of Products</h3>
              <AddIcon className="add-icon" onClick={() => navigate('/dashboard/add')}>
                {' '}
                Add a book
              </AddIcon>
              {products.products.map((product) => (
                <div key={product._id} className="product-item">
                  <h5 className="a-book">ID: {product._id}</h5>
                  <h4 className="a-name">{product.name}</h4>
                  <h5 className="a-name"> Category: {product.category}</h5>
                  <h5 className="a-id">Status: {product.status}</h5>
                  <h5>Sold: 12</h5>
                  <h5 className="a-id">Rating: {product.averageRating}/5</h5>
                  <div>
                    <EditIcon
                      className="author-actions"
                      onClick={() =>navigate(`/dashboard/edit/${product._id}`)
                    }
                    />
                    <DeleteIcon
                      className="author-actions"
                      onClick={() => {
                        const confirm = window.confirm('Delete this book?')
                        if(confirm) {
                            dispatch(productActions.deleteProduct(product._id))
                            navigate('/dashboard')
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
            </div>

        </div>
    )
}