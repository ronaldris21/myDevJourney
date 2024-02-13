const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Specify the base API path
    createProxyMiddleware({
      target: 'http://localhost:5004', // Specify the target server
      changeOrigin: true,
    })
  );
};
