require('dotenv').config();
let express = require('express');
let app = express();

const {SERVER_PORT} = process.env;

app.listen(SERVER_PORT || 4010, () => console.log(`Listening on port ${SERVER_PORT || 4010}`))