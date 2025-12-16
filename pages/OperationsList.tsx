import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Clock, MapPin, Calendar, AlertCircle, ChevronDown } from 'lucide-react';
import { MOCK_OPERATIONS } from '../constants';
import { OperationType, FilterState } from '../types';

const OperationsList: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: 'Все',
    site: '',
    date: ''
  });

  const uniqueSites = useMemo(() => {
    return Array.from(new Set(MOCK_OPERATIONS.map(op => op.siteName)));
  }, []);

  const filteredOperations = useMemo(() => {
    return MOCK_OPERATIONS.filter(op => {
      const matchesSearch = op.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = filters.type === 'Все' || op.type === filters.type;
      const matchesSite = filters.site === '' || op.siteName === filters.site;
      const matchesDate = filters.date === '' || op.date === filters.date;
      return matchesSearch && matchesType && matchesSite && matchesDate;
    });
  }, [filters]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Все операции</h1>
        <p className="text-gray-500 mt-1">Управление и мониторинг текущих процессов</p>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-[20px] shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center border border-gray-100">
        
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Поиск по названию..."
            className="block w-full pl-10 pr-3 py-2.5 border border-md-outline/30 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-md-primary/50 focus:border-md-primary sm:text-sm transition duration-150 ease-in-out"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        {/* Filter Group */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto flex-1 justify-end">
           {/* Date Filter */}
           <div className="relative">
             <input 
               type="date"
               className="pl-3 pr-3 py-2.5 border border-md-outline/30 rounded-xl text-sm text-gray-700 focus:ring-2 focus:ring-md-primary/50 outline-none"
               value={filters.date}
               onChange={(e) => handleFilterChange('date', e.target.value)}
             />
           </div>

           {/* Type Filter */}
           <div className="relative">
             <select 
               className="appearance-none pl-3 pr-8 py-2.5 border border-md-outline/30 rounded-xl text-sm text-gray-700 bg-white focus:ring-2 focus:ring-md-primary/50 outline-none cursor-pointer pr-10"
               value={filters.type}
               onChange={(e) => handleFilterChange('type', e.target.value as OperationType | 'Все')}
             >
               <option value="Все">Все типы</option>
               <option value="Разгрузка">Разгрузка</option>
               <option value="Погрузка">Погрузка</option>
             </select>
             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
           </div>

           {/* Site Filter */}
           <div className="relative">
             <select 
               className="appearance-none pl-3 pr-8 py-2.5 border border-md-outline/30 rounded-xl text-sm text-gray-700 bg-white focus:ring-2 focus:ring-md-primary/50 outline-none cursor-pointer pr-10"
               value={filters.site}
               onChange={(e) => handleFilterChange('site', e.target.value)}
             >
               <option value="">Все площадки</option>
               {uniqueSites.map(site => (
                 <option key={site} value={site}>{site}</option>
               ))}
             </select>
             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
           </div>
        </div>
      </div>

      {/* Operations List */}
      <div className="flex flex-col gap-4">
        {filteredOperations.map((op) => (
          <div 
            key={op.id}
            onClick={() => navigate(`/operations/${op.id}`)}
            className={`
              bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 
              hover:shadow-md hover:border-md-primary/30 cursor-pointer 
              transition-all duration-200 group
            `}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Left Side: Basic Info */}
              <div className="flex-1 min-w-0">
                 <div className="flex items-center gap-3 mb-2">
                    <span className={`
                      inline-block px-3 py-1 rounded-full text-xs font-medium
                      ${op.type === 'Погрузка' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-emerald-100 text-emerald-800'}
                    `}>
                      {op.type}
                    </span>
                    <span className="text-xs text-gray-400 hidden sm:inline-block">ID: {op.id}</span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 group-hover:text-md-primary transition-colors mb-2 truncate">
                    {op.name}
                 </h3>
                 <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-md-secondary" />
                      {op.siteName}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-md-secondary" />
                      {new Date(op.date).toLocaleDateString('ru-RU')}
                    </div>
                 </div>
              </div>

              {/* Right Side: Metrics & Status */}
              <div className="flex items-center gap-4 md:border-l md:border-gray-100 md:pl-6 pt-4 md:pt-0 border-t border-gray-100 md:border-t-0 mt-4 md:mt-0">
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                    <div className="text-right">
                        <div className="flex items-center justify-end text-sm font-medium text-gray-900">
                        <Clock className="w-4 h-4 mr-2 text-md-primary" />
                        <span>{op.totalTimeMinutes} мин.</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1 text-right">
                        Норма: {op.normTimeMinutes} мин
                        </div>
                    </div>
                  </div>

                  {op.isExceeded && (
                     <div className="flex items-center justify-center w-10 h-10 bg-md-errorContainer rounded-full text-md-onErrorContainer flex-shrink-0" title="Превышение нормы">
                        <AlertCircle className="w-5 h-5" />
                     </div>
                  )}
              </div>

            </div>
          </div>
        ))}

        {filteredOperations.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Операции не найдены
          </div>
        )}
      </div>
    </div>
  );
};

export default OperationsList;