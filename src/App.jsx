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
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateCart = (product, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity === 0) {
        return prevCart.filter((item) => item.id !== product.id);
      } else {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }
    });
  };

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
            <div key={vendor.id} className="mb-10 mt-4">
              <h2 className="text-2xl font-bold mb-4">{vendor.name}</h2>
              <ProductList
                products={vendor.products}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
        </div>

        <div className="w-1/2 bg-gray-50 px-4 py-4">
          <Cart
            cart={cart}
            vendors={vendorList}
            onUpdateCart={handleUpdateCart}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
