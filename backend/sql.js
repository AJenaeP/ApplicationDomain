/*const sql = require('mssql');

const config = {
    user: 'azureuser', // better stored in an app setting such as process.env.DB_USER
    password: 'appdomain23!', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'ksuappdomain23.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'Accounts', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}


    //Use Azure VM Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        port: process.env["db_port"],
        database: process.env["db_database"],
        authentication: {
            type: 'azure-active-directory-msi-vm'
        },
        options: {
            encrypt: true
        }
    }

    //Use Azure App Service Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        port: process.env["db_port"],
        database: process.env["db_database"],
        authentication: {
            type: 'azure-active-directory-msi-app-service'
        },
        options: {
            encrypt: true
        }
    }


console.log("Starting...");
connectAndQuery();

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);

        console.log("Reading rows from the Table...");
        var resultSet = await poolConnection.request().query(
            `SELECT TOP (1000) 
            [account_number]
            ,[account_name]
            ,[account_description]
            ,[normal_side]
            ,[account_category]
            ,[account_subcategory]
            ,[initial_balance]
            ,[debit]
            ,[credit]
            ,[balance]
            ,[date_time_account_added]
            ,[userId]
            ,[order]
            ,[statement]
            ,[comment]
            FROM [dbo].[ChartOfAccounts]`
        );

        console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        // ouput row contents from default record set
        resultSet.recordset.forEach(row => {
            console.log("%s\t%s", row.account_number, row.account_name);
        });
        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}*/