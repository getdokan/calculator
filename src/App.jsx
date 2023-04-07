import { useState } from 'react';
import { vendors, products } from './data';
import VendorList from './components/VendorList';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Header from './components/Header';

function App() {
  const [cart, setCart] = useState([]);
  const [vendorList, setVendorList] = useState(vendors);

  const handleAddToCart = (product) => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((item) => item.id === product.id);

    if (itemIndex !== -1) {
      updatedCart[itemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
  };

  function updateCart(productId, quantity) {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);

      if (quantity > 0) {
        const product = products.find((p) => p.id === productId);
        updatedCart.push({ ...product, quantity });
      }

      return updatedCart;
    });
  }

  const handleCommissionChange = (vendorId, field, value) => {
    const updatedVendorList = vendorList.map((vendor) =>
      vendor.id === vendorId ? { ...vendor, [field]: value } : vendor
    );
    setVendorList(updatedVendorList);
  };

  const groupedProducts = vendors.map((vendor) => ({
    ...vendor,
    products: products.filter((product) => product.vendorId === vendor.id),
  }));

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="w-1/2 border-r pt-4 sm:px-6 lg:px-6">
          <VendorList
            vendors={vendorList}
            onCommissionChange={handleCommissionChange}
          />

          {groupedProducts.map((vendor) => (
            <div key={vendor.id} className="mb-10">
              <h2 className="text-2xl font-bold mb-4">{vendor.name}</h2>
              <ProductList
                products={vendor.products}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
        </div>

        <div className="w-1/2 bg-gray-50 px-4 py-4">
          <Cart cart={cart} vendors={vendorList} onUpdateCart={updateCart} />
        </div>
      </div>
    </div>
  );
}

export default App;
