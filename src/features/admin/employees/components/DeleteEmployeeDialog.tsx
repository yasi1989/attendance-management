import { DeleteButton } from '@/components/actionButton/DeleteButton';
import { useDeleteEmployee } from '../hooks/useEmployees';

type DeleteEmployeeDialogProps = {
  id: string;
};

const DeleteEmployeeDialog = ({ id }: DeleteEmployeeDialogProps) => {
  const { onDelete, isSubmitted } = useDeleteEmployee(id);
  const description = (
    <>
      <p className="font-semibold block">この操作は取り消すことができません。</p>
      <div className="block rounded-md bg-destructive/10 p-3 text-sm">
        <p className="font-semibold mb-2 block">以下のデータが完全に削除されます：</p>
        <ul className="list-disc list-inside space-y-1">
          <li>すべての勤怠記録</li>
          <li>すべての経費申請</li>
          <li>その他関連する全データ</li>
        </ul>
      </div>
    </>
  );
  return <DeleteButton onDelete={onDelete} isLoading={isSubmitted} description={description} />;
};

export default DeleteEmployeeDialog;
