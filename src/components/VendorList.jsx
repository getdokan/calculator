import { useState } from 'react';
import PriceInput from './priceInput';

function VendorList({ vendors, onCommissionChange }) {
  const [editing, setEditing] = useState(-1);

  const toggleEditForm = (vendorId) => {
    if (editing === vendorId) {
      setEditing(-1);
    } else {
      setEditing(vendorId);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Vendors</h2>
      <ul>
        {vendors.map((vendor) => (
          <li key={vendor.id} className="mb-2">
            {vendor.name} - Commission: ({vendor.commissionRate}% + $
            {vendor.fixedAmount}), Tax Rate: {vendor.taxRate}%
            <button
              className="bg-blue-500 text-white py-1 px-3 ml-4 rounded hover:bg-blue-700"
              onClick={() => toggleEditForm(vendor.id)}
            >
              {editing === vendor.id ? 'Close' : 'Edit'}
            </button>
            {editing === vendor.id && (
              <div className="flex flex-col bg-green-100 p-2 mt-2 rounded">
                <div className="w-36">
                  <label className="mr-2">Commision Rate:</label>
                  <PriceInput
                    type="number"
                    value={vendor.commissionRate}
                    onChange={(e) =>
                      onCommissionChange(
                        vendor.id,
                        'commissionRate',
                        parseFloat(e.target.value)
                      )
                    }
                    trailingAddon={
                      <span className="text-gray-500 sm:text-sm pr-3">%</span>
                    }
                  />
                </div>
                <div className="w-36 mt-2">
                  <label className="mr-2">Fixed Amount:</label>
                  <PriceInput
                    type="number"
                    value={vendor.fixedAmount}
                    onChange={(e) =>
                      onCommissionChange(
                        vendor.id,
                        'fixedAmount',
                        parseFloat(e.target.value)
                      )
                    }
                    leadingAddon={
                      <span className="text-gray-500 sm:text-sm">$</span>
                    }
                  />
                </div>
                <div className="w-36 mt-2">
                  <label className="mr-2">Tax Rate:</label>
                  <PriceInput
                    type="number"
                    value={vendor.taxRate}
                    onChange={(e) =>
                      onCommissionChange(
                        vendor.id,
                        'taxRate',
                        parseFloat(e.target.value)
                      )
                    }
                    trailingAddon={
                      <span className="text-gray-500 sm:text-sm pr-3">%</span>
                    }
                  />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VendorList;
