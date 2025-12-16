export type OperationType = 'Разгрузка' | 'Погрузка';

export interface Stage {
  id: string;
  name: string;
  durationMinutes: number;
  completedAt: string; // ISO Date string
  status: 'completed' | 'pending' | 'active';
}

export interface Operation {
  id: string;
  name: string;
  type: OperationType;
  siteName: string;
  date: string; // ISO Date string
  totalTimeMinutes: number;
  normTimeMinutes: number;
  isExceeded: boolean;
  stages: Stage[];
}

export interface FilterState {
  search: string;
  type: OperationType | 'Все';
  site: string;
  date: string;
}

export interface AnalyticData {
  date: string;
  avgTime: number;
  normTime: number;
  exceededCount: number;
}
