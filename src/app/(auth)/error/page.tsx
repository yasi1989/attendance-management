import { Suspense } from 'react';
import { AuthErrorContent } from '@/features/auth/error/components/AuthErrorContent';
import { AuthErrorFallback } from '@/features/auth/error/components/AuthErrorFallback';

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<AuthErrorFallback />}>
      <AuthErrorContent />
    </Suspense>
  );
}
