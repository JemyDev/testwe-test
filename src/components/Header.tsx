import { ReactElement } from "react";
import { Navbar, Container } from 'react-bootstrap';

import logo from "../images/logo.png";

export function Header(): ReactElement {
    return (
        <Navbar bg="light" className="mb-4">
            <Container>
                <Navbar.Brand href="/">
                    <img src={logo} width="130" alt="Game of thrones" />
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}