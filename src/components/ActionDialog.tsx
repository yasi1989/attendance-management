import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';

type AlertDialogProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  cancelLabel?: string;
  actionLabel?: string;
  onAction?: () => Promise<void>;
  isLoading?: boolean;
};

const ActionDialog = ({
  title,
  description,
  cancelLabel = 'キャンセル',
  actionLabel = '続行',
  children,
  onAction,
  isLoading = false,
}: AlertDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ActionDialog;
