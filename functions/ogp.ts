import type { HandlerEvent, HandlerContext, Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
  try {
    console.log(JSON.stringify(event));
    return { statusCode: 200, body: JSON.stringify({ foo: "bar" }) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching images' }),
    };
  }
};
