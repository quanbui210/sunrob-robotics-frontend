import { Form } from "react-bootstrap"
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

import './UserProfileForm.css'

export default function UserProfileForm() {
    return (
        <div className="form-profile-container">
            <div className="avatar">
                <div className="profile-avatar">
                    <Avatar
                        alt="User Avatar"
                        src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
                        sx={{ width: 130, height: 130 }}
                    /> 
                </div>        
                <p className="profile-name">Quan Bui</p>
                </div>
                <Form className="profile-form">
                    <Form.Group className="form-group-profile" controlId="formBasicEmail">
                        <Form.Label className="form-label">Username:</Form.Label>
                        <Form.Control
                            placeholder="username"
                            autoComplete="off"
                            className="form-control-profile"
                            name="form-name"
                            value="Quan Bui"
                        />
                    </Form.Group>
                    <Form.Group className="form-group-profile" controlId="formBasicEmail">
                        <Form.Label className="form-label">User email:</Form.Label>
                        <Form.Control
                            placeholder="email"
                            autoComplete="off"
                            className="form-control-profile"
                            name="form-useremail"
                            value="quanbui@gmail.com"
                        />
                    </Form.Group>
                    <Form.Group className="form-group-profile" controlId="formBasicEmail">
                        <Form.Label className="form-label">User role:</Form.Label>
                        <Form.Control
                            placeholder="Role"
                            autoComplete="off"
                            className="form-control-profile disabled"
                            name="form-userrole"
                            value="User"
                            disabled="true"
                        />
                    </Form.Group>
                    <Form.Group className="form-group-profile" controlId="formBasicEmail">
                        <Form.Label className="form-label">User Id:</Form.Label>
                        <Form.Control
                            placeholder="Id"
                            autoComplete="off"
                            className="form-control-profile disabled"
                            name="form-id"
                            value="q823818djadfcdasdud"
                            disabled="true"
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