import React from 'react';

const CheckoutForm = ({ submitPurchase, onChangePay, onChangeStreet, onChangeNumber, disableButton }) => {
  return (
    <form>
      <div className="street-number-checkout">
        <label className="street-number-label" htmlFor="address">
          Rua:
          <input
            onChange={(event) => onChangeStreet(event)}
            data-testid="checkout-street-input"
            type="text"
            id="address"
            name="deliveryAddress"
            className="street-number-checkout-input"
          />
        </label>
        <label className="street-number-label" htmlFor="address-number">
          Número da casa:
          <input
            onChange={(event) => onChangeNumber(event)}
            data-testid="checkout-house-number-input"
            type="text"
            id="address-number"
            name="deliveryNumber"
            className="street-number-checkout-input"
          />
        </label>
        <div className="payment-method">
          <strong>Forma de Pagamento:</strong>
          <div className="payment-method-container">
            <div className="payment-method-money">
              <label htmlFor="money">Dinheiro</label>
              <input id="money" name="payment" type="radio" value="dinheiro" onClick={(event) => onChangePay(event)}/>
            </div>
            <div className="payment-method-card">
              <label htmlFor="credit-card">Cartão</label>
              <input id="credit-card" name="payment" type="radio" value="Cartão" onClick={(event) => onChangePay(event)}/>
            </div>
          </div>
        </div>
      </div>
      <div className="checkout-button-page-container">
        <button
          className="checkout-page-button"
          onClick={submitPurchase}
          disabled={disableButton()}
          data-testid="checkout-finish-btn"
          type="button"
        >
          Finalizar Compra
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
