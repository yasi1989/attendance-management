import { useTransition } from 'react';
import { toast } from 'sonner';
import { ERROR_MESSAGE } from '@/consts/validate';
import { submitMonthlyAttendanceAction } from '../api/action';

type UseMonthlySubmitProps = {
  year: number;
  month: number;
  onSuccess?: () => void;
};

export const useMonthlySubmit = ({ year, month, onSuccess }: UseMonthlySubmitProps) => {
  const [isPending, startTransition] = useTransition();

  const onSubmit = (comment?: string) => {
    startTransition(async () => {
      try {
        const { success, error } = await submitMonthlyAttendanceAction({ year, month, comment });

        if (!success) {
          toast.error(`${ERROR_MESSAGE.APPLICATION_ERROR}: ${error}`);
          return;
        }

        toast.success('月次勤怠を申請しました。');
        onSuccess?.();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`${ERROR_MESSAGE.UNEXPECTED_ERROR}: ${error.message}`);
        } else {
          toast.error(ERROR_MESSAGE.SYSTEM_ERROR);
        }
      }
    });
  };

  return { onSubmit, isPending };
};
