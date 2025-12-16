import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, MapPin, Calendar, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { MOCK_OPERATIONS } from '../constants';
import { Operation } from '../types';

const OperationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [operation, setOperation] = useState<Operation | null>(null);

  useEffect(() => {
    const found = MOCK_OPERATIONS.find(op => op.id === id);
    if (found) {
      setOperation(found);
    }
  }, [id]);

  if (!operation) {
    return <div className="p-8 text-center text-gray-500">Загрузка...</div>;
  }

  const handleExport = () => {
    alert(`Выгрузка отчета по операции ${operation.name}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Navigation & Actions */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-md-secondary hover:text-md-primary transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Назад к списку
        </button>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 bg-white border border-md-outline/30 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition shadow-sm font-medium text-sm"
        >
          <Download className="w-4 h-4" />
          Выгрузить отчёт
        </button>
      </div>

      {/* Header Card */}
      <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className={`
              inline-block px-3 py-1 rounded-full text-sm font-medium
              ${operation.type === 'Погрузка' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-emerald-100 text-emerald-800'}
            `}>
              {operation.type}
            </span>
            
            {operation.isExceeded && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-md-errorContainer text-md-onErrorContainer">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Превышение нормы (+{operation.totalTimeMinutes - operation.normTimeMinutes} мин.)</span>
              </span>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900">{operation.name}</h1>
          <div className="text-sm text-gray-400 mt-1">ID: {operation.id}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3">
             <div className="bg-gray-100 p-2.5 rounded-xl text-gray-600">
               <MapPin className="w-6 h-6" />
             </div>
             <div>
               <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Площадка</p>
               <p className="font-semibold text-gray-900">{operation.siteName}</p>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="bg-gray-100 p-2.5 rounded-xl text-gray-600">
               <Calendar className="w-6 h-6" />
             </div>
             <div>
               <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Дата проведения</p>
               <p className="font-semibold text-gray-900">{new Date(operation.date).toLocaleDateString('ru-RU')}</p>
             </div>
          </div>

          <div className="flex items-center gap-3">
             <div className={`p-2.5 rounded-xl ${operation.isExceeded ? 'bg-md-errorContainer text-md-onErrorContainer' : 'bg-md-primaryContainer text-md-onPrimaryContainer'}`}>
               <Clock className="w-6 h-6" />
             </div>
             <div>
               <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Затраченное время</p>
               <p className="font-semibold text-gray-900">
                 {operation.totalTimeMinutes} мин. 
                 <span className="text-gray-400 font-normal ml-2 text-sm">(Норма: {operation.normTimeMinutes})</span>
               </p>
             </div>
          </div>
        </div>
      </div>

      {/* Timeline Stages */}
      <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Этапы выполнения</h2>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-4 bottom-8 w-0.5 bg-gray-200" />

          <div className="space-y-8">
            {operation.stages.map((stage, index) => (
              <div key={stage.id} className="relative flex items-start group">
                {/* Connector Dot */}
                <div className={`
                  absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-white z-10
                  ${stage.status === 'completed' ? 'border-md-primary bg-md-primary' : 'border-gray-300'}
                `}>
                  {stage.status === 'completed' && <CheckCircle2 className="w-full h-full text-white p-0.5" />}
                </div>

                {/* Content */}
                <div className="ml-16 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{stage.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Завершено: {new Date(stage.completedAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="mt-3 sm:mt-0 flex items-center">
                      <div className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 shadow-sm">
                        {stage.durationMinutes} мин
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default OperationDetails;