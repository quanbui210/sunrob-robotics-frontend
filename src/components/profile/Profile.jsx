import OrderHistory from "../history/OrderHistory"
import UserProfileForm from "./UserProfileForm";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
export default function Profile() {
    return (
        <div>
                <div>
                    <UserProfileForm/>
                </div>
                <div >
                    <h2 style={{textAlign: 'center'}}>Order History</h2>
                    <OrderHistory/> 
                </div>
        </div>
    )
}