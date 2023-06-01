import { Component, h, createEffect } from "zheleznaya";
import { loadList, store, Link } from "../Store";
import { Title } from "../components/Title";

const effect = createEffect();
export const ListPage: Component = () => {

  effect(() => loadList(), []);
  return (
    <section>
      <Title label="Tech blog" />
      <ul>
        {store.articles.list.map(it =>
          <li>
            <Link href={`/${it.id}`}>
              {it.title}
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
}
