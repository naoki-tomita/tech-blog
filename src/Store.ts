import { createStore } from "zheleznaya";
import { client } from "./MicroCmsClient";
import { createRouter } from "@kojiro.ueda/zrouter";

export type TOC = {
  tagName: string;
  text: string;
  id: string;
  children: TOC[];
}

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
    tableOfContents: TOC[];
  };
}>({
  path: location.pathname,
  articles: {
    list: [],
  },
  article: {
    id: null,
    content: null,
    tableOfContents: [],
  }
});

export async function loadList() {
  const list = await client.list();

  store.articles.list = list.contents;
}

const headingTags = ["h1", "h2", "h3"];
function createTableOfContents(html: string) {
  const div = document.createElement("div");
  div.innerHTML = html;
  const headings = [...div.childNodes]
    .filter(it => headingTags.includes(it.nodeName.toLowerCase()))
    .map(it => it as HTMLElement)
    .map(it => ({ tagName: it.nodeName.toLowerCase(), text: it.textContent!, children: [], id: it.id }))
  const toc: TOC[] = []
  headings.forEach(it => {
    if (it.tagName === "h1" || toc.length === 0) {
      toc.push(it);
      return;
    }
    const children = toc[toc.length - 1].children;
    if (it.tagName === "h2" || children.length === 0) {
      children.push(it);
      return;
    }
    const grandChildren = children[children.length - 1].children;
    if (it.tagName === "h3") {
      grandChildren.push(it)
      return;
    }
  });
  return toc;
}

export async function loadItem(id: string) {
  store.article.content = null;
  store.article.id = null;
  store.article.tableOfContents = [];

  const article = await client.item(id);
  const tableOfContents = createTableOfContents(article.content);

  store.article.id = id;
  store.article.content = article;
  store.article.tableOfContents = tableOfContents;

  // for netlify.
  setTimeout(() => {(window as any).prerenderReady = true;}, 100);
}

export const { Router, Link } = createRouter(store);
