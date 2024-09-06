import { createStore } from "zheleznaya";
import { categoriesClient, client } from "./MicroCmsClient";
import { createRouter } from "@kojiro.ueda/zrouter";

export type TOC = {
  tagName: string;
  text: string;
  id: string;
  children: TOC[];
};

export type AbstractArticle = {
  id: string;
  title: string;
  publishedAt: string;
  categories: Array<{
    id: string;
    name: string;
  }>
}

export type Article = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  categories: Array<{
    id: string;
    name: string;
  }>
}

export type Category = {
  id: string;
  name: string;
}

export const store = createStore<{
  path: string;
  articles: {
    list: AbstractArticle[];
    count: number;
    page: number;
  };
  article: {
    content: Article | null;
    tableOfContents: TOC[];
  };
  categories: {
    list: Category[],
  },
}>({
  path: location.pathname,
  articles: {
    list: [],
    count: 0,
    page: 0,
  },
  article: {
    content: null,
    tableOfContents: [],
  },
  categories: {
    list: [],
  }
});

export const PageSize = 10;
export async function loadList(page: number, categories: string[]) {
  const list = await client.list(
    page * PageSize,
    { filters: categories.map((it) => `categories[contains]${it}`).join("[or]") },
  );

  store.articles.list = list.contents;
  store.articles.count = list.totalCount;
  store.articles.page = page;
}

export async function loadCategories() {
  const categories = await categoriesClient.list(0);
  store.categories.list = categories.contents;
}

const headingTags = ["h1", "h2", "h3"];
function createTableOfContents(html: string) {
  const div = document.createElement("div");
  div.innerHTML = html;
  const headings = [...div.childNodes]
    .filter((it) => headingTags.includes(it.nodeName.toLowerCase()))
    .map((it) => it as HTMLElement)
    .map((it) => ({
      tagName: it.nodeName.toLowerCase(),
      text: it.textContent!,
      children: [],
      id: it.id,
    }));
  return headings.reduce((p, it) => {
    if (it.tagName === "h1" || p.length === 0) {
      p.push(it);
      return p;
    }
    const children = p[p.length - 1].children;
    if (it.tagName === "h2" || children.length === 0) {
      children.push(it);
      return p;
    }
    const grandChildren = children[children.length - 1].children;
    if (it.tagName === "h3") {
      grandChildren.push(it);
      return p;
    }
    return p;
  }, [] as TOC[]);
}

export async function loadItem(id: string) {
  store.article.content = null;
  store.article.tableOfContents = [];

  const article = await client.item(id);
  const tableOfContents = createTableOfContents(article.content);

  store.article.content = article;
  store.article.tableOfContents = tableOfContents;

  // for netlify.
  setTimeout(() => {
    (window as any).prerenderReady = true;
  }, 100);
}

export const { Router, Link, onRouteChange } = createRouter(store);
