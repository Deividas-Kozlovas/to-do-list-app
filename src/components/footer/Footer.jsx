import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">Kurta KITM mokyklos mokinių:</p>
      <ul className="footer__list">
        <li className="footer__item">Marta Lionaitė</li>
        <li className="footer__item">Deividas Kozlovas</li>
        <li className="footer__item">Aurelijus Stražnickas</li>
      </ul>
    </footer>
  );
};

export default Footer;
