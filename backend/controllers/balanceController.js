const Balance = require("../models/balanceModel");
const { getSymbolPrice } = require("../controllers/helper/finnhub");


exports.getBalance = async (req, res) => {
    try {
        const userID = req.query.userId;
        const balance = await Balance.findOne({ userID });

        if (!balance) {
            return res.status(404).json({ message: "Balance not found" });
        }

        res.status(200).json(balance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createBalance = async (req, res) => {
    try {
        const {userID} = req.body;
        console.log(userID)

        if (!userID) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const existingBalance = await Balance.findOne({ userID });
        if (existingBalance) {
            return res.status(400).json({ message: "Balance already exists" });
        }

        const newBalance = await Balance.create({
            userID: userID,
            totalValue: 0,
            totalProfitLoss: 0,
            stocks: []
        });

        res.status(201).json(newBalance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateBalance = async (req, res) => {
    try {
        const { userID, symbol, units, totalPrice, transactionType } = req.body;

        if (!['buy', 'sell'].includes(transactionType)) {
            return res.status(400).json({ message: 'Invalid transaction type' });
        }

        const balance = await Balance.findOne({ userID });

        if (!balance) {
            return res.status(404).json({ message: "Balance not found" });
        }

        let stock = balance.stocks.find(s => s.symbol === symbol);

        if (transactionType === 'buy') {
            if (stock) {
                return res.status(400).json({ message: 'Stock already exists, please sell it first before buying again.' });
            }

            balance.stocks.push({
                symbol,
                units,
                price: totalPrice / units,
                profit: 0 
            });


            balance.totalValue += totalPrice;
        } else if (transactionType === 'sell') {
            if (!stock || stock.units < units) {
                return res.status(400).json({ message: 'Not enough units to sell' });
            }


            stock.units -= units;
            const currentPrice = (await getSymbolPrice(stock.symbol)).c;

            if (isNaN(currentPrice) || isNaN(stock.price)) {
                return res.status(500).json({ message: 'Invalid price value received' });
            }

            const profit = (currentPrice - stock.price) * units;
            stock.profit = parseFloat((stock.profit + profit).toFixed(2));

            if (stock.units === 0) {
                balance.stocks = balance.stocks.filter(s => s.symbol !== symbol);
            }

            balance.totalValue -= totalPrice;
        }

        balance.totalProfitLoss = balance.stocks.reduce((acc, stock) => acc + stock.profit, 0);

        await balance.save();

        res.status(200).json({
            stocks: balance.stocks,
            totalValue: balance.totalValue,
            totalProfitLoss: balance.totalProfitLoss
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteBalance = async (req, res) => {
    try {
        const { userID } = req.body;

        const deletedBalance = await Balance.findOneAndDelete({ userID });

        if (!deletedBalance) {
            return res.status(404).json({ message: "Balance not found" });
        }

        res.status(200).json({ message: "Balance deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
