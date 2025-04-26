import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type LoginButtonProps = {
	label: string;
	isPending: boolean;
};

const LoginButton = ({ label, isPending = false }: LoginButtonProps) => {
	return (
		<Button type="submit" className="w-full" disabled={isPending}>
			{isPending ? <Loader2 className="animate-spin" /> : label}
		</Button>
	);
};

export default LoginButton;
