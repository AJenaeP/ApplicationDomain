import React from 'react';
import { elastic as Menu } from 'react-burger-menu';
import '../css/NewUser.css';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/CreateNewUsers">
        Users
      </a>
      <a className="menu-item" href="/ExpiredPasswords">
        Expired Passwords
      </a>
      <a className="menu-item" href="/Accounts">
       Accounts
      </a>
      <a className="menu-item" href="/Email">
       Email
      </a>
    </Menu>
  );
};

