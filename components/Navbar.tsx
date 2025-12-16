import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, LayoutDashboard, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-200 text-sm font-medium ${
      isActive
        ? 'bg-md-secondaryContainer text-md-onPrimaryContainer'
        : 'text-md-secondary hover:bg-gray-100'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-md-surfaceContainer shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="bg-md-primary p-2 rounded-lg">
                 <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">
                Умный мониторинг
              </span>
            </div>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-4">
              <NavLink to="/" className={getLinkClass}>
                <Menu className="w-4 h-4" />
                Операции
              </NavLink>
              <NavLink to="/analytics" className={getLinkClass}>
                <LayoutDashboard className="w-4 h-4" />
                Аналитика
              </NavLink>
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-md-primary/10 flex items-center justify-center text-md-primary font-bold">
              A
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
