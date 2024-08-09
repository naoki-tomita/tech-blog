  import { Component, h, createEffect } from "zheleznaya";
import { loadList, store, Link, AbstractArticle, Category, loadCategories } from "../Store";
import { Title } from "../components/Title";
import { css } from "zstyl";
import { Pagination } from "../components/Pagination";

function toDateString(date: Date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

const ArticleList: Component<{ articles: AbstractArticle[] }> = ({ articles }) => {
  return (
    <ul
      class={css`
        padding: 0;
      `}
    >
      {articles.map((it) => (
        <li
          class={css`
            list-style: none;
            display: flex;
            gap: 8px;
            align-items: end;
          `}
        >
          <Link href={`/${it.id}`}>{it.title}</Link>
          <span
            class={css`
              font-size: 16px;
            `}
          >
            {toDateString(new Date(it.publishedAt))}
          </span>
        </li>
      ))}
    </ul>
  );
}

const CategoryList: Component<{ categories: Category[] }> = ({ categories }) => {
  return (
    <ul
      class={css`
        padding: 0;
        display: flex;
        gap: 8px;
        font-size: 12px;
      `}
    >
      {categories.map(it =>
        <li class={css`
          list-style: none;
        `}>
          <code>
            {it.name}
          </code>
        </li>
      )}
    </ul>
  );
}

const loadListEffect = createEffect();
const loadCategoryEffect = createEffect();
export const ListPage: Component = () => {
  // ここはzrouterをもっと良くして、いい感じに宣言的に書けるようにしたい
  const page = new URL(`${location.origin}${store.path}`).searchParams.get("page") ?? "0";
  loadListEffect(() => loadList(parseInt(page, 10)), [parseInt(page, 10)]);
  loadCategoryEffect(loadCategories, []);
  return (
    <section>
      <Title label="Tech blog" />
      <section>
        <CategoryList categories={store.categories.list} />
      </section>
      <section>
        <ArticleList articles={store.articles.list} />
        {store.articles.count > 0 ?
          <Pagination
            currentPage={store.articles.page}
            totalCount={store.articles.count}
            onPageChange={(page) => (store.articles.page = page)}
          /> :
          <div />}
      </section>
    </section>
  );
};
