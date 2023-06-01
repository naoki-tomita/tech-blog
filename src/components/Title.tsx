import { Component, h } from "zheleznaya";
const _title = document.querySelector("title")!;
const _ogpTitle = document.querySelector("meta[property='og:title']")!;
export const Title: Component<{ label: string }> = ({ label }) => {
  _title.innerText = label;
  _ogpTitle.setAttribute("content", label);
  return <div></div>;
}
