'use client';
import React, { useState } from 'react';
import { FaBars, FaUser } from 'react-icons/fa';
import CategoryModal from './category-modal';
import Image from 'next/image';
import nav from '../../../public/nav.png';

interface NavbarProps {
  onApplyFilters: (category: string, filters: { [key: string]: string }) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onApplyFilters }) => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const toggleCategoryModal = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };

  return (
    <nav className="fixed text-gray-800 top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="flex justify-between items-center p-4">
        <button 
          onClick={toggleCategoryModal} 
          className="text-primary-500 text-2xl"
        >
          <FaBars />
        </button>
        <div>
          <Image className="h-8 w-auto" src={nav} alt="Navigation" />
        </div>

        <button
          onClick={() => window.location.href = '/login'}
          className="text-primary-400 text-xl"
        >
          <FaUser />
        </button>
      </div>

      {isCategoryModalOpen && (
        <CategoryModal 
          onClose={toggleCategoryModal} 
          onApplyFilters={(category: string, filters: { [key: string]: string }) => {
            onApplyFilters(category, filters); // Filtreleri üst bileşene ilet
            toggleCategoryModal(); // Modal'ı kapat
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
