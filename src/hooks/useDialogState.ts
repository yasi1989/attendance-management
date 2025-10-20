import { useCallback, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

type UseDialogStateOptions<T extends Record<string, unknown>> = {
  form?: UseFormReturn<T>;
  preventOutsideClick?: boolean;
  onClose?: () => void;
  onCloseButtonClick?: () => void;
};

export const useDialogState = <T extends Record<string, unknown>>(options: UseDialogStateOptions<T> = {}) => {
  const { form, preventOutsideClick = false, onClose, onCloseButtonClick } = options;

  const [open, setOpen] = useState(false);

  const handleCloseButtonClick = useCallback(() => {
    form?.reset();
    onCloseButtonClick?.();
    setOpen(false);
    onClose?.();
  }, [form, onCloseButtonClick, onClose]);

  const handleOutsideClick = useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [onClose]);

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (newOpen) {
        setOpen(newOpen);
        return;
      }

      if (preventOutsideClick && !newOpen) {
        return;
      }

      handleOutsideClick();
    },
    [preventOutsideClick, handleOutsideClick],
  );

  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    handleOutsideClick();
  }, [handleOutsideClick]);
  const closeDialogWithReset = useCallback(() => {
    handleCloseButtonClick();
  }, [handleCloseButtonClick]);

  return {
    open,
    openDialog,
    closeDialog,
    closeDialogWithReset,
    handleOpenChange,
    handleCloseButtonClick,
  };
};
