'use client';

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

interface AttendanceConfirmDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const AttendanceConfirmDialog = ({
  title,
  description,
  onConfirm,
  disabled = false,
  children,
}: AttendanceConfirmDialogProps) => (
  <AlertDialog>
    <AlertDialogTrigger asChild disabled={disabled}>
      {children}
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>キャンセル</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>確認</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
