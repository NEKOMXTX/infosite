const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles'));

app.use(express.static('images'));

app.use(express.static('scripts'));

app.use(express.static('PDF files'));

app.get('/', (req, res) => {
    res.sendFile(createPath('homepage'));
});

app.get('/products', (req, res) => {
    res.sendFile(createPath('products'));
});

app.get('/services', (req, res) => {
    res.sendFile(createPath('services'));
});

app.get('/contact', (req, res) => {
    res.sendFile(createPath('contact'));
});

/*
app.use((req, res) => {
    res
        .status(404)
        .sendFile(createPath('error'));
}); /* перехватчик ошибок должен быть в конце  */  