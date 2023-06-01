// import { createCanvas } from "canvas";
import type { Handler } from "@netlify/functions";
import { readdir } from "fs/promises";

export const handler: Handler = async (event, context) => {
  try {
    // const id = event.path.split("/").filter(Boolean)[3];
    // const canvas = createCanvas(600, 320);
    // const context = canvas.getContext("2d");
    // context.fillStyle = "#444444";
    // context.font = "30px Impact";
    // context.fillText(`Tech blog #${id}`, 40, 40);
    // const stream = canvas.toBuffer("image/jpeg");
    const dirs = await readdir("/var/task/node_modules/canvas/build/Release");
    console.log(dirs)

    return {
      statusCode: 200,
      // headers: { "content-type": "image/jpeg" },
      // body: stream.toString("base64"),
      // isBase64Encoded: true,
      body: dirs.join(", ")
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching images' }),
    };
  }
};
