"use client";

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const categories = [
  { name: "Tours", key: "tours", filters: ["Duration", "Price", "Type"] },
  { name: "Tickets", key: "tickets", filters: ["Event Type", "Price", "Date"] },
  { name: "Rent", key: "rent", filters: ["Vehicle Type", "Price", "Location"] },
  { name: "Transfer", key: "transfer", filters: ["From", "To", "Date"] },
];

interface CategoryModalProps {
  onClose: () => void;
  onApplyFilters: (category: string, filters: string[]) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  onClose,
  onApplyFilters,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedFilters([]);
  };

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const handleApplyFilters = () => {
    if (selectedCategory) {
      onApplyFilters(selectedCategory, selectedFilters);
    }
    onClose();
  };

  const currentCategory = categories.find(
    (cat) => cat.name === selectedCategory
  );

  return (
    <div className="fixed inset-0 z-50 bg-white shadow-lg">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary-500">Categories</h2>
          <button onClick={onClose} className="text-2xl text-primary-500">
            <FaTimes />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => handleCategorySelect(category.name)}
              className={`p-3 rounded-lg text-center ${
                selectedCategory === category.name
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {selectedCategory && (
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {selectedCategory} Filters
            </h3>
            {currentCategory?.filters.map((filter) => (
              <div key={filter} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={filter}
                  checked={selectedFilters.includes(filter)}
                  onChange={() => handleFilterToggle(filter)}
                  className="mr-2 text-primary-500"
                />
                <label className="font-light" htmlFor={filter}>{filter}</label>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-full flex justify-center">
      <button
        onClick={handleApplyFilters}
        className="fixed bottom-16 mx-4 w-5/6 bg-primary-500 text-white font-extrabold py-2 rounded-lg"
      >
        Apply Filters
      </button>
      </div>
      
    </div>
  );
};

export default CategoryModal;
