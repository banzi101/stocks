const finnhub = require('finnhub');

async function getSymbolPrice(symbol) {
    return new Promise((resolve, reject) => {
        try {
            const api_key = finnhub.ApiClient.instance.authentications['api_key'];
            api_key.apiKey = process.env.API_KEY;

            const finnhubClient = new finnhub.DefaultApi();

            finnhubClient.quote(symbol, (err, data, response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getSymbolPrice
};
