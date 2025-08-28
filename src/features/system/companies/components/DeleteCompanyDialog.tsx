import { DeleteButton } from '@/components/actionButton/DeleteButton';
import { useDeleteCompany } from '../hooks/useCompany';

type DeleteCompanyDialogProps = {
  id: string;
};

const DeleteCompanyDialog = ({ id }: DeleteCompanyDialogProps) => {
  const { onDelete, isSubmitted } = useDeleteCompany(id);
  return <DeleteButton onDelete={onDelete} isLoading={isSubmitted} />;
};

export default DeleteCompanyDialog;
