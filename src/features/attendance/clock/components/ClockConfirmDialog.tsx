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

interface ClockConfirmDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const ClockConfirmDialog = ({
  title,
  description,
  onConfirm,
  disabled = false,
  children,
}: ClockConfirmDialogProps) => (
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
