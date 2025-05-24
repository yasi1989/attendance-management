import { atom } from 'jotai';
import { UserType } from '../type/userType';
import { CompanyType } from '../../company/type/companyType';
import { DepartmentType } from '../type/departmentType';
import { RoleType } from '../type/roleType';

export interface UserProfile {
  user: UserType;
  role: RoleType;
  department: DepartmentType | null;
  company: CompanyType | null;
}

export const userAtom = atom<UserType | null>(null);
export const companyAtom = atom<CompanyType | null>(null);
export const departmentAtom = atom<DepartmentType | null>(null);
export const roleAtom = atom<RoleType | null>(null);

export const userProfileAtom = atom<UserProfile | null>((get) => {
  const user = get(userAtom);
  const role = get(roleAtom);
  const department = get(departmentAtom);
  const company = get(companyAtom);

  if (!user || !role) {
    return null;
  }

  return {
    user,
    role,
    department,
    company,
  };
});
