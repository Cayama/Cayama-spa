import React, { useState, useEffect } from 'react';
import logoCayama from './logo512.png';
import cart from './cart.svg';
import './App.css';
import products from './fakeBbProducts';
import Shop from './Shop';

const showCart = (cartState, setCartState) => setCartState(!cartState);

const isDisabled = (street, number, pay) => {
  if(!street || !number || !pay) return true;
  return false;
};

const checkout = (street, number, pay, object) => {
  const text = `Olá gostaria de receber${object.map((el) => " "+ el.quantity + " produto(s) " + el.name + ", no tamanho " + el.size )}
  , em rua: ${street} número: ${number}. a forma de pagamento vai ser em ${pay} ok?`
  return window.location.assign(`https://wa.me/${5531973481195}?text=${text}`)
};

function App() {
  const [myCart, setMyCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [cartState, setCartState] = useState(false);
  const [pay, setPay] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(myCart))
  }, [myCart]);

  return (
    <div className="container">
      <header className="App-header">
        <img src={logoCayama} alt="Cayama logo" className="logo" />
        <button className="cart-button" onClick={() => showCart(cartState, setCartState)}>
          <img src={cart} alt="cart" className="cart" />
        </button>
      </header>
      {
        cartState &&
          <div>
            <p>{myCart.length === 0 ? "nenhum produto" : myCart.map((el) => 
              <div>
                <span>{el.name}</span>
              </div>
            )}</p>
              <p>Total: {myCart.reduce((acc, el) => acc + (el.price * el.quantity), 0)}</p>
              <label htmlFor="street">Rua:</label>
              <input name="street" onChange={(e) => setStreet(e.target.value)}></input>
              <label htmlFor="number">Número:</label>
              <input name="number" onChange={(e) => setNumber(e.target.value)}></input>
              <label htmlFor="paymant">Forma de Pagamento:</label>
              <span>Dinheiro:
                <input type="radio" name="payment" value="dinheiro" onChange={(e) => setPay(e.target.value)}></input>
              </span>
              <span>Cartão:
                <input type="radio" name="payment" value="cartão" onChange={(e) => setPay(e.target.value)}></input>
              </span>
            <button disabled={isDisabled(street, number, pay)} onClick={() => checkout(street, number, pay, myCart)}>Finalizar</button>
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
