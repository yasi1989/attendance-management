import LoginForm from "@/features/auth/components/LoginForm";

export default function Home() {
	return (
		<main className="flex min-h-svh flex-col items-center justify-center p-4 bg-background">
			<div className="max-w-md w-full">
				<LoginForm />
			</div>
		</main>
	);
}
