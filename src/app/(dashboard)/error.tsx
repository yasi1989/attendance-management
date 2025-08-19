'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error('勤怠データの取得エラー:', error);
  }, [error]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
        <h2 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">データの読み込みに失敗しました</h2>
        <p className="text-red-700 dark:text-red-300 mb-4">しばらく時間をおいてから再度お試しください</p>
        <div className="space-x-3">
          <Button onClick={reset} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium">
            再試行
          </Button>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            ページ再読み込み
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
