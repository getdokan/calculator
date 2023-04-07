import { useState } from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

function Cart({ cart, onUpdateCart, vendors }) {
  const [shippingCosts, setShippingCosts] = useState(
    Array(vendors.length).fill(0)
  );
  const [discountAmounts, setDiscountAmounts] = useState(
    Array(vendors.length).fill(0)
  );

  const handleShippingCostChange = (index, value) => {
    const updatedShippingCosts = [...shippingCosts];
    updatedShippingCosts[index] = parseFloat(value) || 0;
    setShippingCosts(updatedShippingCosts);
  };

  const handleDiscountAmountChange = (index, value) => {
    const updatedDiscountAmounts = [...discountAmounts];
    updatedDiscountAmounts[index] = parseFloat(value) || 0;
    setDiscountAmounts(updatedDiscountAmounts);
  };

  const groupedCart = vendors
    .map((vendor) => ({
      ...vendor,
      items: cart.filter((item) => item.vendorId === vendor.id),
    }))
    .filter((vendor) => vendor.items.length > 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {groupedCart.map((vendor, index) => (
        <div key={vendor.id} className="mb-4 pb-4 border-b">
          <h3 className="text-xl font-semibold mb-2">{vendor.name}</h3>

          {vendor.items.map((item) => (
            <CartItem
              key={item.id}
              product={item}
              onUpdateCart={onUpdateCart}
            />
          ))}

          <div className="flex">
            <div className="mt-2">
              <label className="mr-2">Shipping Cost:</label>
              <input
                className="border border-gray-300 p-1 rounded mr-4 w-24"
                type="number"
                value={shippingCosts[index]}
                onChange={(e) =>
                  handleShippingCostChange(index, e.target.value)
                }
              />
            </div>
            <div className="mt-2">
              <label className="mr-2">Discount Amount:</label>
              <input
                className="border border-gray-300 p-1 rounded w-24"
                type="number"
                value={discountAmounts[index]}
                onChange={(e) =>
                  handleDiscountAmountChange(index, e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}

      {cart.length === 0 && <div>No items in cart</div>}

      {cart.length > 0 && (
        <CartSummary
          cart={cart}
          vendors={vendors}
          shippingCosts={shippingCosts}
          discountAmounts={discountAmounts}
        />
      )}
    </div>
  );
}

export default Cart;
