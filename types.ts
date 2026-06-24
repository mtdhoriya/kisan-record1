export interface Crop {
  id: string;
  name: string;
  area: number; // in Acres
  date: string; // e.g. "12 Nov 2024"
  status: 'Growing' | 'Sowing' | 'Completed' | 'Upcoming';
  image: string;
  type: 'wheat' | 'paddy' | 'soybean' | 'maize' | 'onion' | 'other';
  expectedYield?: number; // Quintal/Acre
  totalCost?: number; // in ₹
  marketPrice?: number; // per Quintal
}

export interface Transaction {
  id: string;
  title: string;
  type: 'income' | 'expense';
  amount: number;
  date: string;
  category: 'crop_sale' | 'fertilizer' | 'pesticide' | 'labor' | 'seeds' | 'equipment' | 'other';
}

export interface MandiRate {
  id: string;
  commodity: string;
  currentPrice: number; // in ₹ per Quintal
  minPrice: number;
  maxPrice: number;
  change: number; // in ₹
  changeType: 'up' | 'down' | 'stable';
  trendPercentage: number;
}

export interface FertilizerTask {
  id: string;
  title: string;
  dayNum: number;
  stage: string;
  dosage: string;
  method: string;
  status: 'Overdue' | 'Scheduled' | 'Upcoming' | 'Completed';
  statusBadge: 'MISSING' | 'READY' | 'PLANNED' | 'APPLIED';
  notes?: string;
  category: 'fertilizer' | 'spray' | 'booster';
}

export interface GovernmentScheme {
  id: string;
  title: string;
  description: string;
  benefit: string;
  eligibility: string;
  subsidy?: string;
  deadline?: string;
  category: 'Subsidies' | 'Insurance' | 'Irrigation' | 'Education';
  image: string;
  popular?: boolean;
}

export interface HarvestReminder {
  id: string;
  fieldId: string;
  cropName: string;
  variety: string;
  maturityProgress: number; // 0 - 100
  expectedDate: string;
  estimatedYieldRange: string;
  image: string;
  checklist: { id: string; text: string; subtext: string; checked: boolean; icon: string }[];
}

export type ScreenId =
  | 'home'
  | 'crops'
  | 'expenses'
  | 'mandi'
  | 'fertilizer_schedule'
  | 'profile'
  | 'schemes'
  | 'harvest'
  | 'language'
  | 'reports'
  | 'admin_login';
