import { h, renderToText, Component } from "zheleznaya";
import fetch from "node-fetch";

const React = {
  createElement: h,
};

type Blog = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  publishedAt: string;
  revisedAt: string;
  updatedAt: string;
}

const Entry: Component<{
  id: string,
  title: string,
  updatedAt: string,
  summary: string,
}> = ({ id, title, updatedAt, summary }) => {
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

export const Rss: Component<{
  entries: Blog[]
}> = ({ entries }) => {
  return (
    <feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ja">
      <id>tag:ku-tech.blog/</id>
      <title>Tech blog</title>
      <updated>{new Date().toISOString()}</updated>
      <link rel="alternate" type="text/html" href="http://ku-tech.netlify.app/feed/" />
      <link rel="self" type="application/atom+xml" href="https://ku-tech.netlify.app/.netlify/functions/rss" />
      {entries.map(it => <Entry id={it.id} title={it.title} updatedAt={it.updatedAt} summary={it.content} />)}
    </feed>
  );
}


export const handler = async () => {
  try {
    const results: any = await fetch(`https://ku-tech.microcms.io/api/v1/blogs`, { headers: { "X-MICROCMS-API-KEY": "XZFkLvLrr209UvvuQBAUH4RxR6SBIVIUo2pq" } })
      .then(it => it.json());

    return {
      statusCode: 200,
      headers: { "content-type": "text/html" },
      body: renderToText(<Rss entries={results.contents} />),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create feed.' }),
    };
  }
};


declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any;
    }
  }
}
