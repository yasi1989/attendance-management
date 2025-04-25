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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const SugnUpSchema = z.object({
	name: z.string().min(3, {
		message: "Name must be at least 3 characters",
	}),
	email: z.string().email({
		message: "Please enter a valid email address",
	}),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters",
	}),
});

const SugnUpForm = () => {
	const loginForm = useForm<z.infer<typeof SugnUpSchema>>({
		resolver: zodResolver(SugnUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});
	return (
		<Form {...loginForm}>
			<form className="space-y-4">
				<FormField
					control={loginForm.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Enter your name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={loginForm.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="name@example.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={loginForm.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="********" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					Sign In
				</Button>
			</form>
		</Form>
	);
};

export default SugnUpForm;
