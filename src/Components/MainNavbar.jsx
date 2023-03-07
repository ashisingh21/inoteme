import React from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';


function MainNavbar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className='nav-brand' href="/">NoteMe</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link to='/about' className='nav-link'>About</Link>

                        </Nav>

                        {!localStorage.getItem('token') ? <Nav>


                            <Button className='btn mx-3 nav-btns' variant='warning'><Link to="/login">Login</Link></Button>
                            <Button variant='btn warning nav-btns'><Link to="/signup">
                                Signup
                            </Link></Button>

                        </Nav>
                            : <Button variant='warning' onClick={logout}>Logout</Button>}

                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default MainNavbar