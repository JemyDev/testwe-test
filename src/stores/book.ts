import { atom, action } from "nanostores";

import { API_URL } from "../config";
import { Book } from "../types/Book.type";
import { error } from "./error";

export interface BookStore {
    current: Book | null;
    items: Book[];
};

export const bookStore = atom<BookStore>({
    current: null,
    items: [],
});

export const allBooks = action(bookStore, "allBooks", async (store) => {
    fetch(`${API_URL}/books`).then(async (response) => {
        const data = await response.json();
        const parsedData = data.map((book: Book) => ({
            ...book,
            released: new Date(book.released).toLocaleString("en-US", { day: "numeric", month: "short", year: "numeric" }),
        }));
    
        store.set({
            ...store.get(),
            items: parsedData,
        });
    }).catch(() => {
        error.set({ message: "Error fetching books, please try again" });
    }); 
});

export const getBook = action(bookStore, "getBook", (store, bookUrl) => {
    const currentBook = store.get().items.find(bookItem => bookItem.url === `${API_URL}${bookUrl.slice(1, bookUrl.length)}`);

    if (currentBook) {
        store.set({
            ...store.get(),
            current: currentBook,
        });

        return store.get().current;
    }

    return null;
});
