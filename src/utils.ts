import { API_URL } from "./config"

export function getItemUrl(url: string): string {
    return url.replace(API_URL, "");
};

export function paginate (array: any[], pageSize: number, pageNumber: number) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }