import { Component, h } from "zheleznaya";
import { highlightElement } from "prismjs";
import "prismjs/plugins/autoloader/prism-autoloader"

declare namespace Prism.plugins.autoloader {
  let languages_path: string;
  function loadLanguages(lanauages: string[], success?: () => void, error?: () => void): void;
}

Prism.plugins.autoloader.languages_path = "https://unpkg.com/prismjs@1.29.0/components/";
export const Html: Component<{ html?: string }> = ({ html }) => {
  return (
    <div ref={(el) => {
      el.innerHTML = html ?? "";
      [...el.querySelectorAll("pre > code")]
        .map(el => [el, el.className.match(/language-(.*)/)?.[1]] as const)
        .filter(([_, lang]) => Boolean(lang))
        .forEach(([el, lang]) => Prism.plugins.autoloader.loadLanguages([lang!], () => highlightElement(el)));
    }}></div>
  );
}
