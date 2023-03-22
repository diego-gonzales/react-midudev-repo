import Products from "./components/Products/Products";
import { products as initialProducts } from "./mocks/products.json";
import Header from "./components/Header/Header";
import { useFilters } from "./hooks/useFilters";
import Footer from "./components/Footer/Footer";
import { IS_DEVELOPMENT } from "../config";
import Cart from "./components/Cart/Cart";
import { CartProvider } from "./contexts/CartContext";

function App() {
  const { filterProducts } = useFilters();

  const filteredProducts = filterProducts(initialProducts);

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  );
}

export default App;
