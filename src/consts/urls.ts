export const URLS = {
  ROOT: '/',
  LOGIN: '/login',
  ATTENDANCE_CALENDAR: '/attendance/calendar',
  EXPENSE: '/expense',
  APPROVAL: '/approval',
  ADMIN_EMPLOYEES: '/admin/employees',
  ADMIN_DEPARTMENTS: '/admin/departments',
  ADMIN_HOLIDAYS: '/admin/holidays',
  SYSTEM_USERS: '/system/users',
  SYSTEM_COMPANIES: '/system/companies',
  API_AUTH: '/api/auth',
};

export const URL_PARAMS = {
  expense: {
    YEAR: 'year',
    MONTH: 'month',
    STATUS: 'status',
    EXPENSE_TYPE: 'expense',
  },
  calendar: {
    YEAR: 'year',
    MONTH: 'month',
  },
  approval: {
    YEAR: 'year',
    MONTH: 'month',
    STATUS: 'status',
  },
  adminHolidays: {
    YEAR: 'year',
  },
};
