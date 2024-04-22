// REACT HOOK is use below in order to pass CartContext -> useContext
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context.jsx";

export default function Cart() {
  // DESTRUCTION items in order to be use in multy layer
  const { items, updateItemQuantity } = useContext(CartContext);

  // PRICE AND QUANTITY CALLCULATION using reduce() method from JS -> reduce is taking (accumulator, item) => caluclation, start from index. if u use .Consumer -> cartCtx.item.reduce()
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    //  .Consumer is a wraper similar to .Provider but is taking secondary wrap {(VALUE) => return {place code here}}
    // SAME thing can be execute as well just useContext -> see line 7 and need adjustment over cartCtx.items -> items
    // MOSTLY USE IS line 7 useContext()
    // /////////////////////////////////////////
    // <CartContext.Consumer>
    //   {(cartCtx) => {
    //     return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
    // ///////////////////////////////////
    //     );
    //   }}
    // </CartContext.Consumer>
  );
}
