import { ExpenseType } from '../type/expenseType';
import { RouteInfoType } from '../type/expenseType';

export const expenseData: ExpenseType[] = [
  {
    id: 'a3b8f042-3c6e-4e7b-9f8a-1b2c3d4e5f6g',
    user_id: 'user001',
    request_date: new Date('2025-05-01T00:00:00.000Z'),
    expenseType: 'Transport',
    amount: 12000,
    description: '東京から大阪への新幹線チケット',
    status_id: 'Rejected',
    receipt_url: 'https://example.com/receipts/001.pdf',
  },
  {
    id: 'b9c7e153-4d7f-5f8c-ag9b-2c3d4e5f6g7h',
    user_id: 'user002',
    request_date: new Date('2025-05-02T00:00:00.000Z'),
    expenseType: 'General',
    amount: 2500,
    description: 'クライアントとの寿司レストランでの夕食',
    status_id: 'Pending',
    receipt_url: 'https://example.com/receipts/002.pdf',
  },
  {
    id: 'f4g5i597-8hbf-9jcg-ekdf-6g7h8i9j0k1l',
    user_id: 'user001',
    request_date: new Date('2025-05-03T00:00:00.000Z'),
    expenseType: 'Transport',
    amount: 3000,
    description: 'クライアント会議へのタクシー代',
    status_id: 'Pending',
    receipt_url: 'https://example.com/receipts/006.pdf',
  },
  {
    id: 'i7j8l820-1kei-2mfj-hngi-9j0k1l2m3n4o',
    user_id: 'user003',
    request_date: new Date('2025-05-04T00:00:00.000Z'),
    expenseType: 'Transport',
    amount: 8000,
    description: '地域オフィスへのフライト',
    status_id: 'Approved',
    receipt_url: 'https://example.com/receipts/009.pdf',
  },
  {
    id: 'h6i7k719-0jdh-1lei-gmfh-8i9j0k1l2m3n',
    user_id: 'user002',
    request_date: new Date('2025-05-05T00:00:00.000Z'),
    expenseType: 'General',
    amount: 1800,
    description: 'チームのランチミーティング',
    status_id: 'Pending',
    receipt_url: 'https://example.com/receipts/008.pdf',
  },
];

export const routeInfoData: RouteInfoType[] = [
  {
    id: 'r1a2b3c4-5d6e-7f8g-9h0i-1j2k3l4m5n6o',
    expense_request_id: 'a3b8f042-3c6e-4e7b-9f8a-1b2c3d4e5f6g',
    route_details: [
      {
        from: '東京',
        to: '大阪',
        fare: 12000,
      },
      {
        from: '大阪',
        to: '名古屋',
        fare: 3000,
      },
    ],
  },
  {
    id: 'r2b3c4d5-6e7f-8g9h-0i1j-2k3l4m5n6o7p',
    expense_request_id: 'f4g5i597-8hbf-9jcg-ekdf-6g7h8i9j0k1l',
    route_details: [
      {
        from: '品川',
        to: '大手町',
        fare: 3000,
      },
    ],
  },
  {
    id: 'r3c4d5e6-7f8g-9h0i-1j2k-3l4m5n6o7p8q',
    expense_request_id: 'i7j8l820-1kei-2mfj-hngi-9j0k1l2m3n4o',
    route_details: [
      {
        from: '東京',
        to: '名古屋',
        fare: 8000,
      },
    ],
  },
];
