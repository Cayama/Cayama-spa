import React, { useState, useEffect } from 'react';
import logoCayama from './logo512.png';
import cart from './cart.svg';
import './App.css';
import products from './fakeBbProducts';
import Shop from './Shop';

const showCart = (cartState, setCartState) => setCartState(!cartState);

function App() {
  const [myCart, setMyCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [cartState, setCartState] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(myCart))
  }, [myCart]);

  return (
    <div className="container">{console.log(myCart)}
      <header className="App-header">
        <img src={logoCayama} alt="Cayama logo" className="logo" />
        <button className="cart-button" onClick={() => showCart(cartState, setCartState)}>
          <img src={cart} alt="cart" className="cart" />
        </button>
      </header>
      {
        cartState &&
          <div>
            <p>{myCart.length === 0 ? "nenhum produto" : "produtos"}</p>
            <button onClick={() => setCartState(false)}>Fechar</button>
          </div>
      }
      <div>
        {products.map((el) => Shop(el, setMyCart, myCart))}
      </div>
    </div>
  );
}

export default App;
