'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, Clock, Shield } from 'lucide-react';
import { getErrorInfo } from '../lib/getErrorInfo';
import { AuthErrorType } from '../type/errorTypes';
import { URL_PARAMS, URLS } from '@/consts/urls';

export const AuthErrorContent = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') as AuthErrorType | null;
  const existingProvider = searchParams.get(URL_PARAMS.auth.EXISTING_PROVIDER);
  const errorInfo = getErrorInfo({ error, existingProvider });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-red-400 to-orange-500 rounded-full mix-blend-multiply blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mix-blend-multiply blur-xl opacity-20 animate-bounce" />

        <Card className="relative backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 shadow-2xl border-0 ring-1 ring-slate-200/50 dark:ring-slate-700/50">
          <CardHeader className="space-y-6 pb-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  {errorInfo.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  {errorInfo.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Button
              asChild
              className="w-full h-12 bg-liner-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200"
            >
              <Link href={URLS.LOGIN} className="flex items-center justify-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>ログインページに戻る</span>
              </Link>
            </Button>

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
