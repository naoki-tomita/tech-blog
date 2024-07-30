import { createCanvas, registerFont } from "canvas";
import type { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const BackgroundColor = "#434343";
const FontColor = "#CCCCCC";
const Width = 800;
const Height = 320;

export const handler: Handler = async (event, context) => {
  try {
    const id = event.path.split("/").filter(Boolean)[3].replace(".png", "");
    const response: any = await fetch(
      `https://ku-tech.microcms.io/api/v1/blogs/${id}`,
      {
        headers: {
          "X-MICROCMS-API-KEY": "XZFkLvLrr209UvvuQBAUH4RxR6SBIVIUo2pq",
        },
      },
    ).then((it) => it.json());
    registerFont(__dirname + "/font.ttf", { family: "Rampart One" });
    const canvas = createCanvas(Width, Height);
    const context = canvas.getContext("2d");
    context.fillStyle = BackgroundColor;
    context.fillRect(0, 0, Width, Height);

    context.fillStyle = FontColor;
    context.font = `30px "Impact"`;
    context.fillText(`Tech blog`, 30, 40);
    context.font = `52px "Rampart One"`;
    context.fillText(response.title, 30, 92);

    const stream = canvas.toBuffer("image/png");

    return {
      statusCode: 200,
      headers: { "content-type": "image/png" },
      body: stream.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed fetching images" }),
    };
  }
};
