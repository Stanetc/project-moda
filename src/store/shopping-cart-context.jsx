// useReducer is use for STATE menagment
import { createContext, useReducer } from "react";

import { DUMMY_PRODUCTS } from "../dummy-products.js";

// USE CAP FOR THE AS WILL STORE A OBJECT WITH REACT COMPONENTS
// CAN STORE ANY VALUES U WANT -> number, sring, array, object
export const CartContext = createContext({
  items: [],
  //   ADDING addItemToCart from App -> ctxValue state function -> handleAddItemToCart state function to App state menagment, here we pass empty arrow function but is pointing to above state function is use for auto complition
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

// IS define outside as no need to be re execute every time when function CartContextProvider is updated
// Taking two param -> state, action
function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // updateItems -> is spreading items
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.id
      );
      updatedItems.push({
        id: action.id,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }
    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    // COPING OLD STATE BELOW ALWAYS
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  // useReducer as useState is taking array with 2 values -> 1st state, 2nd dispatch funtion!!!
  // useReducer(function, initial value) -> in this case useReducer(line 17, shoppingCart {items: []})
  const [shoppingCartState, ShoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  // STATE FUNCTION -> taking id from {DUMMY_PRODUCTS} and updating UI
  function handleAddItemToCart(id) {
    //  dispatch (action) -> dispatch action which can be anything-> object, string ...etc, most cases is a object
    ShoppingCartDispatch({
      type: "ADD_ITEM",
      id: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    ShoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        productId: productId,
        amount: amount,
      },
    });
  }

  // ctxValue is (object) pointing to items -> useState initial value which is shoppingCart -> items: [], in useState() for App
  // 2nd addItemToCart is giving accsses to funtion state -> handleAddItemToCart()
  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
