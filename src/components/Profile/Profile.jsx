import OrderHistory from "../history/OrderHistory"
import UserProfileForm from "./UserProfileForm";


export default function Profile() {
    return (
        <div>
                <div>
                    <UserProfileForm/>
                </div>
                <div >
                    <h2 style={{textAlign: 'center'}}>My Orders</h2>
                    <OrderHistory/> 
                </div>
        </div>
    )
}