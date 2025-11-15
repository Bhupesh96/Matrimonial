const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://techwithus.in/matro/admin/plug/api/",
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
