import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { UseFormReturn } from 'react-hook-form';

type CalendarDetailFooterProps<T extends Record<string, unknown>> = {
  form: UseFormReturn<T>;
};

const CalendarDetailFooter = <T extends Record<string, unknown>>({ form }: CalendarDetailFooterProps<T>) => {
  return (
    <CardFooter className="flex justify-between bg-muted/10 px-6 py-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          form.reset();
        }}
      >
        リセット
      </Button>
      <Button type="submit" className="min-w-[100px]">
        申請
      </Button>
    </CardFooter>
  );
};

export default CalendarDetailFooter;
