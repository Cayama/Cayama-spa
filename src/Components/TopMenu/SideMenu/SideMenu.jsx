import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.css";
import { GiHamburgerMenu } from "react-icons/gi";

const SideMenu = () => {
  const role = localStorage.getItem('role');

  const history = useHistory();

  return (
    <aside className="side-menu-container" data-testid="side-menu-container">
      <>
        <Link to="/products">
          <button data-testid="side-menu-item-products">Produtos</button>
        </Link>
        <Link to="/checkout">
          <button>Carrinho</button>
        </Link>
      </>
    </aside>
  );
};

export default SideMenu;
