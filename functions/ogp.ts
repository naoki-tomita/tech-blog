import { createCanvas, registerFont } from "canvas";
import type { Handler } from "@netlify/functions";
import fetch from "node-fetch";

export const handler: Handler = async (event, context) => {
  try {
    const id = event.path.split("/").filter(Boolean)[3].replace(".jpg", "");
    const response: any = await fetch(`https://ku-tech.microcms.io/api/v1/blogs/${id}`, { headers: { "X-MICROCMS-API-KEY": "XZFkLvLrr209UvvuQBAUH4RxR6SBIVIUo2pq" } }).then(it => it.json());
    registerFont(__dirname + "/font.ttf", { family: "Rampart One" });
    const canvas = createCanvas(600, 320);
    const context = canvas.getContext("2d");
    context.fillStyle = "#444444";
    context.font = `30px "Rampart One"`;
    context.fillText(`Tech blog`, 40, 40);
    context.fillText(response.title, 40, 80);
    const stream = canvas.toBuffer("image/jpeg");

    return {
      statusCode: 200,
      headers: { "content-type": "image/jpeg" },
      body: stream.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching images' }),
    };
  }
};
