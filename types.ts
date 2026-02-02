
export enum BillStatus {
  INTRODUCED = 'Introduced',
  PENDING = 'Pending',
  PASSED_LS = 'Passed in Lok Sabha',
  PASSED_RS = 'Passed in Rajya Sabha',
  ASSENTED = 'Assented by President',
  WITHDRAWN = 'Withdrawn'
}

export interface User {
  username: string;
  isLoggedIn: boolean;
}

export interface Bill {
  id: string; // Used for sorting DESC
  title: string;
  status: BillStatus;
  dateIntroduced: string;
  ministry: string;
  chamber: 'Lok Sabha' | 'Rajya Sabha' | 'Both';
  summary: string;
  priority: 'High' | 'Medium' | 'Low';
  state?: string;
  // Enhanced Details
  gazetteNumber?: string;
  committeeStatus?: string;
  financialImplication?: string;
  keyStakeholders?: string[];
  legislativeHistory?: { date: string, action: string }[];
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'Election' | 'Policy' | 'International' | 'State Affairs';
  date: string;
  content: string;
  source: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'update' | 'sync' | 'news';
}

export interface SyncInfo {
  lastUpdated: string;
  nextScheduled: string;
  status: 'Idle' | 'Syncing' | 'Completed';
}
