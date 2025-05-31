export type RoleType = {
  id: string;
  roleCode: string;
  roleName: string;
  level?: 0 | 1 | 2 | 3 | 4;
  isPersonalRole: boolean;
  isSystemRole: boolean;
  createdAt: Date;
};
