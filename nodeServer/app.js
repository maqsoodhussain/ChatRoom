const express = require('express');

const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, ()=> console.log(`Server On PORT ${PORT}`));



app.use(express.static(path.join(__dirname, 'public')));