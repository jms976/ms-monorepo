'use client';

import ErrorFallback from './ErrorFallback';
import { FallbackProps } from 'react-error-boundary';

export default function ErrorBoundaryFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = error instanceof Error ? error.message : 'Unknown error';

  return <ErrorFallback message={message} reset={resetErrorBoundary} />;
}
