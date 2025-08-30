const MAX_MB = 5;

export const VALIDATIONS = {
  MIN_LENGTH: 1,
  MIN_PASSWORD_LENGTH: 8,
  DESCRIPTION_MAX_LENGTH: 100,
  COMMENT_MAX_LENGTH: 500,
  NAME_MAX_LENGTH: 255,
  EMAIL_MAX_LENGTH: 255,
  PASSWORD_MAX_LENGTH: 128,
  MAX_MB,
  MAX_FILE_SIZE: MAX_MB * 1024 * 1024,
  ACCEPTED_FILE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  DOMAIN_REGEX: /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.([a-zA-Z]{2,})+$/,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
  TIME_REGEX: /^(\d{1,2}):\d{1,2}$/,
};

export const ERROR_MESSAGE = {
  APPLICATION_ERROR: 'エラー',
  UNEXPECTED_ERROR: '予期せぬエラー',
  SYSTEM_ERROR: 'システムエラー',
};

export const VALIDATION_DATE = {
  YEAR: { MIN: 2000, MAX: 2100 },
  MONTH: { MIN: 1, MAX: 12 },
  DAY: { MIN: 1, MAX: 31 },
  HOUR: { MIN: 0, MAX: 23 },
  MINUTE: { MIN: 0, MAX: 59 },
} as const;

export const VALIDATION_DATE_FORMAT = {
  DATES: ['yyyy-MM-dd', 'yyyy/MM/dd', 'yyyy年MM月dd日'],
  TIMES: ['HH:mm', 'H:mm', 'HHmm', 'Hmm', 'h:mm a', 'h:mma'],
  DATE_TIMES: ['yyyy-MM-dd HH:mm', 'yyyy/MM/dd HH:mm', 'yyyy年MM月dd日 HH:mm'],
} as const;
