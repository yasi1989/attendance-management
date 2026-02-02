import { db } from '@/lib/db/drizzle';
import { roles } from '@/lib/db/schema';
import { RoleType } from '@/types/role';

let cacheInitPromise: Promise<Map<string, RoleType>> | null = null;

async function getRoleCache(): Promise<Map<string, RoleType>> {
  if (!cacheInitPromise) {
    cacheInitPromise = (async () => {
      const allRoles = await db.select().from(roles);
      return new Map(allRoles.map((r) => [r.roleCode, r]));
    })();
  }
  return cacheInitPromise;
}

export async function getRoleIdByCode(roleCode: string): Promise<string> {
  const cache = await getRoleCache();
  const role = cache.get(roleCode);
  if (!role) throw new Error(`Role '${roleCode}' not found`);
  return role.id;
}

export async function getRoleByCode(roleCode: string): Promise<RoleType> {
  const cache = await getRoleCache();
  const role = cache.get(roleCode);
  if (!role) throw new Error(`Role '${roleCode}' not found`);
  return role;
}

export async function getRoleById(roleId: string): Promise<RoleType> {
  const cache = await getRoleCache();
  const role = Array.from(cache.values()).find((r) => r.id === roleId);
  if (!role) throw new Error(`Role with id '${roleId}' not found`);
  return role;
}
