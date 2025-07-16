import { CheckCircle, Clock, Settings, Users } from 'lucide-react';

export const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: '勤怠・経費',
      url: '#',
      icon: Clock,
      items: [
        {
          title: '勤怠入力',
          url: '/attendance/calendar',
        },
        {
          title: '経費申請',
          url: '/expense',
        },
      ],
    },
    {
      title: '承認業務',
      url: '#',
      icon: CheckCircle,
      items: [
        {
          title: '承認管理',
          url: '/approval',
        },
      ],
    },
    {
      title: '組織管理',
      url: '#',
      icon: Users,
      items: [
        {
          title: '従業員管理',
          url: '/admin/employees',
        },
        {
          title: '部署・役職',
          url: '/admin/departments',
        },
        {
          title: '休日設定',
          url: '/admin/holidays',
        },
      ],
    },
    {
      title: 'システム管理',
      url: '#',
      icon: Settings,
      items: [
        {
          title: 'ユーザー管理',
          url: '/system/users',
        },
        {
          title: 'テナント管理',
          url: '/system/companies',
        },
      ],
    },
  ],
};
