import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import cart from '../../images/cart.svg';
import SideMenu from "./SideMenu/SideMenu";
import "./index.css";

const renderTitle = (path) => {
  switch (path) {
    case '/checkout': return 'Checkout';
    case '/': return 'Cayama';
    case '/cayama-spa': return 'Cayama';
    default: return 'TryBeer';
  }
}

const TopMenu = () => {
  const role = localStorage.getItem('role');
  const [openSide, setOpenSide] = useState(role === 'administrator');
  const { pathname } = useLocation();

  return (
    <div>
      <header className="top-menu">
        <div>
          <GiHamburgerMenu
            data-testid="top-hamburguer"
            className="button-hamburgue"
            onClick={() => setOpenSide((value) => !value)}
          />
        </div>
        <h2 data-testid="top-title" className="header-title">{renderTitle(pathname)}</h2>
        <Link className="cart-button" to="/checkout">
          <img src={cart} width="30px" />
        </Link>
      </header>
      {openSide && <SideMenu setOpenSide={setOpenSide} />}
    </div>
  );
};

export default TopMenu;
