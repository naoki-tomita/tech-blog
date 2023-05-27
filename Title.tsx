import { Component, h } from "zheleznaya";
const _title = document.querySelector("title")!;
export const Title: Component<{ label: string }> = ({ label }) => {
  _title.innerText = label;
  return <div></div>;
}
