import { Calendar, UserCheck, UsersRound } from 'lucide-react';

export const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'ホーム',
      url: '#',
      icon: Calendar,
      isActive: true,
      items: [
        {
          title: '出退勤申請',
          url: '/calendar',
        },
        {
          title: '経費申請',
          url: '/expense/add',
        },
        {
          title: '経費履歴',
          url: '/expense',
        },
      ],
    },
    {
      title: '承認者',
      url: '#',
      icon: UserCheck,
      items: [
        {
          title: '承認申請',
          url: '#',
        },
        {
          title: '承認履歴',
          url: '#',
        },
      ],
    },
    {
      title: '管理者',
      url: '#',
      icon: UsersRound,
      items: [
        {
          title: 'ユーザ管理',
          url: '#',
        },
      ],
    },
  ],
};
