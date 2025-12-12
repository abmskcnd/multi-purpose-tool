'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  ToolCardContainer,
  ToolSection,
  ToolButton,
} from '../../_shared/components';

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeAmbiguous: false,
};

const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  uppercaseUnambiguous: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  lowercaseUnambiguous: 'abcdefghjkmnpqrstuvwxyz',
  numbers: '0123456789',
  numbersUnambiguous: '23456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

function generatePassword(options: PasswordOptions): string {
  let chars = '';

  if (options.uppercase) {
    chars += options.excludeAmbiguous
      ? CHAR_SETS.uppercaseUnambiguous
      : CHAR_SETS.uppercase;
  }
  if (options.lowercase) {
    chars += options.excludeAmbiguous
      ? CHAR_SETS.lowercaseUnambiguous
      : CHAR_SETS.lowercase;
  }
  if (options.numbers) {
    chars += options.excludeAmbiguous
      ? CHAR_SETS.numbersUnambiguous
      : CHAR_SETS.numbers;
  }
  if (options.symbols) {
    chars += CHAR_SETS.symbols;
  }

  if (chars.length === 0) {
    return '';
  }

  const array = new Uint32Array(options.length);
  crypto.getRandomValues(array);

  return Array.from(array, (num) => chars[num % chars.length]).join('');
}

function calculateStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
  if (score <= 4) return { score, label: 'Fair', color: 'bg-yellow-500' };
  if (score <= 6) return { score, label: 'Good', color: 'bg-blue-500' };
  return { score, label: 'Strong', color: 'bg-green-500' };
}

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [copied, setCopied] = useState(false);

  const strength = useMemo(() => calculateStrength(password), [password]);

  const handleGenerate = useCallback(() => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
  }, [options]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }, [password]);

  const updateOption = useCallback(<K extends keyof PasswordOptions>(
    key: K,
    value: PasswordOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div className="space-y-6">
      <ToolCardContainer className="p-6">
        <ToolSection title="Password Options" description="Customize your password settings">
          <div className="space-y-4">
            {/* Length Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-zinc-600 dark:text-zinc-400">
                  Length
                </label>
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {options.length}
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="128"
                value={options.length}
                onChange={(e) => updateOption('length', parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Character Options */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'uppercase', label: 'Uppercase (A-Z)' },
                { key: 'lowercase', label: 'Lowercase (a-z)' },
                { key: 'numbers', label: 'Numbers (0-9)' },
                { key: 'symbols', label: 'Symbols (!@#$...)' },
                { key: 'excludeAmbiguous', label: 'Exclude Ambiguous (0, O, l, 1)' },
              ].map(({ key, label }) => (
                <label
                  key={key}
                  className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={options[key as keyof PasswordOptions] as boolean}
                    onChange={(e) =>
                      updateOption(key as keyof PasswordOptions, e.target.checked)
                    }
                    className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </ToolSection>

        <div className="mt-6">
          <ToolButton onClick={handleGenerate} className="w-full">
            Generate Password
          </ToolButton>
        </div>
      </ToolCardContainer>

      {/* Password Output */}
      {password && (
        <ToolCardContainer className="p-6">
          <ToolSection title="Generated Password">
            <div className="space-y-4">
              {/* Password Display */}
              <div className="relative">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 font-mono text-lg break-all">
                  {password}
                </div>
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Strength Indicator */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Strength</span>
                  <span className={`font-medium ${
                    strength.label === 'Weak' ? 'text-red-500' :
                    strength.label === 'Fair' ? 'text-yellow-500' :
                    strength.label === 'Good' ? 'text-blue-500' :
                    'text-green-500'
                  }`}>
                    {strength.label}
                  </span>
                </div>
                <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strength.color} transition-all duration-300`}
                    style={{ width: `${(strength.score / 7) * 100}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                <span>Length: {password.length}</span>
                <span>•</span>
                <span>Entropy: ~{Math.round(password.length * 4)} bits</span>
              </div>
            </div>
          </ToolSection>
        </ToolCardContainer>
      )}
    </div>
  );
}
