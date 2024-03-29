const express = require('express');
const app = express();

const PORT = 8000;

app.get('/', (req, res) => {
    res.status(200).send('hello world')
});



app.listen(PORT, ()=> console.log(`It's alive on port ${PORT}`))