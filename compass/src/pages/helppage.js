//Logo import:
import "../css/HelpPage.css";
import React from "react";
import Header from "./Header";

//create code for image
const HelpPage = () => {
  return (
    <>
      <div className="HelpPage" id="outer-container">
        <div>
          <Header />
        </div>
        <body>
          <h1>Compass Credit Union Help</h1>
          <br />
          <h2>Accounts Page</h2>
          <hr />
          <h4>ADD ACCOUNT BUTTON:</h4>
          <p>
            After the add account button is pressed, a form will be generated
            allowing a user to enter the account number, account name and other
            relevant account information.
          </p>

          <h4>VIEW ACCOUNT BUTTON:</h4>
          <p>
            After the view account button is pressed the chart of accounts is
            displayed.
          </p>

          <h4>EDIT ACCOUNT BUTTON:</h4>
          <p>
            After the edit account button is pressed the user will be able to
            edit the selected account.
          </p>

          <h4>DELETE ACCOUNT BUTTON:</h4>
          <p>
            After the delete account button is pressed the selected account will
            be deleted.
          </p>
        </body>
      </div>
    </>
  );
};

export default HelpPage;
