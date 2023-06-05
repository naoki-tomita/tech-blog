import { h, renderToText } from "zheleznaya";
import { Rss } from "./RssComponent";

export const handler = async () => {
  try {
    const entries = await fetch(`https://ku-tech.microcms.io/api/v1/blogs`, { headers: { "X-MICROCMS-API-KEY": "XZFkLvLrr209UvvuQBAUH4RxR6SBIVIUo2pq" } }).then(it => it.json());
    return {
      statusCode: 200,
      headers: { "content-type": "text/html" },
      body: renderToText(h(Rss, { entries })),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create feed.' }),
    };
  }
};
