import { Component, h, createEffect } from "zheleznaya";
import { loadItem, store } from "../Store";
import { Title } from "../Title";

const effect = createEffect();
export const ArticlePage: Component<{ id: string }> = ({ id }) => {
  effect(() => loadItem(id), [id])

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
