const util = require('util');

function validateExpense(expenseObj) {
    const isValid = {
        status: false,
        msg: 'Data Undefined or null'
    }
    if(util.isNullOrUndefined(expenseObj)){
        return isValid;
    } else{
        if(util.isNullOrUndefined(expenseObj.category) || expenseObj.category.trim().length === 0) {
            isValid.msg = "Category missing";
        } else if (util.isNullOrUndefined(expenseObj.title) || expenseObj.title.trim().length === 0) {
            isValid.msg = "Title missing";
        } else if (util.isNullOrUndefined(expenseObj.exp_date) || expenseObj.exp_date.trim().length === 0) {
            isValid.msg = "Exp Date missing";
        } else if (util.isNullOrUndefined(expenseObj.amount) || expenseObj.amount.trim().length === 0) {
            isValid.msg = "Amount missing";
        } else {
            isValid.status = true;
            isValid.msg = "Valid";
        }
    }
    return isValid;
}

module.exports = {
    validateExpense
}