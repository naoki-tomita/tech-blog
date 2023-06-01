import { Component, h, createEffect } from "zheleznaya";
import { loadItem, store } from "../Store";
import { Title } from "../components/Title";
import { Html } from "../components/Html";

const effect = createEffect();
export const ArticlePage: Component<{ id: string }> = ({ id }) => {
  effect(() => loadItem(id), [id]);

  return (
    <article>
      <Title label={store.article.content?.title!} />
      <header>
        <h1>{store.article.content?.title}</h1>
      </header>
      <Html html={store.article.content?.content}/>
    </article>
  );
}
