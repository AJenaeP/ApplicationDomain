class ChartOfAccounts{
    constructor(
        account_number,
        account_name,
        account_description,
        account_category,
        account_subcategory,
        normal_side,
        initial_balance,
        debit,
        credit,
        balance,
        userId,
        date_time_account_added,
        order_num,
        statement,
        comment,
        account_status
    ){
        this.account_number = account_number;
        this.account_name = account_name;
        this.account_description = account_description;
        this.account_category = account_category;
        this.account_subcategory = account_subcategory;
        this.normal_side = normal_side;
        this.initial_balance = initial_balance;
        this.debit = debit;
        this.credit = credit;
        this.balance = balance;
        this.userId = userId;
        this.date_time_account_added = date_time_account_added;
        this.order_num = order_num;
        this.statement = statement;
        this.comment = comment;
        this.account_status = account_status;
    }
}

module.exports = ChartOfAccounts;