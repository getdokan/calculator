function CartSummary({ cart, vendors, shippingCosts, discountAmounts }) {
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
      };
    }

    const subtotal = product.price * product.quantity;
    const commission =
      (subtotal * vendor.commissionRate) / 100 + vendor.fixedAmount;
    const tax = (subtotal * vendor.taxRate) / 100;
    const shipping = shippingCosts[vendorIndex];
    const discount = discountAmounts[vendorIndex];
    const net = subtotal - commission + tax + shipping - discount;

    acc[vendor.id].total += subtotal;
    acc[vendor.id].commission += commission;
    acc[vendor.id].tax += tax;
    acc[vendor.id].shipping = shipping;
    acc[vendor.id].discount = discount;
    acc[vendor.id].net += net;

    return acc;
  }, {});

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-4">Summary</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border border-gray-300">Vendor</th>
            <th className="py-2 px-4 border border-gray-300">Tax</th>
            <th className="py-2 px-4 border border-gray-300">Shipping</th>
            <th className="py-2 px-4 border border-gray-300">Discount</th>
            <th className="py-2 px-4 border border-gray-300">Commission</th>
            <th className="py-2 px-4 border border-gray-300">Net</th>
            <th className="py-2 px-4 border border-gray-300">Total</th>
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
                ${item.discount.toFixed(2)}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                ${item.commission.toFixed(2)}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                ${item.net.toFixed(2)}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                ${item.total.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartSummary;
