import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import OperationsList from './pages/OperationsList';
import OperationDetails from './pages/OperationDetails';
import Analytics from './pages/Analytics';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-md-surface flex flex-col font-sans text-gray-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/operations" replace />} />
            <Route path="/operations" element={<OperationsList />} />
            <Route path="/operations/:id" element={<OperationDetails />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-400">
              © 2023 Smart Monitoring System. Prototype Build.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
