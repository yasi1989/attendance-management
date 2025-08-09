import { URLS } from '@/consts/urls';
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
          url: URLS.ATTENDANCE_CALENDAR,
        },
        {
          title: '経費申請',
          url: URLS.EXPENSE,
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
          url: URLS.APPROVAL,
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
          url: URLS.ADMIN_EMPLOYEES,
        },
        {
          title: '部署・役職',
          url: URLS.ADMIN_DEPARTMENTS,
        },
        {
          title: '休日設定',
          url: URLS.ADMIN_HOLIDAYS,
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
          url: URLS.SYSTEM_USERS,
        },
        {
          title: 'テナント管理',
          url: URLS.SYSTEM_COMPANIES,
        },
      ],
    },
  ],
};
