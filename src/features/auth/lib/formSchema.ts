import { VALIDATION_LIMITS } from '@/consts/validate';
import { z } from 'zod';

const BaseLoginSchema = z.object({
  email: z
    .string()
    .email({
      message: '有効なメールアドレスを入力してください。',
    })
    .min(1, {
      message: 'メールアドレスは必須です。',
    })
    .max(VALIDATION_LIMITS.EMAIL_MAX_LENGTH, {
      message: `${VALIDATION_LIMITS.EMAIL_MAX_LENGTH}文字以内で入力してください。`,
    }),
  password: z
    .string()
    .min(VALIDATION_LIMITS.MIN_PASSWORD_LENGTH, {
      message: `${VALIDATION_LIMITS.MIN_PASSWORD_LENGTH}文字以上で入力してください。`,
    })
    .max(VALIDATION_LIMITS.PASSWORD_MAX_LENGTH, {
      message: `${VALIDATION_LIMITS.PASSWORD_MAX_LENGTH}文字以内で入力してください。`,
    })
    .regex(VALIDATION_LIMITS.PASSWORD_REGEX, {
      message: 'パスワードには英小文字、英大文字、数字、特殊文字（!@#$%^&*）を含めてください。',
    }),
});

export const SignInSchema = BaseLoginSchema;
export const SignUpSchema = BaseLoginSchema.extend({
  name: z
    .string()
    .min(VALIDATION_LIMITS.MIN_LENGTH, {
      message: '名前は必須です。',
    })
    .max(VALIDATION_LIMITS.NAME_MAX_LENGTH, {
      message: `${VALIDATION_LIMITS.NAME_MAX_LENGTH}文字以内で入力してください。`,
    }),
});
