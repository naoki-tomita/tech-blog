import { createStore } from "zheleznaya";
import { client } from "./MicroCmsClient";
import { createRouter } from "@kojiro.ueda/zrouter";

export const store = createStore<{
  path: string;
  articles: {
    list: Array<{
      id: string;
      title: string;
      publishedAt: string;
    }>;
  },
  article: {
    id: string | null;
    content: {
      title: string;
      content: string;
      publishedAt: string;
    } | null;
  };
}>({
  path: location.pathname,
  articles: {
    list: [],
  },
  article: {
    id: null,
    content: null,
  }
});

export async function loadList() {
  const list = await client.list();

  store.articles.list = list.contents;
}

export async function loadItem(id: string) {
  store.article.content = null;
  store.article.id = null;

  const article = await client.item(id);

  store.article.id = id;
  store.article.content = article;

  // for netlify.
  setTimeout(() => {(window as any).prerenderReady = true;}, 100);
}

export const { Router, Link } = createRouter(store);
