import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type AuthButtonProps = {
  label: string;
  isSubmitted: boolean;
};

const AuthButton = ({ label, isSubmitted = false }: AuthButtonProps) => {
  return (
    <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitted} >
      {isSubmitted ? <Loader2 className="animate-spin" /> : label}
    </Button>
  );
};

export default AuthButton;
