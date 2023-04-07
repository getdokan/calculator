function Product({ product, onAddToCart }) {
  return (
    <div className="bg-white shadow-md rounded-md">
      <img src={product.imageUrl} alt={product.name} className="w-full" />

      <div className="p-2">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-500">${product.price}</p>
        <button
          className="bg-blue-500 text-white py-2 px-2 rounded mt-4 hover:bg-blue-700 text-xs"
          onClick={() => onAddToCart({ ...product, quantity: 1 })}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
