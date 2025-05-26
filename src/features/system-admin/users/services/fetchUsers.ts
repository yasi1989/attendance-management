import { roles, users } from '../const/mockData';
import { companies } from '../../company/const/mockData';

export const fetchUsersData = () => {
  // 本番はusers以外を状態管理ライブラリに管理させる
  return {
    users,
    companies,
    roles,
  };
};
