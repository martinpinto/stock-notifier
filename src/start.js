const fs = require('fs');
const csv = require('fast-csv'); 
const { config } = require('./config/index');

import { getQuote } from './quote.service';

const stream = fs.createReadStream("sample.csv");
const csvStream = csv()
    .on("data", function(data){
         console.log(data);
    })
    .on("end", function(){
         console.log("done");
    });
 
stream.pipe(csvStream);

const ticker = "DIS";

getQuote(ticker);
