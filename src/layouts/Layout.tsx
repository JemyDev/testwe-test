import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Container } from 'react-bootstrap';

import { Header } from "../components/Header";

export function Layout(): ReactElement {
    return (
        <>
            <Header />
            <Container>
                <Outlet />
            </Container>
        </>
    );
};
