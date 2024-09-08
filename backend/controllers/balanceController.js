const Balance = require("../models/balanceModel");

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
        const { userID, totalValue, totalProfitLoss, stocks } = req.body;

        const existingBalance = await Balance.findOne({ userID });
        if (existingBalance) {
            return res.status(400).json({ message: "Balance already exists" });
        }

        const newBalance = await Balance.create({
            userID,
            totalValue,
            totalProfitLoss,
            stocks
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

            // Add new stock
            balance.stocks.push({
                symbol,
                units,
                price: totalPrice / units, // Set price per unit
                profit: 0 // Initialize profit as 0
            });

            // Update total value and total profit/loss
            balance.totalValue += totalPrice;
        } else if (transactionType === 'sell') {
            if (!stock || stock.units < units) {
                return res.status(400).json({ message: 'Not enough units to sell' });
            }

            // Update existing stock
            stock.units -= units;
            const sellPrice = (totalPrice / units);
            stock.profit += (sellPrice - stock.price) * units;

            if (stock.units === 0) {
                // Remove stock if no units are left
                balance.stocks = balance.stocks.filter(s => s.symbol !== symbol);
            }

            // Update total value and total profit/loss
            balance.totalValue -= totalPrice;
        }

        balance.totalProfitLoss = balance.stocks.reduce((acc, stock) => acc + (stock.units * stock.price - stock.profit), 0);

        await balance.save();

        res.status(200).json(balance);
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
