class ChartOfAccounts{
    constructor(
        account_number,
        account_name,
        account_description,
        account_category,
        account_subcategory,
        initial_balance,
        balance,
        userId,
        date_time_account_added,
        account_status
    ){
        this.account_number = account_number;
        this.account_name = account_name;
        this.account_description = account_description;
        this.account_category = account_category;
        this.account_subcategory = account_subcategory;
        this.initial_balance = initial_balance;
        this.balance = balance;
        this.userId = userId;
        this.date_time_account_added = date_time_account_added;
        this.account_status = account_status;
    }
}

module.exports = ChartOfAccounts;