import { z } from 'zod';
import { VALIDATIONS } from '@/consts/validate';

export type UpdateAccountValues = z.infer<typeof updateAccountSchema>;
export const updateAccountSchema = z.object({
  name: z.string().min(1, '必須項目です').max(VALIDATIONS.NAME_MAX_LENGTH),
  avatarFile: z
    .custom<FileList>()
    .optional()
    .refine((files) => !files || files.length === 0 || files[0].size <= VALIDATIONS.MAX_FILE_SIZE, {
      message: `ファイルサイズは${VALIDATIONS.MAX_MB}MB以下でなければなりません`,
    })
    .refine((files) => !files || files.length === 0 || VALIDATIONS.ACCEPTED_FILE_TYPES.includes(files[0].type), {
      message: 'ファイル形式はJPEG、PNG、GIF、WEBPのみです',
    }),
});
