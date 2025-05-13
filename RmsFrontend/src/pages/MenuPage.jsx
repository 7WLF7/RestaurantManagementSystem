import React, { useState } from "react";
import menuData from "../data/menuData";

const categories = Object.keys(menuData);

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState(categories[0]);

  const renderContent = () => {
    const data = menuData[activeTab];

    if (typeof data === "object" && !Array.isArray(data)) {
      return Object.entries(data).map(([subcategory, items]) => (
        <div key={subcategory} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{subcategory}</h3>
          <ul className="list-disc pl-6 space-y-1">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ));
    }

    return (
      <ul className="list-disc pl-6 space-y-1">
        {data.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen min-w-screen">
  <div className="max-w-6xl mx-auto p-20 font-sans">
    <h1 className="text-3xl font-bold mb-6 text-center text-orange-400">🍽️ Meniul Restaurantului</h1>

    <div className="flex flex-wrap gap-2 justify-center mb-6">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded border ${
            activeTab === category
              ? "bg-white text-orange-400"
              : "bg-white text-gray-800 font-bold hover:border-orange-800"
          } transition`}
          onClick={() => setActiveTab(category)}
        >
          {category}
        </button>
      ))}
    </div>

    <div className="bg-white text-black font-bold p-4 rounded shadow">{renderContent()}</div>
  </div>
</div>

  );
};

export default MenuPage;
