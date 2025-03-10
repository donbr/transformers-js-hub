import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LoadingIndicator from './components/UI/LoadingIndicator';

// Pages
import HomePage from './pages/Home';
import CategoryPage from './pages/Category';
import ModelDetailPage from './pages/ModelDetail';
import AllModelsPage from './pages/AllModels';
import NotFoundPage from './pages/NotFound';

// Sample data import (in production, this would be fetched from an API)
import modelsData from './data/models.json';

function App() {
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      try {
        // In a real app, you would fetch this data from an API
        // const response = await fetch('/api/models');
        // const data = await response.json();
        
        // Using imported data for demonstration
        setModels(modelsData.models);
        setCategories(modelsData.categories);
        
        // Simulate loading delay
        setTimeout(() => {
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={<HomePage models={models} categories={categories} />} 
            />
            <Route 
              path="/category/:categoryId" 
              element={<CategoryPage models={models} categories={categories} />} 
            />
            <Route 
              path="/models/:modelId" 
              element={<ModelDetailPage models={models} categories={categories} />} 
            />
            <Route 
              path="/all-models" 
              element={<AllModelsPage models={models} categories={categories} />} 
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
