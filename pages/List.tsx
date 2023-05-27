import { Component, h } from "zheleznaya";
import { createEffect } from "../Effect";
import { loadList, store, Link } from "../Store";
import { Title } from "../Title";

const listEffect = createEffect();
export const ListPage: Component = () => {

  listEffect(() => loadList(), []);
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
