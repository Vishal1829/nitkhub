import React, { useState } from 'react';
import axios from 'axios'

import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import KeyIcon from 'react-bootstrap-icons/dist/icons/key-fill'
import EyeIcon from 'react-bootstrap-icons/dist/icons/eye-fill'
import CloseEye from 'react-bootstrap-icons/dist/icons/eye-slash-fill'

import Button from '@material-ui/core/Button'

import Colors from '../assets/Colors';


function ProfilePanel({ user }) {

    axios.defaults.baseURL = 'http://www.localhost:3001'

    const [loginEr, setLoginEr] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [oeye, setOEye] = useState(true)
    const [neye, setNEye] = useState(true)

    const eyeToggle = (count) => {
        var ele = count ? 'newpass' : 'oldpass'
        var element = document.getElementById(ele)
        if (element.getAttribute('type') === 'password') {
            element.setAttribute('type', 'text')
            count ? setNEye(!neye) : setOEye(!oeye)
        }
        else {
            count ? setNEye(!neye) : setOEye(!oeye)
            element.setAttribute('type', 'password')
        }
    }

    const onchange = (e) => {
        setLoginEr("")

        if (e.target.name === 'oldpassword')
            setOldPassword(e.target.value)
        else
            setNewPassword(e.target.value)
    }

    const changePassword = async (e) => {
        e.preventDefault()
        const formData = { email: user.email, oldpassword: oldPassword, newpassword: newPassword }

        await axios.post('/auth/changePassword', formData, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then((res) => {
            if (res.data.error)
                setLoginEr(res.data.error)
            else {
                setLoginEr(res.data.message)
                setOldPassword("")
                setNewPassword("")
            }
        })
    }

    return (
        <div className="timeline">

            <div className="container">
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-2" style={{ color: '#4366B5' }}> Personal Details</h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="firstName">First Name</label>
                                            <input type="text" className="form-control dis_back" id="firstName" placeholder={user.first_name} disabled />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input type="text" className="form-control dis_back" id="lastName" placeholder={user.last_name} disabled />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="eMail">Email</label>
                                            <input type="email" className="form-control dis_back" id="eMail" placeholder={user.email} disabled />
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="gender">Gender</label>
                                            <input type="text" className="form-control dis_back" id="gender" placeholder={user.gender} disabled />
                                        </div>
                                    </div>
                                </div>

                                <Form onSubmit={(e) => changePassword(e)}>
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <h6 className="mt-3 mb-2" style={{ color: '#4366B5' }}>Change Password</h6>
                                            {loginEr && <h5 style={{ color: Colors.lightred, marginTop: "3px", fontSize: 15 }}>{loginEr}</h5>}
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            {/* Old Password */}
                                            <Form.Group id="oldpassword" className="my-3">
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text style={{ backgroundColor: 'transparent', border: 'none' }}>
                                                            <KeyIcon size={20} style={{ color: Colors.lightBlue }} />
                                                        </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control className="custom-button" type="password" placeholder="Enter Old Password" name="oldpassword"
                                                        value={oldPassword}
                                                        id="oldpass"
                                                        minLength="6"
                                                        onChange={(e) => onchange(e)}
                                                        required
                                                    />
                                                    {!oeye && <EyeIcon size={20} className="d-flex align-self-center" onClick={() => eyeToggle(0)} style={{ color: Colors.lightBlue, cursor: 'pointer' }} />}
                                                    {oeye && <CloseEye size={20} className="d-flex align-self-center" onClick={() => eyeToggle(0)} style={{ color: Colors.lightBlue, cursor: 'pointer' }} />}
                                                </InputGroup>
                                            </Form.Group>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            {/* New Password */}
                                            <Form.Group id="newpassword" className="my-3">
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text style={{ backgroundColor: 'transparent', border: 'none' }}>
                                                            <KeyIcon size={20} style={{ color: Colors.lightBlue }} />
                                                        </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control className="custom-button" type="password" placeholder="Enter New Password" name="newpassword"
                                                        value={newPassword}
                                                        id="newpass"
                                                        minLength="6"
                                                        onChange={(e) => onchange(e)}
                                                        required
                                                    />
                                                    {!neye && <EyeIcon size={20} className="d-flex align-self-center" onClick={() => eyeToggle(1)} style={{ color: Colors.lightBlue, cursor: 'pointer' }} />}
                                                    {neye && <CloseEye size={20} className="d-flex align-self-center" onClick={() => eyeToggle(1)} style={{ color: Colors.lightBlue, cursor: 'pointer' }} />}
                                                </InputGroup>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="text-center">
                                                <Button type="submit" variant="contained"
                                                    color="primary">UPDATE</Button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePanel;