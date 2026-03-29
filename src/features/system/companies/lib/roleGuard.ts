import { ROLE } from '@/consts/role';
import { requireRole } from '@/features/auth/lib/authGuard';

export const requireTenantManagement = () => requireRole([ROLE.SYSTEM_ADMIN]);
