import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn, RegisterOptions, Path } from "react-hook-form";

type InputFormFieldProps<T extends Record<string, unknown>> = {
	form: UseFormReturn<T>;
	name: Path<T>;
	label: string;
	placeholder?: string;
	type?: string;
	required?: boolean;
	className?: string;
	maxLength?: number;
	rules?: RegisterOptions<T, Path<T>>;
};
const InputFormField = <T extends Record<string, unknown>>({
	form,
	name,
	label,
	placeholder = "",
	type = "text",
	className = "",
	rules,
	maxLength,
}: InputFormFieldProps<T>) => {
	return (
		<FormField
			control={form.control}
			name={name}
			rules={rules}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							type={type}
							placeholder={placeholder}
							value={field.value as string}
							onChange={field.onChange}
							onBlur={field.onBlur}
							className={className}
							maxLength={maxLength}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default InputFormField;
