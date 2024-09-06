import { store } from "../Store";

export function useQuery(): { page: number, categories: string[] } {
  const page = new URL(`${location.origin}${store.path}`).searchParams.get("page") ?? "0";
  const categories = new URL(`${location.origin}${store.path}`).searchParams.get("categories")?.split(",") ?? [];
  return {
    page: parseInt(page, 10),
    categories,
  }
}
