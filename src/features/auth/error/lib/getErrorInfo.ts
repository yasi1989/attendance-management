import { getProviderName } from '@/consts/providers';
import { AuthErrorParams, AuthErrorType, ErrorInfo } from '../type/errorTypes';

export const getErrorInfo = ({ error, existingProvider }: AuthErrorParams): ErrorInfo => {
  if (!error) {
    return {
      title: '認証エラー',
      description: '認証処理中にエラーが発生しました。もう一度お試しください。',
    };
  }

  const errorMap: Record<AuthErrorType, ErrorInfo | ((provider?: string) => ErrorInfo)> = {
    Configuration: {
      title: '設定エラー',
      description: 'サーバーの設定に問題があります。管理者にお問い合わせください。',
    },
    AccessDenied: {
      title: 'アクセス拒否',
      description: 'このアカウントではログインできません。',
    },
    Verification: {
      title: '認証エラー',
      description: '認証トークンの有効期限が切れています。もう一度お試しください。',
    },
    OAuthAccountNotLinked: {
      title: 'アカウント連携エラー',
      description:
        'このメールアドレスは既にメールアドレス/パスワードで登録されています。メールアドレス/パスワードでログインしてください。',
    },
    PasswordAccountExists: {
      title: 'アカウント連携エラー',
      description:
        'このメールアドレスは既にメールアドレス/パスワードで登録されています。メールアドレス/パスワードでログインしてください。',
    },
    OAuthAccountExists: (provider?: string) => {
      const providerName = provider ? getProviderName(provider) : '別の方法';
      return {
        title: 'アカウント連携エラー',
        description: `このメールアドレスは既に${providerName}で登録されています。${providerName}でログインしてください。`,
      };
    },
  };

  const errorInfo = errorMap[error];

  if (typeof errorInfo === 'function') {
    return errorInfo(existingProvider ?? undefined);
  }

  return errorInfo;
};
