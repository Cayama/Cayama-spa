import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { shoppingListAction, successfulMessageAction } from '../../../Redux/action/shoppingListAction';
import CheckoutProductCard from './innerPage/CheckoutProductCard';
import CheckoutFrom from './innerPage/CheckoutForm';
import convertBRL from '../../../Services/BRLFunction';
import { TopMenu } from '../../../Components/index';
import './styles.css';

const CheckoutPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [finishMessage, setFinishMessage] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [pay, setPay] = useState('');
  const token = localStorage.getItem('token');

  const reduxStoreProducts = useSelector(state => state.shoppingListReducer.data);

  const removeItem = (id) => reduxStoreProducts.filter((product) => product.id !== id)

  const arrayToSum = (productArray) => {
    const total = productArray
      .reduce((acc, { sellingQnt, price }) => acc + sellingQnt * price, 0);
    setTotalPrice(total)
  }

  const updateLocalStorage = (id) => {
    const shoppingListArray = removeItem(id);
    localStorage.setItem('sellingProducts', JSON.stringify(shoppingListArray));
    dispatch(shoppingListAction(shoppingListArray));
    arrayToSum(shoppingListArray);
  }

  useEffect(() => {
    const shoppingListLocalStorage = JSON.parse(localStorage.getItem('sellingProducts'));
    if (shoppingListLocalStorage) {
      dispatch(shoppingListAction(shoppingListLocalStorage))
      arrayToSum(shoppingListLocalStorage)
    };
  }, [])

  const submitPurchase = () => {
    const text = `Olá gostaria de receber${reduxStoreProducts
      .map(({ sellingQnt, name, size = 'P' }) => 
        " "+ sellingQnt + " produto(s) " + name + ", no tamanho " + size )}
          , na rua: ${street} número: ${number}. A forma de pagamento vai ser em ${pay}, ok?`;

    return window.location.assign(`https://wa.me/${5531996471888}?text=${text}`);
  };

  const onChangeStreet = (event) => setStreet(event.target.value);

  const onChangeNumber = (event) => setNumber(event.target.value);

  const onChangePay = (event) => setPay(event.target.value);

  const disableButton = () => {
    if (street !== '' && number !== '' && reduxStoreProducts.length > 0) return false;
    return true;
  }

  return (
    <div>
      <TopMenu />
      <div className="checkout-general-container all">
        <div className="checkout-content">
          <div className="checkout-products-header">
          </div>
          <span>{reduxStoreProducts.length === 0 ? 'Não há produtos no carrinho' : null}</span>
          {reduxStoreProducts.map(({ id, name, price, size, sellingQnt }, index) =>
            <CheckoutProductCard
              index={index}
              key={id}
              size={size}
              id={id}
              name={name}
              price={price}
              sellingQnt={sellingQnt}
              updateLocalStorage={updateLocalStorage}
            />
          )}
          <span data-testid="order-total-value">{`Total: ${convertBRL(totalPrice)}`}</span>
          <div className="address-checkout-container">
            <div className="address-checkout-content">
              <h3>Endereço</h3>
              <CheckoutFrom
                submitPurchase={submitPurchase}
                onChangeStreet={onChangeStreet}
                onChangeNumber={onChangeNumber}
                onChangePay={onChangePay}
                disableButton={disableButton}
              />
            </div>
          </div>
          <span>{finishMessage}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
