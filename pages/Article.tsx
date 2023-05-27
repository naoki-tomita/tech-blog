import { Component, h } from "zheleznaya";
import { client } from "../MicroCmsClient";
import { loadItem, store } from "../Store";
import { createEffect } from "../Effect";
import { Title } from "../Title";

const articleEffect = createEffect();
export const ArticlePage: Component<{ id: string }> = ({ id }) => {
  articleEffect(() => loadItem(id), [id])

  return (
    <article>
      <Title label={store.article.content?.title!} />
      <header>
        <h1>{store.article.content?.title}</h1>
      </header>
      <div ref={(el) => el.innerHTML = store.article.content?.content ?? ""}></div>
    </article>
  );
}
