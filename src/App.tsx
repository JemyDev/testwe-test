import { ReactElement } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Character } from "./containers/Character";
import { Book } from "./containers/Book";
import { Books } from "./containers/Books";
import { Layout } from "./layouts/Layout";

export function App(): ReactElement {
  return (
    <Routes>
      <Route path="/books" element={<Layout />}>
        <Route index element={<Books />} />
        <Route path=":id" element={<Book />} />
        <Route path=":id/characters/:characterId" element={<Character />} />
      </Route>
      <Route path="/" element={<Navigate to="/books" replace />} />
    </Routes>
  );
}
