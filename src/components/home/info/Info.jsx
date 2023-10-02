import './Info.css'

import { Grid } from '@mui/material'
import { Paper } from '@mui/material'
export default function Info () {
    return (
    <div className='info-page-container'>
        <div className='info-page-content'>
            <h2 className='info-page-content-title'>Educational-Purpose Toys for Kids</h2>
            <p className='info-page-content-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Saepe dolorum debitis consectetur reprehenderit non aliquam voluptates dolore aut vero consequuntur.</p>
        </div>
        <Grid className='infor-card-container' container spacing={2}>
            <Grid className='info-page-card' item xs={4} md={4}>
            <Paper
                    sx={{
                    height: 340,
                    width: 400,
                    backgroundColor: '#ccc',
                    }}
                    elevation={4}
                />
            </Grid>
            <Grid className='info-page-card' item xs={4} md={4}>
            <Paper
                    sx={{
                    height: 340,
                    width: 400,
                    backgroundColor: '#ccc',
                    }}
                    elevation={4}
            />
            </Grid>
            <Grid className='info-page-card' item xs={4} md={4}>
            <Paper
                    sx={{
                    height: 340,
                    width: 400,
                    backgroundColor: '#ccc',
                    }}
                    elevation={4}
            />
            </Grid>
            </Grid>
    </div>
    )
}