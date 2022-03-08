import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Container, Nav } from 'react-bootstrap';

function Header() {
	
	return (
		<Navbar bg="primary" expand="lg" variant="dark">
			<Container fluid>
				<Navbar.Brand href="home">Penny Candy Store</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<LinkContainer to="/shop">
							<Nav.Link>Shop</Nav.Link>
						</LinkContainer>
					</Nav>
					<Nav className="d-flex">
						<LinkContainer to="/cart">
							<Nav.Link>
								<i className="material-icons">shopping_cart</i>
							</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;