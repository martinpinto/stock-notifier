const https = require('https');
const { config } = require('./config/index');

const key = config.key;

export const getQuote = (ticker) => {
    let body = '';
    https.get({
        port: 443,
        method: 'GET',
        hostname: 'www.alphavantage.co',
        path: `/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${key}`,
        timeout: 1000
    }, function(response) {
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
            if (chunk && chunk.length > 0) {
                body += chunk;
            }
        })
        .on('end', () => {
            let dataObj = JSON.parse(extractWeirdCharacters(body));
            console.log(dataObj);            
        });
    });
}

function extractWeirdCharacters(data) {
    return data.replace(/([0-9])\. /g, "").replace(/(\-)+/g, "").replace(/ /g, "");
}