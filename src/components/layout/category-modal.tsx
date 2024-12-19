import React, { useState, useEffect } from "react";
import { FaTimes, FaStar } from "react-icons/fa";

interface ButtonCategory {
  vehicle: { name: string; key: string }[];
  Features: { name: string; key: string }[];
  Activity: { name: string; key: string }[];
  [key: string]: { name: string; key: string }[]; // Add index signature
}

const buttonCategory: ButtonCategory[] = [
  {
    vehicle: [
      { name: "Car", key: "car" },
      { name: "Bike", key: "bike" },
      { name: "Bus", key: "bus" },
      { name: "Motorcycle", key: "motorcycle" },
      { name: "Scooter", key: "scooter" },
      { name: "Truck", key: "truck" },
      { name: "Van", key: "van" },
      { name: "Yacht", key: "yacht" },
    ],
    Features: [
      { name: "Air Conditioning", key: "air-conditioning" },
      { name: "Automatic Transmission", key: "automatic-transmission" },
      { name: "Bluetooth", key: "bluetooth" },
      { name: "Child Seat", key: "child-seat" },
      { name: "GPS", key: "gps" },
      { name: "Heated Seats", key: "heated-seats" },
    ],
    Activity: [{ name: "Adventure", key: "adventure" },
    { name: "Beach", key: "beach" },
    { name: "Camping", key: "camping" },
    { name: "Cycling", key: "cycling" },
    { name: "Hiking", key: "hiking" },
    { name: "Sightseeing", key: "sightseeing" },
    { name: "Swimming", key: "swimming" },
    { name: "Walking", key: "walking" },
    { name: "Water Sports", key: "water-sports" },
    { name: "Wildlife", key: "wildlife" }],
  },
];
const categories = [
  {
    name: "Tours",
    key: "tours",
    filters: [
      { name: "Location", type: "text" },
      { name: "Min-Price", type: "range" },
      { name: "Max-Price", type: "range" },
      { name: "Min-Duration", type: "number" },
      { name: "Max-Duration", type: "number" },
      { name: "Date", type: "date" },
      { name: "Min-Rate", type: "stars" },
      { name: "Max-Rate", type: "stars" },
    ],
  },
  {
    name: "Tickets",
    key: "tickets",
    filters: [
      { name: "Event Type", type: "checkbox" },
      { name: "Min Price", type: "text" },
      { name: "Max Price", type: "text" },
      { name: "Date", type: "date" },
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
  onApplyFilters: (
    category: string,
    filters: { [key: string]: string }
  ) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  onClose,
  onApplyFilters,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string;
  }>({});
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFilterChange = (filter: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: value, // Filtre adı ve değerini state'e kaydet
    }));
  };

  const handleStarChange = (filter: string, stars: number) => {
    handleFilterChange(filter, stars.toString());
  };

  const handleApplyFilters = () => {
    if (selectedCategory) {
      // Tüm filtreleri seçili kategori ile birlikte gönder
      onApplyFilters(selectedCategory, selectedFilters);
    }
    console.log("Selected Filters:", selectedFilters);
    onClose();
  };

  const currentCategory = categories.find(
    (cat) => cat.name === selectedCategory
  );

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false); // Kategori seçildikten sonra menüyü kapat
  };

  return (
    <div
      className={`fixed overflow-y-scroll inset-0 z-50 bg-white shadow-lg transition-all duration-700 ${
        isVisible ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-full"
      }`}
      onAnimationEnd={() => !isVisible && onClose()}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary-500">Categories</h2>
          <button onClick={onClose} className="text-2xl text-primary-500">
            <FaTimes />
          </button>
        </div>

        <div className="relative w-64">
          {/* Dropdown Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-3 bg-gray-100 text-gray-700 rounded-lg text-left flex justify-between items-center"
          >
            {selectedCategory || "Select a Category"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg transition-all duration-700 ${
              isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => handleCategorySelect(category.name)}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  selectedCategory === category.name
                    ? "bg-primary-500 text-white font-semibold"
                    : "hover:bg-gray-100 text-primary-500"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {selectedCategory && (
          <div>
            <h3 className="text-lg font-semibold my-3  text-primary-400">
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
                      type="checkbox"
                      id={filter.name}
                      checked={!!selectedFilters[filter.name]}
                      onChange={(e) =>
                        handleFilterChange(
                          filter.name,
                          e.target.checked ? "true" : ""
                        )
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
                          className={`cursor-pointer text-xl mr-2 ${
                            selectedFilters[filter.name] &&
                            parseInt(selectedFilters[filter.name]) >= star
                              ? "text-primary-400 duration-700"
                              : "text-gray-300 duration-700"
                          }`}
                          onClick={() => handleStarChange(filter.name, star)}
                        />
                      ))}
                    </div>
                    <span className="ml-2">
                      {selectedFilters[filter.name] || 0} Star
                      {selectedFilters[filter.name] &&
                      parseInt(selectedFilters[filter.name]) > 1
                        ? "s"
                        : ""}
                    </span>
                  </div>
                ) : filter.type === "date" ? (
                  <div className="flex items-center w-full">
                    <label className="font-light mr-2" htmlFor={filter.name}>
                      {filter.name}
                    </label>
                    <input
                      type="date"
                      id={filter.name}
                      value={selectedFilters[filter.name] || ""}
                      onChange={(e) =>
                        handleFilterChange(filter.name, e.target.value)
                      }
                      className="p-2 border w-[235px] rounded-lg ml-auto"
                    />
                  </div>
                ) : filter.type === "text" ? (
                  <div className="flex items-center w-full">
                    <label className="font-light mr-2" htmlFor={filter.name}>
                      {filter.name}
                    </label>
                    <input
                      type="text"
                      id={filter.name}
                      value={selectedFilters[filter.name] || ""}
                      onChange={(e) =>
                        handleFilterChange(filter.name, e.target.value)
                      }
                      className="p-2 border rounded-lg ml-auto"
                    />
                  </div>
                ) : filter.type === "range" ? (
                  <div className="flex items-center w-full">
                    <label className="font-light mr-2" htmlFor={filter.name}>
                      {filter.name}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="9999"
                      step="1"
                      id={filter.name}
                      value={selectedFilters[filter.name] || ""}
                      onChange={(e) =>
                        handleFilterChange(filter.name, e.target.value)
                      }
                      className="p-2 border ml-auto  h-[10px] bg-gray-300 rounded-lg appearance-none cursor-pointer 
                   accent-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <input
                      className="border-2 border-gray-300 rounded-lg p-2 max-w-20  ml-2"
                      onChange={(e) =>
                        handleFilterChange(filter.name, e.target.value)
                      }
                      value={selectedFilters[filter.name]}
                    ></input>
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




          
      <div className="flex flex-wrap gap-2 mx-5 pb-4">
  {buttonCategory.map((category, index) => 
    Object.keys(category).map((subCategoryKey) => (
      <div key={`${subCategoryKey}-${index}`} className="w-full mb-4">
        {/* Başlık */}
        <label className="block text-lg font-semibold mb-2 capitalize">
          {subCategoryKey}
        </label>

        {/* Alt Öğeler */}
        <div className="flex flex-wrap gap-2">
          {category[subCategoryKey].map((subCategory) => (
            <div key={subCategory.key}>
              <button
                className={`px-4 py-2 rounded-full border text-sm ${
                  selectedFilters[subCategory.key]
                    ? "bg-primary-500 text-white"
                    : "bg-white text-primary-500"
                }`}
                onClick={() =>
                  handleFilterChange(
                    subCategory.key,
                    selectedFilters[subCategory.key] ? "" : "true"
                  )
                }
              >
                {subCategory.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    ))
  )}
</div>





      <div className="w-full flex flex-row pb-4">
        <button
          onClick={handleApplyFilters}
          className="mx-2 w-3/6 bg-primary-500 text-white font-extrabold py-4 rounded-lg"
        >
          Search
        </button>
        <button
          onClick={() => setSelectedFilters({})}
          className="mx-2 w-3/6 bg-gray-400 text-white font-extrabold py-4 rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CategoryModal;
