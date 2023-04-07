const vendors = [
  { id: 1, name: 'Apple', commissionRate: 10, fixedAmount: 5, taxRate: 5 },
  { id: 2, name: 'Philips', commissionRate: 8, fixedAmount: 3, taxRate: 7 },
  { id: 3, name: 'Samsung', commissionRate: 7, fixedAmount: 4, taxRate: 6 },
];

const products = [
  {
    id: 1,
    vendorId: 1,
    name: "iPhone 13",
    price: 999,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    vendorId: 1,
    name: "MacBook Pro",
    price: 1799,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    vendorId: 1,
    name: "Apple Watch",
    price: 399,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 4,
    vendorId: 1,
    name: "iPad Pro",
    price: 799,
    imageUrl: "https://via.placeholder.com/100",
  },

  {
    id: 6,
    vendorId: 2,
    name: "Philips TV",
    price: 799,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 7,
    vendorId: 2,
    name: "Philips Hue",
    price: 199,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 8,
    vendorId: 2,
    name: "Philips Air Purifier",
    price: 299,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 9,
    vendorId: 2,
    name: "Philips Blender",
    price: 99,
    imageUrl: "https://via.placeholder.com/100",
  },

  {
    id: 11,
    vendorId: 3,
    name: "Samsung Galaxy S22",
    price: 899,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 12,
    vendorId: 3,
    name: "Samsung Galaxy Note",
    price: 1099,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 13,
    vendorId: 3,
    name: "Samsung Galaxy Tab",
    price: 649,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 14,
    vendorId: 3,
    name: "Samsung Galaxy Watch",
    price: 349,
    imageUrl: "https://via.placeholder.com/100",
  },
];

export { vendors, products };
