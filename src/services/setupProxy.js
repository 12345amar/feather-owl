// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://k8s.integration.feather-lab.com:32744',
      changeOrigin: true,
    })
  );
};
