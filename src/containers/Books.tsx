import { ReactElement, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { Link } from "react-router-dom";
import { bookStore, allBooks } from "../stores/book";
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import { getItemUrl } from "../utils";

export function Books(): ReactElement {
    const { items: books } = useStore(bookStore);
  
    useEffect(() => {
        const fetchBooks = async () => {
            await allBooks();
        };

        fetchBooks();
    }, []);

    return (
        <>
            {books.length === 0 ? (
                <Row className="justify-content-md-center">
                    <Spinner animation="border" size="sm" />
                </Row>
            ) : (
                <Row as="main" xs={6} md={4} className="g-4">
                    {books.map(book => (
                        <Col key={book.isbn}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{book.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Author(s): {book.authors.join()}</Card.Subtitle>
                                    <Card.Text className="mb-0">Released at: {book.released}</Card.Text>
                                    <Card.Text>Number of pages: {book.numberOfPages}</Card.Text>
                                    <Card.Link as={Link} to={`/${getItemUrl(book.url)}`}>See book details</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
}
