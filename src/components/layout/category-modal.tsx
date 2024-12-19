import React, { useState } from "react";
import { FaTimes, FaStar } from "react-icons/fa";

const categories = [
  {
    name: "Tours",
    key: "tours",
    filters: [
      { name: "Location", type: "text" },
      { name: "Min Price", type: "number" },
      { name: "Max Price", type: "number" },
      { name: "Max-Duration", type: "number" },
      { name: "Min-Duration", type: "number" },
      { name: "Max-Rate", type: "stars" },
      { name: "Min-Rate", type: "stars" },
    ],
  },
  {
    name: "Tickets",
    key: "tickets",
    filters: [
      { name: "Event Type", type: "checkbox" },
      { name: "Min Price", type: "text" },
      { name: "Max Price", type: "text" },
      { name: "Date", type: "checkbox" },
    ],
  },
  {
    name: "Rent",
    key: "rent",
    filters: [
      { name: "Vehicle Type", type: "checkbox" },
      { name: "Min Price", type: "text" },
      { name: "Max Price", type: "text" },
      { name: "Location", type: "checkbox" },
    ],
  },
  {
    name: "Transfer",
    key: "transfer",
    filters: [
      { name: "From", type: "checkbox" },
      { name: "To", type: "checkbox" },
      { name: "Date", type: "checkbox" },
    ],
  },
];

interface CategoryModalProps {
  onClose: () => void;
  onApplyFilters: (category: string, filters: { [key: string]: string }) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  onClose,
  onApplyFilters,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({});

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedFilters({});
  };

  const handleFilterChange = (filter: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: value,
    }));
  };

  const handleStarChange = (filter: string, stars: number) => {
    handleFilterChange(filter, String(stars));
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
              <div key={filter.name} className="flex items-center mb-2">
                {filter.type === "checkbox" ? (
                  <div className="flex items-center w-full">
                    <label className="font-light mr-2" htmlFor={filter.name}>
                      {filter.name}
                    </label>
                    <input
                      type={filter.type}
                      id={filter.name}
                      checked={!!selectedFilters[filter.name]}
                      onChange={(e) =>
                        handleFilterChange(filter.name, e.target.checked ? "true" : "")
                      }
                      className="ml-auto text-primary-500"
                    />
                  </div>
                ) : filter.type === "stars" ? (
                  <div className="flex items-center w-full">
                    <label className="font-light mr-2">{filter.name}: </label>
                    <div className="flex ml-auto">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`cursor-pointer text-xl ${
                            selectedFilters[filter.name] && parseInt(selectedFilters[filter.name]) >= star
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                          onClick={() => handleStarChange(filter.name, star)}
                        />
                      ))}
                    </div>
                    <span className="ml-2">
                      {selectedFilters[filter.name] || 0} Star{selectedFilters[filter.name] && parseInt(selectedFilters[filter.name]) > 1 ? "s" : ""}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center w-full">
                    <label className="font-light mr-2" htmlFor={filter.name}>
                      {filter.name}
                    </label>
                    <input
                      type="number"
                      id={filter.name}
                      value={selectedFilters[filter.name] || ""}
                      onChange={(e) =>
                        handleFilterChange(filter.name, e.target.value)
                      }
                      className="p-2 border rounded-lg ml-auto"
                    />
                  </div>
                )}
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
