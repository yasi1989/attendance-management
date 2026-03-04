import { DeleteButton } from '@/components/actionButton/DeleteButton';
import { useDeleteDepartment } from '../hooks/useDepartments';

type DeleteDepartmentDialogProps = {
  id: string;
};

const DeleteDepartmentDialog = ({ id }: DeleteDepartmentDialogProps) => {
  const { onDelete, isSubmitted } = useDeleteDepartment(id);
  return <DeleteButton onDelete={onDelete} isLoading={isSubmitted} />;
};

export default DeleteDepartmentDialog;
