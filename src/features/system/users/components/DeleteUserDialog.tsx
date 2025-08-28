import { DeleteButton } from '@/components/actionButton/DeleteButton';
import { useDeleteUser } from '../hooks/useUsers';

type DeleteUserDialogProps = {
  id: string;
};

const UserDeleteDialog = ({ id }: DeleteUserDialogProps) => {
  const { onDelete, isSubmitted } = useDeleteUser(id);
  return <DeleteButton onDelete={onDelete} isLoading={isSubmitted} />;
};

export default UserDeleteDialog;
