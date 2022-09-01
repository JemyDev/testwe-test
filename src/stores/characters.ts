import { atom, action } from "nanostores";

import { Character } from "../types/Character.type";
import { error } from "./error";
import { bookStore } from "./book";
import { paginate } from "../utils";

export interface CharacterStore {
    items: Character[];
    page: number;
    pageSize: number;
}

export const characterStore = atom<CharacterStore>({
    items: [],
    page: 1,
    pageSize: 10,
});

export const fetchCharacters = action(characterStore, "fetchCharacters", async (store) => {
    const charactersUrl = bookStore.get().current?.characters;

    if (charactersUrl) {
        const paginatedUrls = paginate(charactersUrl, store.get().pageSize, store.get().page);
        await Promise.all(
            paginatedUrls.map(url => fetch(url).then(response => response.json()))
        ).then(data => {
            store.set({
                ...store.get(),
                items: store.get().items.concat(data),
            });
        }).catch(() => {
            error.set({ message: "Error fetching characters, please try again" });
        });
    } else {
        error.set({ message: "Character not found" });
        return Promise.reject();
    }
});

export const loadMore = action(characterStore, "paginate", async (store) => {
    store.set({
        ...store.get(),
        page: store.get().page + 1,
    });

    await fetchCharacters();
});
