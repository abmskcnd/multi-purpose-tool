'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useAnalytics } from '@/hooks/useAnalytics';

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export function PasswordGenerator() {
  const t = useTranslations('tools.password_generator');
  const { trackToolUse, trackToolComplete } = useAnalytics();
  
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const generatePassword = useCallback(() => {
    const startTime = Date.now();
    let charset = '';
    
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (charset === '') {
      charset = 'abcdefghijklmnopqrstuvwxyz'; // Default fallback
    }
    
    let result = '';
    const array = new Uint32Array(options.length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < options.length; i++) {
      result += charset[array[i] % charset.length];
    }
    
    setPassword(result);
    setCopied(false);
    
    trackToolUse('password-generator', 'generate');
    trackToolComplete('password-generator', Date.now() - startTime);
  }, [options, trackToolUse, trackToolComplete]);

  const copyToClipboard = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      trackToolUse('password-generator', 'copy');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Generated Password Display */}
      <div className="flex gap-2">
        <input
          type="text"
          value={password}
          readOnly
          placeholder="Click generate to create password"
          className="flex-1 rounded-lg border bg-background px-4 py-3 font-mono text-lg"
        />
        <button
          onClick={copyToClipboard}
          disabled={!password}
          className="rounded-lg border bg-secondary px-4 py-3 text-secondary-foreground transition-colors hover:bg-secondary/80 disabled:opacity-50"
        >
          {copied ? t('copied') : t('copy')}
        </button>
      </div>

      {/* Generate Button */}
      <button
        onClick={generatePassword}
        className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {t('generate')}
      </button>

      {/* Options */}
      <div className="space-y-4 rounded-lg border p-4">
        {/* Length Slider */}
        <div>
          <label className="mb-2 flex items-center justify-between text-sm font-medium">
            <span>{t('length')}</span>
            <span className="font-mono">{options.length}</span>
          </label>
          <input
            type="range"
            min="8"
            max="64"
            value={options.length}
            onChange={(e) => setOptions({ ...options, length: Number(e.target.value) })}
            className="w-full accent-primary"
          />
        </div>

        {/* Character Options */}
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.uppercase}
              onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
              className="h-4 w-4 rounded accent-primary"
            />
            <span className="text-sm">{t('include_uppercase')}</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.lowercase}
              onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
              className="h-4 w-4 rounded accent-primary"
            />
            <span className="text-sm">{t('include_lowercase')}</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.numbers}
              onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
              className="h-4 w-4 rounded accent-primary"
            />
            <span className="text-sm">{t('include_numbers')}</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.symbols}
              onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
              className="h-4 w-4 rounded accent-primary"
            />
            <span className="text-sm">{t('include_symbols')}</span>
          </label>
        </div>
      </div>
    </div>
  );
}
