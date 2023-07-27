import { Component, h, createEffect } from "zheleznaya";
import { css } from "zstyl";
import { TOC, loadItem, store } from "../Store";
import { Title } from "../components/Title";
import { Html } from "../components/Html";


const TableOfContent: Component<{ toc: TOC }> = ({ toc }) => {
  return (
    <li class={css`
      font-size: 12px;
    `}>
      <a href={`#${toc.id}`}>{toc.text}</a>
      {toc.children.length > 0 && <TableOfContents tocs={toc.children} /> || ""}
    </li>
  );

}
const TableOfContents: Component<{ tocs: TOC[] }> = ({ tocs }) => {
  return (
    <ul>
      {tocs.map(toc => <TableOfContent toc={toc}/>)}
    </ul>
  );
}


const effect = createEffect();
export const ArticlePage: Component<{ id: string }> = ({ id }) => {
  effect(() => loadItem(id), [id]);

  return (
    <div class={css`
      display: flex;
      align-items: flex-start;
      gap: 8px;
    `}>
      <article class={css`
        flex: 10;
        min-width: 0;
      `}>
        <Title label={store.article.content?.title!} />
        <header>
          <h1>{store.article.content?.title}</h1>
        </header>
        <Html html={store.article.content?.content}/>
      </article>
      <article class={css`
        flex: 3;
        min-width: 0;
        padding: 16px 16px;
      `}>
        <TableOfContents tocs={store.article.tableOfContents} />
      </article>
    </div>
  );
}
