import { Component, h, createEffect } from "zheleznaya";
import { loadList, store, Link } from "../Store";
import { Title } from "../components/Title";
import { css } from "zstyl";

function toDateString(date: Date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

const effect = createEffect();
export const ListPage: Component = () => {

  effect(() => loadList(), []);
  return (
    <section>
      <Title label="Tech blog" />
      <ul class={css`list-style: none; padding: 0;`}>
        {store.articles.list.map(it =>
          <li class={css`
            display: flex;
            gap: 8px;
            align-items: end;
          `}>
            <Link href={`/${it.id}`}>
              {it.title}
            </Link>
            <span
              class={css`
                font-size: 16px;
              `}
            >
              {toDateString(new Date(it.publishedAt))}
            </span>
          </li>
        )}
      </ul>
    </section>
  );
}
