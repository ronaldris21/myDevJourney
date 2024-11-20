"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountList = void 0;
var AccountList = /** @class */ (function () {
    function AccountList() {
        this._accountList = [];
    }
    AccountList.prototype.add = function (account) {
        this._accountList.push(account);
    };
    AccountList.prototype.getAccounts = function () {
        return this._accountList;
    };
    return AccountList;
}());
exports.AccountList = AccountList;
//# sourceMappingURL=account-list.js.map