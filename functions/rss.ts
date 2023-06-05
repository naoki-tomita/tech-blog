import { h, renderToText } from "zheleznaya";

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

const Rss = ({ entries }) => {
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


export const handler = async () => {
  try {
    const entries = await fetch(`https://ku-tech.microcms.io/api/v1/blogs`, { headers: { "X-MICROCMS-API-KEY": "XZFkLvLrr209UvvuQBAUH4RxR6SBIVIUo2pq" } }).then(it => it.json());
    return {
      statusCode: 200,
      headers: { "content-type": "text/html" },
      body: renderToText(<Rss entries={entries}/>)
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create feed.' }),
    };
  }
};
