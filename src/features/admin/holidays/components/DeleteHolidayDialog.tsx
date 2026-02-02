import { DeleteButton } from '@/components/actionButton/DeleteButton';
import { useDeleteHoliday } from '../hooks/useHoliday';

type DeleteHolidayDialogProps = {
  id: string;
};

const DeleteHolidayDialog = ({ id }: DeleteHolidayDialogProps) => {
  const { onDelete, isSubmitted } = useDeleteHoliday(id);
  return <DeleteButton onDelete={onDelete} isLoading={isSubmitted} />;
};

export default DeleteHolidayDialog;
