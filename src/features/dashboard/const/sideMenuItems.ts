import { CheckCircle, Clock, CreditCard, Settings, Users } from 'lucide-react';
import { ROLE } from '@/consts/role';
import { URLS } from '@/consts/urls';
import { SidebarData } from '../types/type';

export const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: '勤怠',
      url: '#',
      icon: Clock,
      items: [
        {
          title: '勤怠入力',
          url: URLS.ATTENDANCE_CALENDAR,
        },
      ],
      roles: [ROLE.COMPANY_ADMIN, ROLE.DEPARTMENT_ADMIN, ROLE.GENERAL_USER, ROLE.PERSONAL_USER, ROLE.SYSTEM_ADMIN],
    },
    {
      title: '経費',
      url: '#',
      icon: CreditCard,
      items: [
        {
          title: '経費申請',
          url: URLS.EXPENSE,
        },
      ],
      roles: [ROLE.COMPANY_ADMIN, ROLE.DEPARTMENT_ADMIN, ROLE.GENERAL_USER],
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
      roles: [ROLE.COMPANY_ADMIN, ROLE.DEPARTMENT_ADMIN],
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
      roles: [ROLE.COMPANY_ADMIN, ROLE.DEPARTMENT_ADMIN],
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
      roles: [ROLE.SYSTEM_ADMIN],
    },
  ],
} as SidebarData;
