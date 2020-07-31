const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/information',require('./routes/informationR'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
});
