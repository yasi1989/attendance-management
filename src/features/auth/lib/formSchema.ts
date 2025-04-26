import { z } from "zod";

const BaseLoginSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address",
	}),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters long",
	}),
});

export const SignInSchema = BaseLoginSchema;
export const SignUpSchema = BaseLoginSchema.extend({
	name: z.string().min(3, {
		message: "Name must be at least 3 characters long",
	}),
});
