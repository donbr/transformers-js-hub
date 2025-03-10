import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-yellow-500 text-2xl font-bold">⚡</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Transformers.js Hub</h1>
              <p className="text-sm">Run State-of-the-Art AI Models in Your Browser</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-lg">
            <Link to="/" className="font-medium hover:underline">
              Home
            </Link>
            <Link to="/#categories" className="font-medium hover:underline">
              Categories
            </Link>
            <Link to="/#featured" className="font-medium hover:underline">
              Featured Models
            </Link>
            <a
              href="https://github.com/huggingface/transformers.js-examples"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              GitHub
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden bg-white bg-opacity-20 rounded p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white border-opacity-20">
            <nav className="flex flex-col space-y-3 text-lg">
              <Link
                to="/"
                className="font-medium hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/#categories"
                className="font-medium hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/#featured"
                className="font-medium hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Featured Models
              </Link>
              <a
                href="https://github.com/huggingface/transformers.js-examples"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline"
              >
                GitHub
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
