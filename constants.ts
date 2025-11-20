import { Question } from './types';

export const QUESTIONS: Question[] = [
  // Financial
  {
    id: 'f1',
    category: 'Financial',
    text: 'Does your business have audited financial statements for the last 3 years?',
    weight: 3,
    options: [
      { value: 0, label: 'No, we do not have organized financials.' },
      { value: 3, label: 'We have internal bookkeeping only.' },
      { value: 7, label: 'We have compiled/reviewed statements.' },
      { value: 10, label: 'Yes, fully audited statements.' }
    ]
  },
  {
    id: 'f2',
    category: 'Financial',
    text: 'What is your recurring revenue percentage?',
    weight: 3,
    options: [
      { value: 0, label: 'Less than 10% (Project based)' },
      { value: 4, label: '10-30%' },
      { value: 7, label: '31-60%' },
      { value: 10, label: 'Over 60%' }
    ]
  },
  {
    id: 'f3',
    category: 'Financial',
    text: 'Do you have client concentration issues (single client > 20% revenue)?',
    weight: 3,
    options: [
      { value: 0, label: 'Yes, one client is > 50%.' },
      { value: 4, label: 'Yes, one client is 20-50%.' },
      { value: 8, label: 'Largest client is 10-20%.' },
      { value: 10, label: 'No, strictly diversified (<10%).' }
    ]
  },
  {
    id: 'f4',
    category: 'Financial',
    text: 'How accurate is your forecasting?',
    weight: 2,
    options: [
      { value: 2, label: 'We do not forecast.' },
      { value: 5, label: 'Hit or miss.' },
      { value: 8, label: 'Generally accurate within 15%.' },
      { value: 10, label: 'Highly predictive within 5%.' }
    ]
  },
  {
    id: 'f5',
    category: 'Financial',
    text: 'Are your taxes filed and paid on time with no outstanding liabilities?',
    weight: 3,
    options: [
      { value: 0, label: 'No, we have issues.' },
      { value: 5, label: 'Mostly, some minor delays.' },
      { value: 10, label: 'Yes, perfectly compliant.' }
    ]
  },

  // Operational
  {
    id: 'o1',
    category: 'Operational',
    text: 'How dependent is the business on the owner for daily operations?',
    weight: 3,
    options: [
      { value: 0, label: 'Business stops without owner.' },
      { value: 4, label: 'Owner is key decision maker for everything.' },
      { value: 7, label: 'Owner focuses on strategy, team handles ops.' },
      { value: 10, label: 'Owner is absentee/passive.' }
    ]
  },
  {
    id: 'o2',
    category: 'Operational',
    text: 'Are your standard operating procedures (SOPs) documented?',
    weight: 2,
    options: [
      { value: 0, label: 'No documentation.' },
      { value: 4, label: 'Some departments documented.' },
      { value: 8, label: 'Most core processes documented.' },
      { value: 10, label: 'Fully documented and digitized.' }
    ]
  },
  {
    id: 'o3',
    category: 'Operational',
    text: 'What is your employee turnover rate relative to industry average?',
    weight: 2,
    options: [
      { value: 0, label: 'High turnover.' },
      { value: 5, label: 'Average.' },
      { value: 10, label: 'Low turnover / High retention.' }
    ]
  },
  {
    id: 'o4',
    category: 'Operational',
    text: 'Do you have a second layer of management?',
    weight: 3,
    options: [
      { value: 0, label: 'No, everyone reports to owner.' },
      { value: 5, label: 'Developing key leaders.' },
      { value: 10, label: 'Yes, strong management team in place.' }
    ]
  },
  {
    id: 'o5',
    category: 'Operational',
    text: 'Is your technology stack modern and scalable?',
    weight: 2,
    options: [
      { value: 2, label: 'Legacy systems, manual work.' },
      { value: 6, label: 'Functional but aging.' },
      { value: 10, label: 'Modern, integrated cloud stack.' }
    ]
  },

  // Market
  {
    id: 'm1',
    category: 'Market',
    text: 'How is your market growth rate?',
    weight: 2,
    options: [
      { value: 2, label: 'Declining market.' },
      { value: 5, label: 'Stagnant/Stable.' },
      { value: 10, label: 'Growing market.' }
    ]
  },
  {
    id: 'm2',
    category: 'Market',
    text: 'What is your brand strength in the niche?',
    weight: 2,
    options: [
      { value: 2, label: 'Unknown.' },
      { value: 6, label: 'Known regionally.' },
      { value: 10, label: 'Market leader/National brand.' }
    ]
  },
  {
    id: 'm3',
    category: 'Market',
    text: 'How competitive is your specific niche?',
    weight: 2,
    options: [
      { value: 4, label: 'Highly commoditized.' },
      { value: 7, label: 'Moderate competition.' },
      { value: 10, label: 'High barrier to entry / Monopoly.' }
    ]
  },
  {
    id: 'm4',
    category: 'Market',
    text: 'Are your customer acquisition channels diversified?',
    weight: 2,
    options: [
      { value: 2, label: 'Rely on referrals only.' },
      { value: 6, label: '1-2 strong channels.' },
      { value: 10, label: 'Multiple scalable channels.' }
    ]
  },
  {
    id: 'm5',
    category: 'Market',
    text: 'Do you have proprietary IP or trade secrets?',
    weight: 3,
    options: [
      { value: 0, label: 'No.' },
      { value: 10, label: 'Yes, patents/trademarks/unique tech.' }
    ]
  },

  // Strategic
  {
    id: 's1',
    category: 'Strategic',
    text: 'Do you have a documented growth strategy?',
    weight: 2,
    options: [
      { value: 0, label: 'No, we wing it.' },
      { value: 5, label: 'Mental plan, loosely followed.' },
      { value: 10, label: 'Documented strategic plan executed quarterly.' }
    ]
  },
  {
    id: 's2',
    category: 'Strategic',
    text: 'Is the owner willing to stay on for a transition period?',
    weight: 2,
    options: [
      { value: 0, label: 'No, wants immediate exit.' },
      { value: 5, label: 'Short transition (3-6 months).' },
      { value: 10, label: 'Willing to stay 1-2 years if needed.' }
    ]
  },
  {
    id: 's3',
    category: 'Strategic',
    text: 'Are there any pending legal issues?',
    weight: 3,
    options: [
      { value: 0, label: 'Yes, active lawsuits.' },
      { value: 5, label: 'Past issues, resolved.' },
      { value: 10, label: 'Clean legal history.' }
    ]
  },
  {
    id: 's4',
    category: 'Strategic',
    text: 'Is the corporate structure clean and transferrable?',
    weight: 1,
    options: [
      { value: 3, label: 'Complex, needs restructuring.' },
      { value: 10, label: 'Clean entity structure.' }
    ]
  },
  {
    id: 's5',
    category: 'Strategic',
    text: 'Have you had a professional valuation recently?',
    weight: 1,
    options: [
      { value: 0, label: 'No.' },
      { value: 10, label: 'Yes, within last 12 months.' }
    ]
  },
];
