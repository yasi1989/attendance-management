import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormControl,
} from "@/components/ui/form";
import { useSignInForm } from "../hooks/useLoginForm";
import { Button } from "@/components/ui/button";
import InputFormField from "@/lib/InputFormField";

const SignInForm = () => {
	const { form, onSubmit, isPending } = useSignInForm();
	return (
		<Form {...form}>
			<form
				className="space-y-4"
				onSubmit={form.handleSubmit(onSubmit)}
				noValidate
			>
				<InputFormField
					form={form}
					name="email"
					label="Email"
					placeholder="sample@example.com"
					maxLength={100}
				/>
				<InputFormField
					form={form}
					name="password"
					label="Password"
					placeholder="********"
					type="password"
					maxLength={10}
				/>
				<Button type="submit" className="w-full" disabled={isPending}>
					Sign In
				</Button>
			</form>
		</Form>
	);
};

export default SignInForm;
