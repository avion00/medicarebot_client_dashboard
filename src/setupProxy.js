const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://app.medicarebot.live",
      changeOrigin: true,
      secure: true, // Ensures secure connections
    })
  );
};
