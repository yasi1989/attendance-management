"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const LoginForm = () => {
	const [activeTab, setActiveTab] = useState<string>("signin");
	return (
		<Card className="w-full shadow-lg border-0">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl text-center font-bold">YASM 勤怠管理</CardTitle>
				<CardDescription className="text-center">sign in to access your account</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab}>
					<TabsList className="grid grid-cols-2 w-full">
						<TabsTrigger value="signin">Sign In</TabsTrigger>
						<TabsTrigger value="signup">Sign Up</TabsTrigger>
					</TabsList>
					<TabsContent value="signin">
						<SignInForm />
					</TabsContent>
					<TabsContent value="signup">
						<SignUpForm />
					</TabsContent>
				</Tabs>
				<Separator className="my-4" />
				<div className="flex flex-col gap-2">
					<Button variant="outline" type="button">
						<FontAwesomeIcon icon={faGithub} className="mr-2 h-4 w-4" />
						GitHub
					</Button>
					<Button variant="outline" type="button">
						<FontAwesomeIcon icon={faGoogle} className="mr-2 h-4 w-4" />
						Google
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default LoginForm;
