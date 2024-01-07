// making up server - initialising express

const express = require('express');
const server = express();
const PORT = 8080;

//Routes 
const productRouter = require('./routes/Product');
const brandRouter = require('./routes/Brand');
const categoryRouter = require('./routes/Category');

// connection with mongoose
const mongoose = require("mongoose");
const { createProduct } = require('./controller/Product');
// ! after doing this make connection with mongodb, for that, go to your project directory, outside your project directory, make new dir named as "data", after that, go to one step above that data directory, and run this command "mongod --dbpath=./data", this will start your mongodb server, now you can connect with mongodb

// * Middleware
server.use(express.json()); // this will parse the json data from the body of the request

// * Routes
server.use('/products', productRouter.router);
server.use('/brands', brandRouter.router);
server.use('/categories', categoryRouter.router);

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB...');
}

server.get('/', (req, res) => {
    res.json({status : 'success'});
});



server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
})




