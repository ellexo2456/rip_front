import {Navbar} from 'react-bootstrap';
// import Breadcrumbs from './Breadcrumbs';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./header.css"
import {Link} from "react-router-dom";

const Header: React.FC = () => {

    return (
        <Navbar expand="lg" className="bg-warning-subtle">
            <Container>
                <Navbar.Brand>
                    <Link to={"/rip_front"}>
                        AlpLib
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/*<Nav.Link href="#home">Home</Nav.Link>*/}
                        {/*<Nav.Link href="#link">Link</Nav.Link>*/}
                        <NavDropdown title="Меню" id="basic-nav-dropdown">
                            {/*<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                            {/*<NavDropdown.Item href="#action/3.2">*/}
                            {/*    Another action*/}
                            {/*</NavDropdown.Item>*/}
                            {/*<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                            {/*<NavDropdown.Divider/>*/}
                            {/*<NavDropdown.Item href="#action/3.4">*/}
                            {/*    Separated link*/}
                            {/*</NavDropdown.Item>*/}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>

                {/*<Navbar.Collapse id="basic-navbar-nav" className={"d-flex justify-content-end"}>*/}
                {/*    <Nav className="pt-3">*/}
                {/*        <Breadcrumbs/>*/}
                {/*    </Nav>*/}

                {/*</Navbar.Collapse>*/}
            </Container>
        </Navbar>
    );
};

export default Header;
