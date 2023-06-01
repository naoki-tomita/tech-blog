import type { Handler } from "@netlify/functions";
import { readdir } from "fs/promises";

export const handler: Handler = async (event, context) => {
  try {
    console.log(await readdir("/var"))
    console.log(await readdir("/var/task"))
    console.log(await readdir("/var/task/node_modules"))
    console.log(await readdir("/var/task/node_modules/canvas"))
    console.log(await readdir("/var/task/node_modules/canvas/build"))

    return {
      statusCode: 200,
      // headers: { "content-type": "image/jpeg" },
      // isBase64Encoded: true,
      // body: dirs.join(", ")
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching images' }),
    };
  }
};
