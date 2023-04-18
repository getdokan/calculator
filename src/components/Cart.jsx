import { useState } from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import PriceInput from './priceInput';

function Cart({ cart, vendors, onUpdateCart }) {
  const [shippingCosts, setShippingCosts] = useState({});
  const [discountAmounts, setDiscountAmounts] = useState({});
  const [discountType, setDiscountType] = useState({});

  const handleShippingCostChange = (vendorId, value) => {
    setShippingCosts((prev) => ({
      ...prev,
      [vendorId]: parseFloat(value) || 0,
    }));
  };

  const handleDiscountAmountChange = (vendorId, value) => {
    setDiscountAmounts((prev) => ({
      ...prev,
      [vendorId]: parseFloat(value) || 0,
    }));
  };

  const handleDiscountTypeChange = (vendorId, value) => {
    setDiscountType((prev) => ({
      ...prev,
      [vendorId]: value,
    }));
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

          <div className="flex mt-2 w-72">
            <div className="mr-2 flex-1">
              <label className="mr-2">Shipping Cost:</label>
              <PriceInput
                className="mt-1"
                type="number"
                min="0"
                defaultValue={shippingCosts[vendor.id] || 0}
                onChange={(e) =>
                  handleShippingCostChange(vendor.id, e.target.value)
                }
                leadingAddon={
                  <span className="text-gray-500 sm:text-sm">$</span>
                }
              />
            </div>
            <div className="flex-1">
              <label className="mr-2">Discount Amount:</label>
              <PriceInput
                className="mt-1"
                type="number"
                min="0"
                defaultValue={discountAmounts[vendor.id] || 0}
                onChange={(e) =>
                  handleDiscountAmountChange(vendor.id, e.target.value)
                }
                trailPadding="pr-12"
                trailingAddon={
                  <select
                    className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    value={discountType[vendor.id] || 'percent'}
                    onChange={(e) =>
                      handleDiscountTypeChange(vendor.id, e.target.value)
                    }
                  >
                    <option value="fixed">$</option>
                    <option value="percent">%</option>
                  </select>
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
          discountType={discountType}
        />
      )}
    </div>
  );
}

export default Cart;
