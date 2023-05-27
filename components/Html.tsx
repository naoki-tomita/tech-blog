import { Component, h } from "zheleznaya";

export const Html: Component<{ html?: string }> = ({ html }) => {
  return (
    <div ref={(el) => el.innerHTML = html ?? ""}></div>
  );
}
