"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ATM = void 0;
var ATM = /** @class */ (function () {
    function ATM(account) {
        this.account = account;
    }
    ATM.prototype.deposit = function (amount) {
        this.account.deposit(amount);
    };
    ATM.prototype.withdrawal = function (amount) {
        this.account.withdrawal(amount);
    };
    return ATM;
}());
exports.ATM = ATM;
//# sourceMappingURL=atm.js.map