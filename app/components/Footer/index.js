import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';
import './Footer.css';
function Footer() {
  return (
    <Wrapper>
      <div className="footer-column">
        <div className="footer-column-title">Contact us</div>
        <ul>
          <li>support@tradetoy.com</li>
          <li>Live chat</li>
        </ul>
      </div>
      <div className="footer-column">
        <div className="footer-column-title">Ordering</div>
        <ul>
          <li>Disputes</li>
          <li>Buyer Protection</li>
          <li>Returns</li>
        </ul>
      </div>
      <div className="footer-column">
        <div className="footer-column-title">Your place</div>
        <ul>
          <li>Dashboard</li>
          <li>Orders</li>
          <li>Sells</li>
          <li>Your account</li>
        </ul>
      </div>
      <div className="footer-column">
        <div className="footer-column-title">Help</div>
        <ul>
          <li>FAQ</li>
          <li>Privacy policy</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>
    </Wrapper>
  );
}

export default Footer;
