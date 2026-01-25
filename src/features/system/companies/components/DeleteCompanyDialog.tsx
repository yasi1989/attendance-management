import { DeleteButton } from '@/components/actionButton/DeleteButton';
import { useDeleteCompany } from '../hooks/useCompany';

type DeleteCompanyDialogProps = {
  id: string;
};

const DeleteCompanyDialog = ({ id }: DeleteCompanyDialogProps) => {
  const { onDelete, isSubmitted } = useDeleteCompany(id);
  const _description = (
    <>
      <p className="font-semibold block">この操作は取り消すことができません。</p>
      <div className="block rounded-md bg-destructive/10 p-3 text-sm">
        <p className="font-semibold mb-2 block">以下のデータが完全に削除されます：</p>
        <ul className="list-disc list-inside space-y-1">
          <li>すべての部署情報</li>
          <li>すべてのユーザーアカウント</li>
          <li>すべての勤怠記録</li>
          <li>すべての経費申請</li>
          <li>その他関連する全データ</li>
        </ul>
      </div>
    </>
  );
  return <DeleteButton onDelete={onDelete} isLoading={isSubmitted} description={_description} />;
};

export default DeleteCompanyDialog;
