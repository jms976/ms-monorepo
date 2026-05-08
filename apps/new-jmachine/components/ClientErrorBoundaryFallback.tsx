'use client';

import { Button } from '@common/ui';
import { FallbackProps } from 'react-error-boundary';

export default function ClientErrorBoundaryFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = error instanceof Error ? error.message : 'Unknown error';

  return (
    <div className="flex gap-2 w-full h-full">
      {message}
      <Button onClick={resetErrorBoundary}>Reset</Button>
    </div>
  );
}
