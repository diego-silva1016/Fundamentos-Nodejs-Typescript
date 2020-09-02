"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = __importDefault(require("../models/Transaction"));
var TransactionsRepository = /** @class */ (function () {
    function TransactionsRepository() {
        this.transactions = [];
    }
    TransactionsRepository.prototype.all = function () {
        return this.transactions;
    };
    TransactionsRepository.prototype.getBalance = function () {
        var income = 0;
        var outcome = 0;
        var total = 0;
        this.transactions.forEach(function (transaction) {
            if (transaction.type === 'income')
                income += transaction.value;
            else
                outcome += transaction.value;
        });
        total = income - outcome;
        var balance = {
            income: income,
            outcome: outcome,
            total: total,
        };
        return balance;
    };
    TransactionsRepository.prototype.create = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        var transaction = new Transaction_1.default({ title: title, value: value, type: type });
        var balance = this.getBalance();
        if (type === 'outcome' && value > balance.total)
            throw Error('o valor extrapola o que você possui em sua conta');
        this.transactions.push(transaction);
        return transaction;
    };
    return TransactionsRepository;
}());
exports.default = TransactionsRepository;
