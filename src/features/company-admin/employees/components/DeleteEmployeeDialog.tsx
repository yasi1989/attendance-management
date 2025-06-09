import ActionDialog from '@/components/ActionDialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const DeleteEmployeeDialog = () => {
  return (
    <ActionDialog
      title="本当に削除しますか？"
      description="この動作は元に戻せません。選択した社員を削除しますか？"
      cancelLabel="キャンセル"
      actionLabel="続行"
      onAction={async () => {}}
    >
      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-red-50 hover:bg-red-100 transition-colors">
        <Trash2 className="h-4 w-4 text-red-600" />
      </Button>
    </ActionDialog>
  );
};

export default DeleteEmployeeDialog;
