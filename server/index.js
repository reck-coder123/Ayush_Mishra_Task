const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./db/db');
const tickerRoute = require('./routes/ticker');
const { Ticker } = require('./models/tickets');
const app = express();
const port = process.env.PORT;

// Connection to database
db();

// Fetch API
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const ApiData = async () => {
  try {
    const response = await fetch('https://api.wazirx.com/api/v2/tickers');
    const data = await response.json();

    const tickers = Object.values(data).slice(0, 10).map(ticker => ({
      name: ticker.name,
      last: ticker.last,
      buy: ticker.buy,
      sell: ticker.sell,
      volume: ticker.volume,
      base_unit: ticker.base_unit
    }));

    await Ticker.deleteMany();
    await Ticker.insertMany(tickers);

    console.log('Data saved');
  } catch (error) {
    console.log(error);
  }
};

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//save data to database
ApiData();

// Routes
app.use('/', tickerRoute);


app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
