import { atom } from "nanostores";

export interface ApiError {
    message: string | null;
    delay?: number;
}

export const error = atom<ApiError>({
    message: null,
    delay: 5000,
});