import { h, Component } from "zheleznaya";
import { css } from "zstyl";
import { PageSize } from "../Store";

export const Pagination: Component<{
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalCount, onPageChange }) => {
  const pageCount = Math.ceil(totalCount / PageSize);
  return (
    <div
      class={css`
        display: flex;
        gap: 8px;
        margin-top: 16px;
        align-items: center;
      `}
    >
      {currentPage !== 0 ? (
        <a onclick={() => onPageChange(currentPage - 1)}>{"<-"}</a>
      ) : (
        <span>{"<-"}</span>
      )}
      <ul
        class={css`
          display: flex;
          gap: 8px;
          padding: 0;
          margin: 0;
          align-items: center;
          li {
            list-style: none;
            margin: 0;
          }
        `}
      >
        {Array(pageCount)
          .fill(null)
          .map((_, i) => (
            <li
              class={css`
                font-weight: ${currentPage === i ? "bold" : "inherit"};
              `}
            >
              {currentPage !== i ? (
                <a onclick={() => onPageChange(i)}>{i + 1}</a>
              ) : (
                i + 1
              )}
            </li>
          ))}
      </ul>
      {currentPage !== pageCount - 1 ? (
        <a onclick={() => onPageChange(currentPage + 1)}>{"->"}</a>
      ) : (
        <span>{"->"}</span>
      )}
    </div>
  );
};
