const http = require('http');
const fs = require('fs');
const path = require('path');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 3600 }); // Время жизни кэша - 1 час (в секундах)

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

const server = http.createServer((req, res) => {
  console.log('Server request');
  console.log('Just for test');

  res.setHeader('Content-Type', 'text/html');

  let basePath = '';

  switch (req.url) {
    case '/':
      basePath = createPath('homepage');
      break;
    case '/products':
      basePath = createPath('products');
      break;
    case '/contact':
      basePath = createPath('contact');
      break;
    default:
      basePath = createPath('error');
      res.statusCode = 404;
      break;
  }

  const cachedData = cache.get(basePath);

  if (cachedData) {
    console.log('Данные получены из кэша');
    res.statusCode = 200;
    res.end(cachedData);
  } else {
    const fileStream = fs.createReadStream(basePath);

    fileStream.on('open', () => {
      res.statusCode = 200;
      fileStream.pipe(res);

      let data = '';
      fileStream.on('data', (chunk) => {
        data += chunk;
      });

      fileStream.on('end', () => {
        console.log('Генерация данных');
        cache.set(basePath, data);
      });
    });

    fileStream.on('error', (err) => {
      console.log(err);
      res.statusCode = 500;
      res.end();
    });
  }
});

server.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
