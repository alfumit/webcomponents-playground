import { STOCK_API_KEY } from "../../stock-api-key.js";

const express = require('express');
const app = express();
const port = 3334;
const fetch = require('node-fetch');
const apiKey = process.env['STOCK_API_KEY'] || STOCK_API_KEY;

app.use(express.static('../www'));
app.get('/stockdata', (req, res) => {
  console.log(req.query.symbol);
  const stockSymbol = 'MSFT';
  if(!apiKey) {
    return res.status(500).send({"info": "Oopsie! There seems to be no API key available on the server"});
  }
  if(!stockSymbol) {
    return res.status(400).send({"info": 'Please provide stock symbol'});
  }

  fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`)
    .then(stockResponse => stockResponse.json())
    .then(stockResponse => {
      res.status(200).send(stockResponse);
    })
    .catch(err => {
      res.status(500).send({'info': 'Something went wrong', err})
    });
});

app.listen(port, () => console.log(`Stock api server up and running on port ${port}`));
export default app;
