import {Button, Navbar} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "./header.css";
import {Link, useLocation} from "react-router-dom";
import {NavLink} from "react-router-dom";
import {useSelector} from "./core/store";
import {selectUser} from "./core/store/slices/selectors";
import {logout} from "./core/api/auth";
import {Helmet} from "react-helmet";


const Header: React.FC = () => {
    const location = useLocation();
    const userName = localStorage.getItem("userName");
    const {isAuth, expeditionId} = useSelector(selectUser);
    console.log("*", expeditionId, "*");

    return (
        <Navbar expand="sm" className="bg-warning-subtle">
            <Helmet>
                <style>
                    {
                        "body { font-family: 'Roboto Slab', serif; background-color: #D2DBDD; }"
                    }
                </style>
            </Helmet>

            <Container>
                <Navbar.Brand>
                    <Link to={"/rip_front"}>AlpLib</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto gap-2">
                        {!isAuth ? (
                            <>
                                <NavLink className="dropdown-item" to="/rip_front/login">
                                    Логин
                                </NavLink>
                                <NavLink className="dropdown-item" to="/rip_front/register">
                                    Регистрация
                                </NavLink>
                            </>
                        ) : (
                            <Button style={{width: "min-content"}} onClick={logout}>
                                Выйти
                            </Button>
                        )}
                        {isAuth && (
                            <div
                                style={{display: "flex", alignItems: "center", gap: "8px"}}
                            >
                                <NavLink className="dropdown-item" to="/rip_front/history">
                                    История
                                </NavLink>
                                {location.pathname === "/rip_front" &&
                                    (location.pathname === "/rip_front" &&
                                    expeditionId.length !== 0 && expeditionId ? (
                                        <NavLink
                                            className="dropdown-item m-0 p-0"
                                            to={`/rip_front/missions/${expeditionId}`}
                                        >
                                            Экспедиция
                                        </NavLink>
                                    ) : (
                                        <p style={{margin: "0", opacity: "50%"}}>Экспедиция</p>
                                    ))}
                            </div>
                        )}
                    </Nav>

                    <Navbar.Text>
                        {userName ? userName : ""}
                    </Navbar.Text>
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
