"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
var constants_1 = require("./constants");
var BankAccount = /** @class */ (function () {
    function BankAccount(accountSettings) {
        this._balance = 0;
        this.id = accountSettings.id;
        this.title = accountSettings.title;
        this.balance = accountSettings.balance;
    }
    BankAccount.prototype.deposit = function (amount) {
        this.balance += amount;
    };
    BankAccount.prototype.withdrawal = function (amount) {
        this.balance -= amount;
    };
    BankAccount.prototype.getAccountInfo = function () {
        return {
            routingNumber: constants_1.Constants.ROUTING_NUMBER,
            bankNumber: constants_1.Constants.BANK_NUMBER
        };
    };
    Object.defineProperty(BankAccount.prototype, "balance", {
        get: function () {
            return this._balance;
        },
        set: function (val) {
            if (val >= 0) {
                this._balance = val;
            }
            else {
                throw Error('Balance cannot be negative!');
            }
        },
        enumerable: false,
        configurable: true
    });
    return BankAccount;
}());
exports.BankAccount = BankAccount;
//# sourceMappingURL=bank-account.js.map