import { DeleteButton } from '@/components/actionButton/DeleteButton';
import { useDeleteExpense } from '../hooks/useExpenseForm';

type ExpenseDeleteDialogProps = {
  id: string;
};

const ExpenseDeleteDialog = ({ id }: ExpenseDeleteDialogProps) => {
  const { onDelete, isPending } = useDeleteExpense(id);
  const description = (
    <>
      <p className="font-semibold block">この操作は取り消すことができません。</p>
      <div className="block rounded-md bg-destructive/10 p-3 text-sm">
        <p className="font-semibold mb-2 block">以下のデータが完全に削除されます：</p>
        <ul className="list-disc list-inside space-y-1">
          <li>経費明細</li>
          <li>領収書データ</li>
          <li>経路情報</li>
        </ul>
      </div>
    </>
  );

  return <DeleteButton onDelete={onDelete} isLoading={isPending} description={description} />;
};

export default ExpenseDeleteDialog;
