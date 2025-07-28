import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type AuthButtonProps = {
  label: string;
  isPending: boolean;
};

const AuthButton = ({ label, isPending = false }: AuthButtonProps) => {
  return (
    <Button type="submit" className="w-full cursor-pointer" disabled={isPending} >
      {isPending ? <Loader2 className="animate-spin" /> : label}
    </Button>
  );
};

export default AuthButton;
