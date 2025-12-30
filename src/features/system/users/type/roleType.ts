export type RoleType = {
  find(arg0: (r: RoleType) => boolean): unknown;
  id: string;
  roleCode: string;
  roleName: string;
  isPersonalRole: boolean;
  isSystemRole: boolean;
  createdAt: Date;
};
