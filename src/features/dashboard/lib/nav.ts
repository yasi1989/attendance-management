import { ROLE } from '@/consts/role';
import { NavGroup } from '../types/type';

export const filterNavByRole = (items: NavGroup[], userRole: (typeof ROLE)[keyof typeof ROLE]): NavGroup[] =>
  items.filter((item) => !item.roles || item.roles.includes(userRole));
