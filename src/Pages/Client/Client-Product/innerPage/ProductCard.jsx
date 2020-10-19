import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { shoppingListAction } from '../../../../Redux/action/shoppingListAction';
import PlusMinus from './PlusMinus';

const ProductCard = ({ id, name, price, photo, index }) => {
  const [sellingQuantity, setSellingQuantity] = useState(0);
  const shoppingList = useSelector(state => state.shoppingListReducer.data);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const { sellingQnt } = shoppingList.find((product) => product.id === id) || {};

    if (sellingQnt) setSellingQuantity(sellingQnt);
  }, [shoppingList])

  const handleSize = ({ target: { value } }) => {
    const shoppingListWithSize = shoppingList.map((product) => {
      if (product.id !== id) return product;
      return {
        ...product,
        size: value
      }
    })
    localStorage.setItem('sellingProducts', JSON.stringify(shoppingListWithSize));
    return dispatch(shoppingListAction(shoppingListWithSize));
  }

  return (
    <div className="products-card">
      <section className="products-global">
        <div className="card-img">
          <img className="image-photo" data-testid={`${index}-product-img`} src={photo} alt="Cerveja" />
        </div>
        <div>
          <div className="products-content">
            <h4 data-testid={`${index}-product-name`}>{name}</h4>
          </div>
          <div className="price-count">
            <PlusMinus
              id={id}
              name={name}
              price={price}
              photo={photo}
              index={index}
              sellingQuantity={sellingQuantity}
              setSellingQuantity={setSellingQuantity}
            />
          </div>
          <label htmlFor="size-options">Escolha seu tamanho:</label>
          <select onChange={(event) => handleSize(event)} id="size-options">
            <option name="size" value="P"></option>
            <option name="size" value="P">P</option>
            <option name="size" value="M">M</option>
            <option name="size" value="G">G</option>
          </select>
        </div>
      </section>
    </div>
  )
}

export default ProductCard;
