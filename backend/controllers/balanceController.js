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
        const { userID, amount } = req.body;

        const existingBalance = await Balance.findOne({ userID });
        if (existingBalance) {
            return res.status(400).json({ message: "Balance already exists" });
        }

        const newBalance = await Answer.create({ userID, amount });

        res.status(201).json(newBalance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBalance = async (req, res) => {
    try {
        const { userID, amount } = req.body;

        const updatedBalance = await Balance.findOneAndUpdate(
            { userID },
            { amount },
            { new: true }
        );

        if (!updatedBalance) {
            return res.status(404).json({ message: "Balance not found" });
        }

        res.status(200).json(updatedBalance);
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
