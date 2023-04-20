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
        <div className="article">
          <h1>Help Page</h1>
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

          <h4>ACTIVATE/DEACTIVATE ACCOUNT BUTTON:</h4>
          <p>
            The activate/deactivate account buttton gives the user the ability
            to either activate or deactivate accounts.
          </p>

          <h4>DELETE ACCOUNT BUTTON:</h4>
          <p>
            After the delete account button is pressed the selected account will
            be deleted.
          </p>

          <h4>EMAIL BUTTON:</h4>
          <p>
            After the email button is pressed a form is displayed for the user
            to select a recipient and send a message.
          </p>
          <br />
          <h2>Ledgers Page</h2>
          <hr />
          <p>
            The user can select the post reference to go to the corresponding
            journal entry which created the account.
          </p>
        </div>
      </div>
    </>
  );
};

export default HelpPage;
