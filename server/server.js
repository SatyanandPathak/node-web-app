const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 4000;


var app = express();

// Middleware to configure rendering public folder contents
app.use(express.static(publicPath));

app.get('/', (request, response)=> {
    response.render('index.html');
    //response.send('hello')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
