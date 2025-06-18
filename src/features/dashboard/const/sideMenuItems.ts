import { CheckCircle, Clock, Settings, Shield } from 'lucide-react';

export const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: '申請・届出',
      url: '#',
      icon: Clock,
      isActive: true,
      items: [
        {
          title: '勤怠カレンダー',
          url: '/calendar',
        },
        {
          title: '経費申請',
          url: '/expense/add',
        },
        {
          title: '経費申請履歴',
          url: '/expense/history',
        },
      ],
    },
    {
      title: '承認業務',
      url: '#',
      icon: CheckCircle,
      items: [
        {
          title: '承認待ち一覧',
          url: '/approval/pending',
        },
        {
          title: '承認履歴',
          url: '/approval/history',
        },
      ],
    },
    {
      title: '会社管理',
      url: '#',
      icon: Shield,
      items: [
        {
          title: '社員管理',
          url: '/company-admin/employees',
        },
        {
          title: '部署・役職管理',
          url: '/company-admin/organization',
        },
        {
          title: '休日カレンダー',
          url: '/company-admin/holiday',
        },
      ],
    },
    {
      title: 'システム管理',
      url: '#',
      icon: Settings,
      items: [
        {
          title: 'ユーザ管理',
          url: '/system-admin/users',
        },
        {
          title: '会社管理',
          url: '/system-admin/company',
        },
      ],
    },
  ],
};
