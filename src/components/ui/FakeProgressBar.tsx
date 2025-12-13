'use client';

import { useEffect, useState } from 'react';

interface FakeProgressBarProps {
  isProcessing: boolean;
  onComplete?: () => void;
  duration?: number; // Duration in milliseconds
}

export function FakeProgressBar({
  isProcessing,
  onComplete,
  duration = 3000,
}: FakeProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isProcessing) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Slow down as we approach 90%
        const increment = prev < 50 ? 5 : prev < 80 ? 2 : 0.5;
        const newProgress = Math.min(prev + increment, 90);
        return newProgress;
      });
    }, duration / 20);

    return () => clearInterval(interval);
  }, [isProcessing, duration]);

  useEffect(() => {
    if (!isProcessing && progress > 0) {
      // Complete the progress bar
      setProgress(100);
      setTimeout(() => {
        onComplete?.();
        setProgress(0);
      }, 300);
    }
  }, [isProcessing, progress, onComplete]);

  if (!isProcessing && progress === 0) return null;

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between text-sm">
        <span>Processing...</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
