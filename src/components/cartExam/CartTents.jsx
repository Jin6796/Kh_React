import React from 'react';
import CartAddForm from './CartAddForm';
import CartTent from './CartTent';

const CartTents = (props) => {
  const cartPlus = (tent) => { props.cartPlus(tent) }
  const cartMinus = (tent) => { props.cartMinus(tent) }
  const cartDelete = (tent) => { props.cartDelete(tent) }
  const inputCartAdd = (title) => { props.inputCartAdd(title) }
  return (
    <>
      <CartAddForm inputCartAdd = {inputCartAdd} />

      <ul>
        {props.items.map((tent) => (
          <CartTent 
            key={tent.id} 
            tent={tent} 
            cartPlus={cartPlus} 
            cartMinus={cartMinus} 
            cartDelete={cartDelete}
            inputCartAdd={inputCartAdd}
          />
        ))}
      </ul>
    </>
  );
}

export default CartTents;