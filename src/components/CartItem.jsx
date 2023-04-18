const Item = ({ product, onUpdateCart }) => {
  let price = product.price * product.quantity;

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value) || 0;
    onUpdateCart(product, quantity);
  };

  const handleRemove = () => {
    onUpdateCart(product, 0);
  };

  return (
    <div className="flex py-3">
      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{product.name}</h3>
            <p className="ml-4">${price.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">
            <select
              value={product.quantity}
              className="rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              onChange={handleQuantityChange}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </select>
          </p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
