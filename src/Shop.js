import React, { useState } from 'react'

const checkCart = (item, myCart, quantity, mySize) => {
  if (mySize === 'default') return;
  const check = myCart.find((el) => el.id === item.id);
  if (check) {
    const quant = check.quantity;
    let noEqProducts = myCart.filter((el) => el.id !== item.id);
    return [...noEqProducts, {...check, "quantity": quant+quantity, "size": mySize}]
  };
  return [...myCart, {...item,"quantity": quantity, "size": mySize}]
}

export default function Shop(el, setMyCart, myCart) {
  const [quantity, setQuantity] = useState(1);
  const [mySize, setMySize] = useState('');

  return (
    <div key={el.id}>
      {el.images.map((e) => <img key={`${e} ${el.id}`} src={e} alt={el.name} />)}
      <h3>{el.name}</h3>
      <h3>{el.price}</h3>
      <select onChange={(e) => setMySize(e.target.value)}>
      <option >Choose here</option>
       {el.size.map((elem) => <option key={`${elem} ${el.id}`} value={elem}>{elem}</option>)}
      </select>
      <button onClick={() => false}>Comprar</button>
      <button onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}>-</button>
      <span>{quantity}</span>
      <button onClick={() => setQuantity(quantity + 1)}>+</button>
      <button onClick={() => setMyCart(() => checkCart(el, myCart, quantity, mySize))}>Adicionar ao carrinho</button>
    </div>
  )
}
