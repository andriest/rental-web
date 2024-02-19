import httpProxy from "http-proxy";

// Get the actual API_URL as an environment variable. For real
// applications, you might want to get it from 'next/config' instead.
const API_URL = process.env.API_URL;

const proxy = httpProxy.createProxy();

// You can export a config variable from any API route in Next.js.
// We'll use this to disable the bodyParser, otherwise Next.js
// would read and parse the entire request body before we
// can forward the request to the API. By skipping the bodyParser,
// we can just stream all requests through to the actual API.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  // Return a Promise to let Next.js know when we're done
  // processing the request:
  return new Promise((resolve, reject) => {
    // Rewrite the URL: strip out the leading '/api'.
    // ️You might want to adjust this depending
    // on the base path of your API.
    req.url = req.url.replace(/^\/api/, "");

    // Don't forward cookies to the API:
    req.headers.cookie = "";

    delete req.headers.host;
    delete req.headers.referer;

    // Don't forget to handle errors:
    proxy.once("error", reject);

    // Forward the request to the API
    proxy.web(req, res, {
      target: API_URL,

      // Don't autoRewrite because we manually rewrite
      // the URL in the route handler.
      autoRewrite: false,
    });
  });
}
