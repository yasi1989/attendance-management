const MAX_MB = 5;

export const VALIDATION_LIMITS = {
  MIN_LENGTH: 1,
  DESCRIPTION_MAX_LENGTH: 100,
  COMMENT_MAX_LENGTH: 500,
  MAX_MB,
  MAX_FILE_SIZE: MAX_MB * 1024 * 1024,
  ACCEPTED_FILE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  DOMAIN_REGEX: /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.([a-zA-Z]{2,})+$/,
};
