import { createStore } from "zheleznaya";
import { client } from "./MicroCmsClient";

export const store = createStore<{
  path: string;
  articles: {
    list: Array<{
      id: string;
      title: string;
    }>;
  },
  article: {
    id: string | null;
    content: {
      title: string;
      content: string;
    } | null;
  };
}>({
  path: location.pathname,
  articles: {
    list: [],
  },
  article: {
    id: "",
    content: {
      title: "",
      content: "",
    },
  }
});

export async function loadList() {
  const list = await client.list();
  store.articles.list = list.contents;
}

export async function loadItem(id: string) {
  const article = await client.item(id);
  store.article.content = article;
}
