import { Component, h, createEffect } from "zheleznaya";
import hljs from "highlight.js";

export const Html: Component<{ html?: string }> = ({ html }) => {
  return (
    <div ref={(el) => {
      el.innerHTML = html ?? "";
      [...el.querySelectorAll("pre code")].forEach(el => hljs.highlightElement(el as HTMLElement));
    }}></div>
  );
}
