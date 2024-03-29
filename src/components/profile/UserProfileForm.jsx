import { Form } from "react-bootstrap"
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import guyImg from '../../assets/guy.jpeg'

import { useSelector } from "react-redux";

import './UserProfileForm.css'

export default function UserProfileForm() {
    const{ userLoggedIn } = useSelector(state => state.auth)
    console.log(userLoggedIn);
    return (
        <div className="form-profile-container">
            <div className="avatar">
                <div className="profile-avatar">
                    <Avatar
                        alt="User Avatar"
                        src={guyImg}
                        sx={{ width: 130, height: 130 }}
                    /> 
                </div>        
                <p className="profile-name">{userLoggedIn.name}</p>
                </div>
                <Form className="profile-form">
                    <Form.Group className="form-group-profile" controlId="formBasicEmail">
                        <Form.Label className="form-label-profile">Username:</Form.Label>
                        <Form.Control
                            placeholder="username"
                            autoComplete="off"
                            className="form-control-profile"
                            name="form-name"
                            defaultValue={userLoggedIn.name}
                        />
                    </Form.Group>
                    <Form.Group className="form-group-profile" controlId="formBasicEmail">
                        <Form.Label className="form-label-profile">User email:</Form.Label>
                        <Form.Control
                            placeholder="email"
                            autoComplete="off"
                            className="form-control-profile"
                            name="form-useremail"
                            defaultValue={userLoggedIn.email}
                        />
                    </Form.Group>
                    <Form.Group className="form-group-profile" controlId="formBasicEmail">
                        <Form.Label className="form-label-profile">User role:</Form.Label>
                        <Form.Control
                            placeholder="Role"
                            autoComplete="off"
                            className="form-control-profile disabled"
                            name="form-userrole"
                            value={userLoggedIn.role}
                            disabled={true}
                        />
                    </Form.Group>
                    <Form.Group className="form-group-profile" controlId="formBasicEmail">
                        <Form.Label className="form-label-profile">User Id:</Form.Label>
                        <Form.Control
                            placeholder="Id"
                            autoComplete="off"
                            className="form-control-profile disabled"
                            name="form-id"
                            value={userLoggedIn.userId}
                            disabled={true}
                        />
                    </Form.Group>
                    <Form.Group className="form-group-profile btn">
                        <button className="profile-save-btn">
                            Save
                        </button>
                    </Form.Group>
                </Form>
        </div>
    )
}