import React, { useState } from 'react';

const isDisabled = (street, number, pay, mySize) => {
  if(!street || !number || !pay || !mySize) return true;
  return false;
};

const checkout = (street, number, pay, object, quantity, mySize) => {
  const text = `Olá gostaria de receber ${quantity} produto(s) ${object.name}, 
  no tamanho ${mySize}, em rua: ${street} número: ${number}. a forma de pagamento vai ser em ${pay} ok?`
  return window.location.assign(`https://wa.me/${5531973481195}?text=${text}`)
};

const checkCart = (item, myCart, quantity, mySize) => {
  if (mySize === '') return [...myCart];
  const check = myCart.find((el) => `${el.id} - ${el.size}` === `${item.id} - ${mySize}`);
  if (check) {
    const quant = check.quantity;
    const noEqProducts = myCart.filter((el) => `${el.id} - ${el.size}` !== `${item.id} - ${mySize}`);
    return [...noEqProducts, {...check, "quantity": quant+quantity, "size": mySize}]
  };
  return [...myCart, {...item,"quantity": quantity, "size": mySize}]
};

export default function Shop(el, setMyCart, myCart) {
  const [quantity, setQuantity] = useState(1);
  const [mySize, setMySize] = useState('');
  const [modalBuy, setModalBuy] = useState(false);
  const [pay, setPay] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');


  return (
    <div key={el.id}>
      {el.images.map((e) => <img key={`${e} ${el.id}`} src={e} alt={el.name} />)}
      <h3>{el.name}</h3>
      <h3>{el.price}</h3>
      <span>
        Tamanho: <select onChange={(e) => setMySize(e.target.value)}>
        <option>Choose here</option>
         {el.size.map((elem) => <option key={`${elem} ${el.id}`} value={elem}>{elem}</option>)}
        </select>
      </span>
      <button onClick={() => setModalBuy(true)}>Comprar</button>
      {
        modalBuy && <div>
          <p>
            Por favor insira seu endereço e sua forma de pagamento {"\u{263A}"}
          </p>
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
          <button disabled={isDisabled(street, number, pay)} onClick={() => checkout(street, number, pay, el, quantity, mySize)}>Finalizar</button>
          <button onClick={() => setModalBuy(false)}>Fechar</button>
        </div>
      }
      <button onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}>-</button>
      <span>{quantity}</span>
      <button onClick={() => setQuantity(quantity + 1)}>+</button>
      <button onClick={() => setMyCart(() => checkCart(el, myCart, quantity, mySize))}>Adicionar ao carrinho</button>
    </div>
  )
}
