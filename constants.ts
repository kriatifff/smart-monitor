import { Operation, AnalyticData } from './types';

export const STAGE_NAMES = [
  'Допуск на производственную площадку',
  'Подготовка к разгрузке',
  'Разгрузка',
  'Завершение погрузки',
  'Выезд с производственной площадки',
  'Зачистка вагона'
];

const generateStages = (baseDate: Date, totalMinutes: number) => {
  let currentTime = new Date(baseDate);
  const stageDuration = Math.floor(totalMinutes / 6);
  
  return STAGE_NAMES.map((name, index) => {
    currentTime = new Date(currentTime.getTime() + stageDuration * 60000);
    return {
      id: `stage-${index}`,
      name,
      durationMinutes: stageDuration + (Math.floor(Math.random() * 10) - 5), // Random variation
      completedAt: currentTime.toISOString(),
      status: 'completed' as const
    };
  });
};

export const MOCK_OPERATIONS: Operation[] = [
  {
    id: 'OP-1001',
    name: 'Поставка сырья №402',
    type: 'Разгрузка',
    siteName: 'Площадка А-1',
    date: '2023-10-25',
    totalTimeMinutes: 145,
    normTimeMinutes: 120,
    isExceeded: true,
    stages: generateStages(new Date('2023-10-25T08:00:00'), 145)
  },
  {
    id: 'OP-1002',
    name: 'Отгрузка продукции №88',
    type: 'Погрузка',
    siteName: 'Терминал Юг',
    date: '2023-10-25',
    totalTimeMinutes: 90,
    normTimeMinutes: 100,
    isExceeded: false,
    stages: generateStages(new Date('2023-10-25T10:30:00'), 90)
  },
  {
    id: 'OP-1003',
    name: 'Поставка щебня',
    type: 'Разгрузка',
    siteName: 'Площадка А-1',
    date: '2023-10-24',
    totalTimeMinutes: 110,
    normTimeMinutes: 120,
    isExceeded: false,
    stages: generateStages(new Date('2023-10-24T09:15:00'), 110)
  },
  {
    id: 'OP-1004',
    name: 'Транзит спецтехники',
    type: 'Погрузка',
    siteName: 'Склад 4',
    date: '2023-10-24',
    totalTimeMinutes: 200,
    normTimeMinutes: 150,
    isExceeded: true,
    stages: generateStages(new Date('2023-10-24T14:00:00'), 200)
  },
  {
    id: 'OP-1005',
    name: 'Прием топлива',
    type: 'Разгрузка',
    siteName: 'Терминал Север',
    date: '2023-10-23',
    totalTimeMinutes: 95,
    normTimeMinutes: 100,
    isExceeded: false,
    stages: generateStages(new Date('2023-10-23T11:00:00'), 95)
  },
];

// Generate analytic data for the last 7 days
export const ANALYTIC_DATA: AnalyticData[] = Array.from({ length: 7 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (6 - i));
  return {
    date: date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
    avgTime: 100 + Math.floor(Math.random() * 50),
    normTime: 120,
    exceededCount: Math.floor(Math.random() * 5),
  };
});

export const STAGE_DISTRIBUTION = STAGE_NAMES.map(name => ({
  name: name.split(' ').slice(0, 2).join(' ') + '...', // Shorten name for chart
  fullName: name,
  value: Math.floor(Math.random() * 30) + 10
}));
