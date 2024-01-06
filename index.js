// making up server - initialising express

const express = require('express');
const server = express();
const PORT = 8080;

server.get('/', (req, res) => {
    res.json({status : 'success'});
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
})




