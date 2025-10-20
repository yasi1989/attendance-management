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
import { Loader2, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

type ConfirmDialogProps = {
  children?: React.ReactNode;
  title: string;
  description: string;
  cancelLabel?: string;
  actionLabel?: string;
  onAction?: () => Promise<void>;
  isLoading?: boolean;
};

const ConfirmDialog = ({
  title,
  description,
  cancelLabel = 'キャンセル',
  actionLabel = '続行',
  children = (
    <Button variant="ghost" size="icon" className="w-8 h-8 content-delete-button">
      <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
    </Button>
  ),
  onAction,
  isLoading = false,
}: ConfirmDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
        <AlertDialogHeader className="space-y-3">
          <AlertDialogTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3 pt-4 border-slate-200/30 dark:border-slate-700/30">
          <AlertDialogCancel className="bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 dark:from-slate-800 dark:to-slate-700 dark:hover:from-slate-700 dark:hover:to-slate-600 text-slate-600 dark:text-slate-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm transition-all duration-200 font-medium">
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onAction}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm transition-all duration-200 font-medium"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                処理中...
              </>
            ) : (
              actionLabel
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
