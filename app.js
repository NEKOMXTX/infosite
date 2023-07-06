const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log('Server request');
  console.log('Just for test');

  res.setHeader('Content-Type', 'text/html');

  const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

  let basePath = '';

  switch (req.url) {
    case '/':
      basePath = createPath('homepage');
      res.statusCode = 200;
      break;
    case '/products':
      basePath = createPath('products');
      res.statusCode = 200;
      break;
    case '/contact':
      basePath = createPath('contact');
      res.statusCode = 200;
      break;
    default:
      basePath = createPath('error');
      res.statusCode = 404;
      break;
  }

  const fileStream = fs.createReadStream(basePath);

  fileStream.on('open', () => {
    res.statusCode = 200;
    fileStream.pipe(res);
  });

  fileStream.on('error', (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end();
  });
});

server.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
