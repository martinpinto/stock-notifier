const getQuote = require('./quote.service');
const FETCH_INTERVAL = 5000;

export const trackTicker = (socket, ticker) => {
    // run the first time immediately
    getQuote(ticker);

    // every N seconds
    var timer = setInterval(() => {
        getQuote(socket, ticker);
    }, FETCH_INTERVAL);

    socket.on('disconnect', () => {
        clearInterval(timer);
    });
}