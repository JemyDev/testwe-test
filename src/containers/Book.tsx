import { ReactElement, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { getBook } from "../stores/book";
import { getItemUrl } from "../utils";
import { characterStore, fetchCharacters, loadMore } from "../stores/characters";
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useStore } from "@nanostores/react";

export function Book(): ReactElement {
    const fetchRef = useRef<boolean>(false);
    const location = useLocation();
    const { items: characters } = useStore(characterStore);
    const book = getBook(location.pathname);

    useEffect(() => {
        const fetchData = async () => {
            await fetchCharacters();
        };

        if (!fetchRef.current) {
            fetchData();
        }

        return () => {
            fetchRef.current = true;
        };
    }, []);

    return (
        <>
            <h1>{book?.name}</h1>
            <h2>Authors: {book?.authors.join()}</h2>
            <h3>Publisher: {book?.publiser}</h3>
            <h3>Country: {book?.country}</h3>
            <h3 className="mb-4">Released at: {book?.released}</h3>
            {characters.length === 0 ? (
                <Row className="justify-content-md-center">
                    <Spinner animation="border" size="sm" />
                </Row>
            ) : (
                <>
                    <Row as="section" xs={6} md={4} className="g-4 mb-4">
                        {characters.map(character => (
                            <Col as="article" key={character.name}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{character.name}</Card.Title>
                                        {character.aliases.length && <Card.Subtitle className="mb-2 text-muted">Alias(es): {character.aliases.join()}</Card.Subtitle>}
                                        {character.born.length > 0 && <Card.Text>Born: {character.born}</Card.Text>}
                                        {character.died.length > 0 && <Card.Text>Died: {character.died}</Card.Text>}
                                        <Card.Link as={Link} to={getItemUrl(character.url)}>See character details</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Button onClick={onLoadMore} variant="primary">Load more</Button>
                </>
            )}
        </>
    );

    async function onLoadMore () {
        await loadMore();
    }
}
