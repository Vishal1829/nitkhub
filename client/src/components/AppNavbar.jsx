import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';
import { AuthContext } from '../helpers/AuthContext'


function AppNavbar() {
    const history = useHistory()
    const styles = {
        navbar: {
            backgroundColor: '#FFFFFF'
        }
    }

    const { authState, setAuthState, setAuthUser } = useContext(AuthContext)

    const logout = () => {
        localStorage.clear()
        setAuthState(false)
        setAuthUser({})
        history.push('/')
    }

    return (
        <>
            <Navbar sticky="top" style={styles.navbar} className='navbar-shadow' expand="lg">
                <Navbar.Brand>
                    <Nav.Link href='/' className="text-decoration-none navbar-text-color">NITK-HUB</Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        {authState &&
                            <Nav.Link href="/home" className="navbar-text-color bottom-border" >HOME</Nav.Link>
                        }
                    </Nav>
                    <Nav>
                        {!authState &&
                            <><Nav.Link href="/login" className="navbar-text-color bottom-border" >LOGIN</Nav.Link>
                                <Nav.Link href="/register" className="navbar-text-color bottom-border" >REGISTER</Nav.Link></>
                        }
                        {authState &&
                            <Nav.Link onClick={logout} className="navbar-text-color bottom-border" >LOGOUT</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default AppNavbar;