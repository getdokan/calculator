import { useState } from 'react';

function CartSummary({ cart, vendors, shippingCosts, discountAmounts }) {
  const [chargeShippingTax, setChargeShippingTax] = useState(false);

  const summary = cart.reduce((acc, product) => {
    const vendor = vendors.find((v) => v.id === product.vendorId);
    const vendorIndex = vendors.findIndex((v) => v.id === product.vendorId);

    if (!acc[vendor.id]) {
      acc[vendor.id] = {
        vendor: vendor.name,
        total: 0,
        commission: 0,
        tax: 0,
        shipping: 0,
        discount: 0,
        net: 0,
        shippingTax: 0,
      };
    }

    const subtotal = product.price * product.quantity;
    const commission =
      (subtotal * vendor.commissionRate) / 100 + vendor.fixedAmount;
    const taxableAmount = subtotal - commission;
    const commission_tax = (commission * vendor.taxRate) / 100;
    const commission = commission + commission_tax;
    const tax = (taxableAmount * vendor.taxRate) / 100;
    const shipping = shippingCosts[vendor.id] || 0;
    const discount = discountAmounts[vendor.id] || 0;
    const shippingTax = chargeShippingTax
      ? (shipping * vendor.taxRate) / 100
      : 0;
    const net = taxableAmount + tax + shipping + shippingTax - discount;

    acc[vendor.id].total += subtotal;
    acc[vendor.id].commission += commission;
    acc[vendor.id].tax += tax;
    acc[vendor.id].shipping = shipping;
    acc[vendor.id].discount = discount;
    acc[vendor.id].net += net;
    acc[vendor.id].shippingTax += shippingTax;

    return acc;
  }, {});

  const handleChargeShippingTaxChange = (value) => {
    setChargeShippingTax(value);
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-4">Summary</h2>

      <div className="mt-4 mb-4">
        <label
          htmlFor="charge-shipping-tax"
          className="inline-flex items-center"
        >
          <input
            id="charge-shipping-tax"
            type="checkbox"
            className="form-checkbox"
            checked={chargeShippingTax}
            onChange={(e) => handleChargeShippingTaxChange(e.target.checked)}
          />
          <span className="ml-2">Charge Shipping Tax</span>
        </label>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border border-gray-300">Vendor</th>
            <th className="py-2 px-4 border border-gray-300">Tax</th>
            <th className="py-2 px-4 border border-gray-300">Shipping</th>
            <th className="py-2 px-4 border border-gray-300">Shipping Tax</th>
            <th className="py-2 px-4 border border-gray-300">Discount</th>
            <th className="py-2 px-4 border border-gray-300">Sub Total</th>
            <th className="py-2 px-4 border border-gray-300">Order Total</th>
            <th className="py-2 px-4 border border-gray-300">Commission</th>
            <th className="py-2 px-4 border border-gray-300">Vendor Net</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(summary).map((item, index) => (
            <tr key={index} className="odd:bg-gray-100">
              <td className="py-2 px-4 border border-gray-300">
                {item.vendor}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                ${item.tax.toFixed(2)}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                ${item.shipping.toFixed(2)}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                ${item.shippingTax.toFixed(2)}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                ${item.discount.toFixed(2)}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                ${item.total.toFixed(2)}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                $
                {(
                  item.total +
                  item.tax +
                  item.shipping +
                  item.shippingTax -
                  item.discount
                ).toFixed(2)}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                ${item.commission.toFixed(2)}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                ${item.net.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartSummary;
