'use client';

import { useState, useCallback, useRef, ChangeEvent } from 'react';
import { copyToClipboard, downloadAsFile } from '../utils';

interface UseToolOutputOptions {
  filename?: string;
  mimeType?: string;
}

/**
 * Hook for managing tool output with copy/download functionality
 */
export function useToolOutput(options: UseToolOutputOptions = {}) {
  const [output, setOutput] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(output);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    downloadAsFile(
      output,
      options.filename || 'output.txt',
      options.mimeType || 'text/plain'
    );
  }, [output, options.filename, options.mimeType]);

  const clearOutput = useCallback(() => {
    setOutput('');
  }, []);

  return {
    output,
    setOutput,
    copied,
    handleCopy,
    handleDownload,
    clearOutput,
  };
}

/**
 * Hook for file input handling
 */
export function useFileInput(options: { accept?: string; multiple?: boolean } = {}) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
    setError(null);
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);

  const openFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return {
    files,
    error,
    setError,
    inputRef,
    handleFileChange,
    clearFiles,
    openFilePicker,
    inputProps: {
      ref: inputRef,
      type: 'file' as const,
      accept: options.accept,
      multiple: options.multiple,
      onChange: handleFileChange,
      className: 'hidden',
    },
  };
}

/**
 * Hook for loading states
 */
export function useToolLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setProgress(0);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setProgress(100);
  }, []);

  const updateProgress = useCallback((value: number) => {
    setProgress(Math.min(100, Math.max(0, value)));
  }, []);

  return {
    isLoading,
    progress,
    startLoading,
    stopLoading,
    updateProgress,
  };
}

// Re-export utils for convenience
export { copyToClipboard, downloadAsFile } from '../utils';
