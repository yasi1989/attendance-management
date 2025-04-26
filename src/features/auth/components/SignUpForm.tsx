import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUpForm } from "../hooks/useLoginForm";
import InputFormField from "@/lib/InputFormField";

const SignUpForm = () => {
	const { form, onSubmit, isPending } = useSignUpForm();
	return (
		<Form {...form}>
			<form
				className="space-y-4"
				onSubmit={form.handleSubmit(onSubmit)}
				noValidate
			>
				<InputFormField
					form={form}
					name="name"
					label="Name"
					placeholder="Enter your name"
					maxLength={100}
				/>
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
				<Button
					type="submit"
					className="w-full"
					disabled={isPending}
				>
					Sign Up
				</Button>
			</form>
		</Form>
	);
};

export default SignUpForm;
