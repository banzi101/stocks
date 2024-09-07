const express = require('express');
const connectDb = require('./database/config');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 1000
connectDb();

app.use("/balance", require("./routes/balanceRoute"));

app.listen(port, ()=>
    console.log('Server started on port '+ port)
)
