import React, { useState } from "react";

const BasketPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product A",
      price: 29.99,
      quantity: 2,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "Product B",
      price: 49.99,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-black text-2xl font-bold mb-6 text-center">
          Coș de cumpărături
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Coșul este gol.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border rounded p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 mr-4"
                  />
                  <div className="flex-grow">
                    <h2 className="text-black font-semibold">{item.name}</h2>
                    <p className="text-gray-600">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="mx-2 text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-black font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm mt-2"
                    >
                      Șterge
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between text-black font-semibold mb-2">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
                Finalizează comanda
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BasketPage;