const { getSymbolPrice } = require("../controllers/helper/finnhub");

exports.getQuote = async (req, res) => {
    try {
        const symbol = req.body.symbol;

        const data = await getSymbolPrice(symbol);

        console.log(data)
        if (!data) {
            return res.status(404).json({ message: "Symbol not found" });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};