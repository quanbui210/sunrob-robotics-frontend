import {Card, CardContent, Grid, Typography} from "@mui/material"

export default function Dashboard() {
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
                        <h3>Returned</h3>
                        <h2>30</h2>
                    </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: '#ffcc80' }}>
                    <CardContent>
                        <h3>Not Returned</h3>
                        <h2>50</h2>
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

        </div>
    )
}