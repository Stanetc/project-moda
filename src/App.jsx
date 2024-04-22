import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import Product from "./components/Product.jsx";
import CartContextProvider from "./store/shopping-cart-context.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";

function App() {
  return (
    // WRAPER BELLOW IS CONTEXT REACT COMPONENT
    // MUST PASS A VALUE AS ORIGINAL COMPONENTS -> in this case items: [] in shopping-cart-context.jsx
    // THE CASE BELOW IS using -> useState deafult value shopingcart which is items: [], see App() as is providing same value as shopping-cart-context.jsx
    // <CartContext.Provider value={shoppingCart}> -> can be use
    // USING ctxValue as is passing value from state and function state
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
