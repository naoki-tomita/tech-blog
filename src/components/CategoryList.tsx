import { Component, h } from "zheleznaya";
import { css } from "zstyl";
import { Category, Link } from "../Store";

export const CategoryList: Component<{ categories: Category[] }> = ({ categories }) => {
  return (
    <ul
      class={css`
        padding: 0;
        display: flex;
        gap: 8px;
        font-size: 12px;
        margin: 0;
      `}
    >
      {categories.map(it =>
        <li class={css`
          list-style: none;
          margin: 0;
        `}>
          <Link href={`/?categories=${it.id}`}>
            <code class={css`
              &:hover {
                text-decoration: underline;
              }
            `} >
              {it.name}
            </code>
          </Link>
        </li>
      )}
    </ul>
  );
}
