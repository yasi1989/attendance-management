'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import SeparatorInMessage from '@/components/SeparatorInMessage';

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState<string>('signin');
  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-bold">Yasm</CardTitle>
        <CardDescription className="text-center">勤怠管理アプリケーション</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="signin" className="cursor-pointer">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="cursor-pointer">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <SignInForm />
          </TabsContent>
          <TabsContent value="signup">
            <SignUpForm />
          </TabsContent>
        </Tabs>
        <SeparatorInMessage message="別の方法でログイン" />
        <div className="flex flex-col gap-2">
          <Button variant="outline" type="button" className="cursor-pointer">
            <FontAwesomeIcon icon={faGithub} className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button variant="outline" type="button" className="cursor-pointer">
            <FontAwesomeIcon icon={faGoogle} className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
