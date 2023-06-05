import { h } from "zheleznaya";
const React = {
  createElement: h,
};

const Entry = ({ id, title, updatedAt, summary }) => {
  return (
    <entry>
      <id>https://ku-tech.netlify.app/{id}</id>
      <title>{title}</title>
      <link rel="alternate" type="text/html" href={`https://ku-tech.netlify.app/${id}`} />
      <updated>{updatedAt}</updated>
      <summary>{summary}</summary>
    </entry>
  );
}

export const Rss = ({ entries }) => {
  return (
    <feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ja">
      <id>tag:ku-tech.blog/</id>
      <title>Tech blog</title>
      <updated>{new Date().toISOString()}</updated>
      <link rel="alternate" type="text/html" href="http://ku-tech.netlify.app/feed/" />
      <link rel="self" type="application/atom+xml" href="https://ku-tech.netlify.app/.netlify/functions/rss" />
      {entries.map(it => <Entry {...it} />)}
    </feed>
  );
}
