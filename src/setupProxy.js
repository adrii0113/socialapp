const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://social-app-adrian.herokuapp.com',
      changeOrigin: true,
    })
  );
};