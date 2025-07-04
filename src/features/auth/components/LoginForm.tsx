'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Clock, Shield, Users } from 'lucide-react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import SeparatorInMessage from '@/components/SeparatorInMessage';

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState<string>('signin');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply blur-xl opacity-20 animate-bounce" />

        <Card className="relative backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 shadow-2xl border-0 ring-1 ring-slate-200/50 dark:ring-slate-700/50">
          <CardHeader className="space-y-6 pb-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Yasm
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">
                  勤怠管理システム
                </CardDescription>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center space-y-1">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">時間管理</p>
              </div>
              <div className="text-center space-y-1">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mx-auto">
                  <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">セキュア</p>
              </div>
              <div className="text-center space-y-1">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto">
                  <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">チーム</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full mb-6 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <TabsTrigger
                  value="signin"
                  className="cursor-pointer rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700 transition-all duration-200"
                >
                  ログイン
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="cursor-pointer rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700 transition-all duration-200"
                >
                  新規登録
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4">
                <SignInForm />
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <SignUpForm />
              </TabsContent>
            </Tabs>

            <SeparatorInMessage message="またはソーシャルログイン" />

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer h-11 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-[1.02]"
              >
                <FontAwesomeIcon icon={faGithub} className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer h-11 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-[1.02]"
              >
                <FontAwesomeIcon icon={faGoogle} className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>SSL暗号化</span>
                </div>
                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>24/7 サポート</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
