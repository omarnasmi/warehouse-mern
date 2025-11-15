require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const productsRouter = require('./routes/products');

const app = express();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use(express.json());

app.use('/api/products', productsRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});