import React from 'react';
import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios"
import { AuthContext } from '../helpers/AuthContext'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import PersonIcon from 'react-bootstrap-icons/dist/icons/person-circle'
import EmailIcon from 'react-bootstrap-icons/dist/icons/envelope-open-fill'
import KeyIcon from 'react-bootstrap-icons/dist/icons/key-fill'
import EyeIcon from 'react-bootstrap-icons/dist/icons/eye-fill'
import CloseEye from 'react-bootstrap-icons/dist/icons/eye-slash-fill'
import Button from 'react-bootstrap/Button'
import spinner from '../components/Spinner';

import Colors from '../assets/Colors'

function Login(props) {

    const history = useHistory()

    const styles = {
        box: {
            width: "80%",
            borderRadius: "0.8rem",
        },
        column: {
            height: "fit-content",
        },
        round: {
            bottom: "-35px",
            right: "-35px",
            borderRadius: "6vh",
            height: "10rem",
            width: "10rem",
        },
        round2: {
            borderRadius: "6vh",
            height: "100%",
            width: "100%",
            backgroundColor: Colors.lightBlue,
        },
        forms: {
            zIndex: 3,
            width: '100%',
            padding: "10px",
        },
        loginBtn: {
            fontWeight: "bold",
            backgroundColor: 'transparent',
            border: `2.5px solid ${Colors.lightBlue}`,
            borderRadius: "0.4rem",
            color: Colors.lightBlue
        }
    }
    const { setAuthState, setAuthUser, authState } = useContext(AuthContext)

    if (authState) {
        history.push('/home')
    }

    axios.defaults.baseURL = "http://www.localhost:3001"

    const [loginEr, setLoginEr] = useState("")
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [eye, setEye] = useState(true);
    const { email, password } = formData;
    const [loading, setLoading] = useState(false)

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        await axios.post('/auth/login', formData).then((res) => {
            setLoading(false)
            if (res.data.error)
                setLoginEr(res.data.error)
            else {
                setLoginEr(res.data.message)
                setAuthState(true)
                setAuthUser(res.data.user_info)
                localStorage.clear()
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("user_info", JSON.stringify(res.data.user_info))
                history.push('/home')
            }
        })
    }

    const eyeToggle = () => {
        var element = document.getElementById('lpass')
        if (element.getAttribute('type') === 'password') {
            element.setAttribute('type', 'text')
            setEye(!eye)
        }
        else {
            setEye(!eye)
            element.setAttribute('type', 'password')
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col lg={3}>
                    </Col>
                    <Col lg={6} style={styles.column} className="p-3 my-5 d-flex justify-content-center">
                        <div style={styles.box} className="d-flex align-items-center flex-column overflow-hidden p-2 shadow-box position-relative h-75">

                            <div className="animate-spin bg-danger position-absolute" style={styles.round}>
                                <div style={styles.round2} className="animate-color">

                                </div>
                            </div>

                            <div style={styles.forms}>
                                <div className="d-flex my-2 flex-column align-items-center justify-content-center">
                                    <PersonIcon size={50} color={Colors.lightBlue} />
                                    <h3 style={{ color: Colors.lightBlue, marginTop: "20px", fontSize: 35 }}>LOGIN</h3>
                                    {loading && spinner()}
                                    {loginEr && <h5 style={{ color: Colors.lightred, marginTop: "3px", fontSize: 15 }}>{loginEr}</h5>}
                                </div>
                                <Form className="d-flex flex-column" onSubmit={(e) => onSubmit(e)}>
                                    {/* Email Address */}
                                    <Form.Group id="email" className="my-3">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text style={{ backgroundColor: 'transparent', border: 'none' }}>
                                                    <EmailIcon size={20} style={{ color: Colors.lightBlue }} />
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control className="custom-button" type="email" placeholder="Enter Email" name="email" value={email} onChange={(e) => onChange(e)} />
                                        </InputGroup>
                                    </Form.Group>
                                    {/* Password */}
                                    <Form.Group id="password" className="my-3">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text style={{ backgroundColor: 'transparent', border: 'none' }}>
                                                    <KeyIcon size={20} style={{ color: Colors.lightBlue }} />
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control className="custom-button" type="password" placeholder="Enter Password" name="password"
                                                value={password}
                                                id="lpass"
                                                onChange={(e) => onChange(e)}
                                                minLength="6" />
                                            {!eye && <EyeIcon size={20} className="d-flex align-self-center" onClick={() => eyeToggle()} style={{ color: Colors.lightBlue, cursor: 'pointer' }} />}
                                            {eye && <CloseEye size={20} className="d-flex align-self-center" onClick={() => eyeToggle()} style={{ color: Colors.lightBlue, cursor: 'pointer' }} />}
                                        </InputGroup>
                                    </Form.Group>

                                    <Button type="submit" style={styles.loginBtn} className="my-4 buttons letter-spacing-3 align-self-center w-50">L O G I N</Button>

                                </Form>
                                <p>Don't have an account? <Link to="/register" className="text-decoration-none" >Sign Up</Link></p>
                            </div>

                        </div>
                    </Col>
                    <Col lg={3}>
                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default Login;