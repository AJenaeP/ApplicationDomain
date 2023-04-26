//Logo import:
import "../css/HelpPage.css";

import Header from "./Header"

import React, { useState } from "react";

//Add Role Based Page 
const HelpPage = () => {
  const [role, setRole] = useState(window.localStorage.getItem('userRole'))
  

  if (role === "Administator")
  return (
    <>
      <div className="HelpPage" id="outer-container">
        <div>
          <Header />
        </div>
        <div className="article">
          <h1>Compass Credit Union Help</h1>
          <br />
          <h2> Need Help? </h2>
            <h4>We've got you covered</h4>

            <p>
            Below you will find helpful information about each page including some cool features and what different buttons can do.
          </p>
          <hr />

          <h4>USERS</h4>
          <p>
            Employees using the software will be listed here. There contact information and role will also be displayed in the table. 
          </p>

          <h4>EXPIRED PASSWORDS</h4>
          <p>
            Employees that have registered with Compass Software will have their password encypted and hashed through Firebase Authentication. Because of this, expired passwords will not automatically displayed unitl user submits them to Admin. They manually have to be updated by Admin and IT departments. 
          </p>
          <h4>FINANCIAL STATEMENTS</h4>
          <p>
            Want to view a Profit and Loss Report? Reports that have been created and updated by staff will be visible here. 
            Please click on filter options to display any available reports and click on View below table to see report for that entry. 
            Generate will allow you to create a report, print will allow printing of report created or any available report, and email is available to send reports to another employee for further viewing. 
          </p>

          <h4>ACCOUNTS</h4>
          <p>
            Chart of Accounts is displayed on this page. Here users can search for a specific account number or name; they can also filter by category, which includes assests, liability, and equity. 
            The filter feature also includes displaying by balance of accounts. To add an account, click on add account to enter a new account into the Chart of Accounts. The account number, account name, and account description are required. 
            If edit account is selected, the account number CANNOT be edited nor the date and time the account was added. An account can be activated or deactivated by selecting the account and updating the status.
            *Delete account is for testing purposes only* The account will not be deleted. Access to employee's email is available on this page as well if the button is clicked. 
          </p>

          <h4>EMAIL</h4>
          <p>
           Please select from the drop down menu to find the employee listing. This email will send from your work account and cannot be altered. 
          If email address needs to be changed, please contact IT. 
          </p>

          <h4>JOURNALS</h4>
          <p>
            Each account named in the Chart of Accounts will have information in the journal table. Here employees have the ability to search by account name,
            account amount, or date. There is the option to filter by status. To create a journal entry, please click on add an account and the following information will
            be needed: date, account name, reference, debit, and credit. If information is entered incorrectly, the journal will not be added to database. The notify manager button will alert a new journal 
            entry is pending. Managers and Admin can edit a journal and have the option to update status of pending journal entries.  *Delete journal is for testing purposes only* Lastly, managers and admin can adjust a journal
            if an error occured or an old account needs to be changed. 
            </p>
          <h4>LEDGERS</h4>
          <p>
         To filter ledgers by date, please click on filter option located by date on the table. There is a search bar included to search by account name or  
         account amount. Each reference has a link to view a snapshot of the account journal.
          </p>
         
          <h4>EVENT LOG</h4>
          <p>
          This table will show if an account was added and provide data like who added the account, if the account was modififed, and date of occurence. 
          </p>
         
        </div>
      </div>
    </>



  );

  if (role === "Accountant")
  return (
    <>
      <div className="HelpPage" id="outer-container">
        <div>
          <Header />
        </div>
        <div className="article">
          <h1>Compass Credit Union Help</h1>
          <br />
          <h2> Need Help? </h2>
            <h4>We've got you covered</h4>

            <p>
            Below you will find helpful information about each page including some cool features and what different buttons can do.
          </p>
          <hr />
          
          <h4>FINANCIAL STATEMENTS</h4>
          <p>
            Want to view a Profit and Loss Report? Reports that have been created and updated by staff will be visible here. 
            Please click on filter options to display any available reports and click on View below table to see report for that entry. 
            Generate will allow you to create a report, print will allow printing of report created or any available report, and email is available to send reports to another employee for further viewing. 
          </p>


          <h4>ACCOUNTS</h4>
          <p>
            Chart of Accounts is displayed on this page. Here accountants can search for a specific account number or name; they can also filter by balance or category, which includes assests, liability, and equity. 
            To view an account, click on view account. 
            An email button is available here for quick access. 
          </p>

          <h4>EMAIL</h4>
          <p>
           Please select from the drop down menu to find the employee listing. This email will send from your work account and cannot be altered. 
          If email address needs to be changed, please contact IT. 
          </p>

          <h4>JOURNALS</h4>
          <p>
            Each account named in the Chart of Accounts will have information in the journal table. Here employees have the ability to search by account name,
            account amount, or date. There is the option to filter by status. A button by date is availabe to help filter. To create a journal entry, please click on add an account and the following information will
            be needed: date, account name, reference, debit, and credit. If information is entered incorrectly, the journal will not be added to database. The notify manager button will alert a new journal 
            entry is pending. The View Comment will display any explanation by management on why a journal was rejected. *Delete journal is for testing purposes only* Lastly, managers and admin can adjust a journal
            if an error occured or an old account needs to be changed. 
            </p>
          <h4>LEDGERS</h4>
          <p>
         To filter ledgers by date, please click on filter option located by date on the table. There is a search bar included to search by account name or  
         account amount. Each reference has a link to view a snapshot of the account journal.
          </p>
         
          <h4>EVENT LOG</h4>
          <p>
          This table will show if an account was added and provide data like who added the account, if the account was modififed, and date of occurence. 
          </p>
         
        </div>
      </div>
    </>
  );
  if (role === "Manager")
  return (
    <>
      <div className="HelpPage" id="outer-container">
        <div>
          <Header />
        </div>
        <div className="article">
          <h1>Compass Credit Union Help</h1>
          <br />
          <h2> Need Help? </h2>
            <h4>We've got you covered</h4>

            <p>
            Below you will find helpful information about each page including some cool features and what different buttons can do.
          </p>
          <hr />


          <h4>ACCOUNTS</h4>
          <p>
            Chart of Accounts is displayed on this page. Here accountants can search for a specific account number or name; they can also filter by balance or category, which includes assests, liability, and equity. 
            To view an account, click on view account. 
            An email button is available here for quick access. 
          </p>
          
          <h4>FINANCIAL STATEMENTS</h4>
          <p>
            Want to view a Profit and Loss Report? Reports that have been created and updated by staff will be visible here. 
            Please click on filter options to display any available reports and click on View below table to see report for that entry. 
            Generate will allow you to create a report, print will allow printing of report created or any available report, and email is available to send reports to another employee for further viewing. 
          </p>
          <h4>EMAIL</h4>
          <p>
           Please select from the drop down menu to find the employee listing. This email will send from your work account and cannot be altered. 
          If email address needs to be changed, please contact IT. 
          </p>

          <h4>JOURNALS</h4>
          <p>
          Each account named in the Chart of Accounts will have information in the journal table. Here employees have the ability to search by account name,
            account amount, or date. There is the option to filter by status. To create a journal entry, please click on add an account and the following information will
            be needed: date, account name, reference, debit, and credit. If information is entered incorrectly, the journal will not be added to database. The notify manager button will alert a new journal 
            entry is pending. Managers and Admin can edit a journal and have the option to update status of pending journal entries.  *Delete journal is for testing purposes only* Lastly, managers and admin can adjust a journal
            if an error occured or an old account needs to be changed. 
            </p>
          <h4>LEDGERS</h4>
          <p>
         To filter ledgers by date, please click on filter option located by date on the table. There is a search bar included to search by account name or  
         account amount. Each reference has a link to view a snapshot of the account journal.
          </p>
         
          <h4>EVENT LOG</h4>
          <p>
          This table will show if an account was added and provide data like who added the account, if the account was modififed, and date of occurence. 
          </p>
         
        </div>
      </div>
    </>
  );
};

export default HelpPage;