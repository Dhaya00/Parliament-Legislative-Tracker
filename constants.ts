
import { Bill, BillStatus, NewsItem } from './types';

// Representative data for Indian Parliament with enhanced details
const rawBills: Bill[] = [
  {
    id: '108',
    title: 'The Disaster Management (Amendment) Bill, 2024',
    status: BillStatus.PENDING,
    dateIntroduced: '2024-08-15',
    ministry: 'Home Affairs',
    chamber: 'Lok Sabha',
    summary: 'Aims to strengthen the disaster management framework and define the roles of various authorities.',
    priority: 'High',
    state: 'Delhi',
    gazetteNumber: 'GSR-2024-08-15-H',
    committeeStatus: 'Referred to Standing Committee on Home Affairs',
    financialImplication: 'Estimated ₹1,200 Crores for infrastructure upgrades.',
    keyStakeholders: ['NDRF', 'SDMA', 'State Governments'],
    legislativeHistory: [
      { date: '2024-08-15', action: 'Introduced in Lok Sabha' },
      { date: '2024-08-20', action: 'Discussion on preliminary clauses' }
    ]
  },
  {
    id: '107',
    title: 'The Banking Laws (Amendment) Bill, 2024',
    status: BillStatus.INTRODUCED,
    dateIntroduced: '2024-08-12',
    ministry: 'Finance',
    chamber: 'Lok Sabha',
    summary: 'Proposes amendments to allow the increase in the number of nominees for bank account holders.',
    priority: 'Medium',
    state: 'Maharashtra',
    gazetteNumber: 'FIN-REG-2024-B',
    committeeStatus: 'Under preliminary review',
    financialImplication: 'Minimal administrative costs.',
    keyStakeholders: ['RBI', 'Public Sector Banks', 'Account Holders'],
    legislativeHistory: [
      { date: '2024-08-12', action: 'Introduced in Lok Sabha' }
    ]
  },
  {
    id: '106',
    title: 'The Oilfields (Regulation and Development) Amendment Bill, 2024',
    status: BillStatus.PENDING,
    dateIntroduced: '2024-08-10',
    ministry: 'Petroleum and Natural Gas',
    chamber: 'Rajya Sabha',
    summary: 'Aims to modernize the regulation of oilfields and promote sustainable development in the energy sector.',
    priority: 'High',
    state: 'Assam',
    gazetteNumber: 'PNG-RD-2024-03',
    committeeStatus: 'Pending review in Upper House',
    financialImplication: 'Regulatory oversight increase of ₹45 Crores.',
    keyStakeholders: ['ONGC', 'Private Drillers', 'Environmental Ministry'],
    legislativeHistory: [
      { date: '2024-08-10', action: 'Introduced in Rajya Sabha' }
    ]
  },
  {
    id: '105',
    title: 'The Waqf (Amendment) Bill, 2024',
    status: BillStatus.PENDING,
    dateIntroduced: '2024-08-08',
    ministry: 'Minority Affairs',
    chamber: 'Lok Sabha',
    summary: 'Proposes to amend the Waqf Act, 1995, to enhance accountability and transparency in Waqf boards.',
    priority: 'High',
    state: 'Uttar Pradesh',
    gazetteNumber: 'MIN-WAQF-2024-12',
    committeeStatus: 'JPC (Joint Parliamentary Committee) Review',
    financialImplication: 'Central registry setup cost ₹85 Crores.',
    keyStakeholders: ['Waqf Boards', 'Central Waqf Council', 'Religious Institutions'],
    legislativeHistory: [
      { date: '2024-08-08', action: 'Introduced in Lok Sabha' },
      { date: '2024-08-12', action: 'Referred to JPC' }
    ]
  },
  {
    id: '104',
    title: 'The Bharatiya Nyaya (Second) Sanhita, 2023',
    status: BillStatus.ASSENTED,
    dateIntroduced: '2023-12-12',
    ministry: 'Home Affairs',
    chamber: 'Both',
    summary: 'Replaces the Indian Penal Code, 1860, with modern legal provisions.',
    priority: 'High',
    state: 'Delhi',
    gazetteNumber: 'LAW-BNS-2023-45',
    committeeStatus: 'Passed all reviews',
    financialImplication: 'Significant judicial training costs.',
    keyStakeholders: ['Bar Council of India', 'State Police Forces', 'Judiciary'],
    legislativeHistory: [
      { date: '2023-12-12', action: 'Introduced' },
      { date: '2023-12-20', action: 'Passed LS' },
      { date: '2023-12-21', action: 'Passed RS' },
      { date: '2023-12-25', action: 'Presidential Assent Received' }
    ]
  }
];

export const MOCK_BILLS: Bill[] = [...rawBills].sort((a, b) => parseInt(b.id) - parseInt(a.id));

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Election Commission Prepares for 2026 Assembly Polls',
    category: 'Election',
    date: '2024-10-15',
    content: 'The Election Commission of India has started mapping booths in key states ahead of the scheduled assembly elections in 2026.',
    source: 'Official Press Bureau'
  },
  {
    id: 'n2',
    title: 'New Infrastructure Policy to Focus on Green Corridors',
    category: 'Policy',
    date: '2024-10-12',
    content: 'A high-level cabinet committee has approved the draft for the National Green Corridor Policy, aiming to reduce carbon footprints of major highways.',
    source: 'Ministry of Road Transport'
  },
  {
    id: 'n3',
    title: 'India to Host Global Trade Summit in New Delhi',
    category: 'International',
    date: '2024-10-10',
    content: 'Representatives from over 40 nations are expected to attend the 2026 Trade Summit hosted at the Bharat Mandapam.',
    source: 'Ministry of External Affairs'
  },
  {
    id: 'n4',
    title: 'Digital Rupee Expansion: Pilot Program Hits 50 Cities',
    category: 'Policy',
    date: '2024-10-08',
    content: 'The RBI announced that the CBDC (Digital Rupee) pilot has successfully expanded to 50 cities across India.',
    source: 'Reserve Bank of India'
  }
];

export const STATUS_COLORS = {
  [BillStatus.INTRODUCED]: '#3b82f6',
  [BillStatus.PENDING]: '#f59e0b',
  [BillStatus.PASSED_LS]: '#10b981',
  [BillStatus.PASSED_RS]: '#059669',
  [BillStatus.ASSENTED]: '#047857',
  [BillStatus.WITHDRAWN]: '#ef4444',
};
