  import { Component, h, createEffect } from "zheleznaya";
import { loadList, store, Link, AbstractArticle, loadCategories } from "../Store";
import { Title } from "../components/Title";
import { css } from "zstyl";
import { Pagination } from "../components/Pagination";
import { CategoryList } from "../components/CategoryList";
import { useQuery } from "../hooks/useQuery";

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
          <CategoryList categories={it.categories} />
        </li>
      ))}
    </ul>
  );
}

const loadListEffect = createEffect();
const loadCategoryEffect = createEffect();
export const ListPage: Component = () => {
  // ここはzrouterをもっと良くして、いい感じに宣言的に書けるようにしたい
  const { page, categories } = useQuery();
  loadListEffect(() => loadList(page, categories), [page, categories?.join(",")]);
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
