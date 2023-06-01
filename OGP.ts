document.querySelector("meta[property='og:url']")!.setAttribute("content", location.href);
const paths = location.pathname.split("/");
const id = paths[paths.length - 1];
document.querySelector("meta[property='og:image']")!.setAttribute("content", `${location.origin}/.netlify/functions/ogp/${id}.jpg`);
