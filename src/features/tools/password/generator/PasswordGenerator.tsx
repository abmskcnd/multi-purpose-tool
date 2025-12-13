'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { RefreshCw, Copy, Check, Settings2, Shield, Eye, EyeOff } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Label,
  Slider,
  Switch,
  Badge,
  Progress,
  Input,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { useToolTracking } from '@/hooks/useToolTracking';
import { ToolSection, ToolOptionRow } from '../../_shared/components';

// ============================================
// Types
// ============================================
interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
  excludeSimilar: boolean;
  customSymbols: string;
  minNumbers: number;
  minSymbols: number;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  suggestions: string[];
}

interface GeneratedPassword {
  password: string;
  timestamp: number;
}

// ============================================
// Constants
// ============================================
const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeAmbiguous: false,
  excludeSimilar: false,
  customSymbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  minNumbers: 1,
  minSymbols: 1,
};

const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  uppercaseUnambiguous: 'ABCDEFGHJKLMNPQRSTUVWXYZ', // No I, O
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  lowercaseUnambiguous: 'abcdefghjkmnpqrstuvwxyz', // No i, l, o
  numbers: '0123456789',
  numbersUnambiguous: '23456789', // No 0, 1
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  similar: 'il1Lo0O',
};

const MIN_LENGTH = 4;
const MAX_LENGTH = 128;
const HISTORY_MAX = 10;

// ============================================
// Password Generation Logic
// ============================================
function generatePassword(options: PasswordOptions): string {
  let chars = '';
  const requiredChars: string[] = [];

  // Build character set
  if (options.uppercase) {
    const set = options.excludeAmbiguous
      ? CHAR_SETS.uppercaseUnambiguous
      : CHAR_SETS.uppercase;
    chars += set;
    // Add required uppercase
    requiredChars.push(set[Math.floor(Math.random() * set.length)]);
  }

  if (options.lowercase) {
    const set = options.excludeAmbiguous
      ? CHAR_SETS.lowercaseUnambiguous
      : CHAR_SETS.lowercase;
    chars += set;
    // Add required lowercase
    requiredChars.push(set[Math.floor(Math.random() * set.length)]);
  }

  if (options.numbers) {
    const set = options.excludeAmbiguous
      ? CHAR_SETS.numbersUnambiguous
      : CHAR_SETS.numbers;
    chars += set;
    // Add required numbers
    for (let i = 0; i < options.minNumbers; i++) {
      requiredChars.push(set[Math.floor(Math.random() * set.length)]);
    }
  }

  if (options.symbols) {
    const set = options.customSymbols || CHAR_SETS.symbols;
    chars += set;
    // Add required symbols
    for (let i = 0; i < options.minSymbols; i++) {
      requiredChars.push(set[Math.floor(Math.random() * set.length)]);
    }
  }

  // Remove similar characters if requested
  if (options.excludeSimilar) {
    for (const char of CHAR_SETS.similar) {
      chars = chars.replace(new RegExp(char, 'g'), '');
    }
  }

  if (chars.length === 0) {
    return '';
  }

  // Generate remaining characters
  const remainingLength = options.length - requiredChars.length;
  const array = new Uint32Array(Math.max(0, remainingLength));
  crypto.getRandomValues(array);

  const randomChars = Array.from(array, (num) => chars[num % chars.length]);
  const allChars = [...requiredChars, ...randomChars];

  // Shuffle using Fisher-Yates
  for (let i = allChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allChars[i], allChars[j]] = [allChars[j], allChars[i]];
  }

  return allChars.slice(0, options.length).join('');
}

function calculateStrength(password: string): PasswordStrength {
  if (!password) {
    return { score: 0, label: 'empty', color: 'bg-gray-300', suggestions: [] };
  }

  let score = 0;
  const suggestions: string[] = [];

  // Length scoring
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (password.length >= 20) score += 1;

  // Character variety
  if (/[a-z]/.test(password)) score += 1;
  else suggestions.push('Add lowercase letters');

  if (/[A-Z]/.test(password)) score += 1;
  else suggestions.push('Add uppercase letters');

  if (/[0-9]/.test(password)) score += 1;
  else suggestions.push('Add numbers');

  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  else suggestions.push('Add special characters');

  // Penalize patterns
  if (/(.)\1{2,}/.test(password)) {
    score -= 1;
    suggestions.push('Avoid repeated characters');
  }

  if (/^[a-zA-Z]+$/.test(password) && password.length < 12) {
    suggestions.push('Consider adding numbers or symbols');
  }

  // Normalize score
  score = Math.max(0, Math.min(score, 8));

  if (score <= 2) return { score, label: 'weak', color: 'bg-red-500', suggestions };
  if (score <= 4) return { score, label: 'fair', color: 'bg-yellow-500', suggestions };
  if (score <= 6) return { score, label: 'good', color: 'bg-blue-500', suggestions };
  return { score, label: 'strong', color: 'bg-green-500', suggestions };
}

function calculateEntropy(password: string, options: PasswordOptions): number {
  let poolSize = 0;
  if (options.uppercase) poolSize += 26;
  if (options.lowercase) poolSize += 26;
  if (options.numbers) poolSize += 10;
  if (options.symbols) poolSize += options.customSymbols.length;

  if (poolSize === 0) return 0;
  return Math.floor(password.length * Math.log2(poolSize));
}

// ============================================
// Main Component
// ============================================
export default function PasswordGenerator() {
  const t = useTranslations('tools.password_generator');
  const tCommon = useTranslations('common');

  // Tracking
  const { trackGenerate, trackCopy, trackConfigure, trackReset } = useToolTracking({
    toolId: 'generator',
    groupId: 'password',
  });

  // State
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [history, setHistory] = useState<GeneratedPassword[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Computed values
  const strength = useMemo(() => calculateStrength(password), [password]);
  const entropy = useMemo(() => calculateEntropy(password, options), [password, options]);

  // Check if any character set is selected
  const hasCharacterSet =
    options.uppercase || options.lowercase || options.numbers || options.symbols;

  // Generate password
  const handleGenerate = useCallback(() => {
    if (!hasCharacterSet) return;

    setIsGenerating(true);

    // Small delay for visual feedback
    setTimeout(() => {
      const newPassword = generatePassword(options);
      setPassword(newPassword);
      setCopied(false);
      setIsGenerating(false);

      // Add to history
      setHistory((prev) => {
        const updated = [{ password: newPassword, timestamp: Date.now() }, ...prev].slice(
          0,
          HISTORY_MAX
        );
        return updated;
      });

      // Track
      trackGenerate({
        length: options.length,
        uppercase: options.uppercase,
        lowercase: options.lowercase,
        numbers: options.numbers,
        symbols: options.symbols,
        entropy,
        strength: strength.label,
      });
    }, 100);
  }, [options, hasCharacterSet, trackGenerate, entropy, strength.label]);

  // Copy password
  const handleCopy = useCallback(async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackCopy({ length: password.length });
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }, [password, trackCopy]);

  // Reset to defaults
  const handleReset = useCallback(() => {
    setOptions(DEFAULT_OPTIONS);
    setPassword('');
    setCopied(false);
    trackReset();
  }, [trackReset]);

  // Update option with tracking
  const updateOption = useCallback(
    <K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) => {
      setOptions((prev) => ({ ...prev, [key]: value }));
      trackConfigure({ option: key, value });
    },
    [trackConfigure]
  );

  // Generate on mount
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Main Password Display Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5" />
              {t('generated_password')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Password Display */}
            <div className="relative">
              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg font-mono text-lg break-all min-h-[60px]">
                <span className={cn('flex-1', !showPassword && 'blur-sm select-none')}>
                  {password || t('click_generate')}
                </span>
                <div className="flex items-center gap-1 shrink-0">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPassword(!showPassword)}
                        className="h-8 w-8"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {showPassword ? t('hide_password') : t('show_password')}
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopy}
                        disabled={!password}
                        className="h-8 w-8"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{copied ? tCommon('copied') : tCommon('copy')}</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* Strength Meter */}
            {password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('strength')}</span>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        strength.score <= 2
                          ? 'destructive'
                          : strength.score <= 4
                            ? 'warning'
                            : strength.score <= 6
                              ? 'secondary'
                              : 'success'
                      }
                    >
                      {t(`strength_${strength.label}`)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{entropy} {t('entropy')}</span>
                  </div>
                </div>
                <Progress
                  value={(strength.score / 8) * 100}
                  className="h-2"
                  indicatorClassName={strength.color}
                />
                {strength.suggestions.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {t('tip')}: {strength.suggestions[0]}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleGenerate}
                disabled={!hasCharacterSet || isGenerating}
                loading={isGenerating}
                size="lg"
                className="flex-1 sm:flex-none min-w-[160px]"
              >
                {!isGenerating && <RefreshCw className="mr-2 h-4 w-4" />}
                {t('generate')}
              </Button>
              <Button
                variant="outline"
                onClick={handleCopy}
                disabled={!password}
                size="lg"
                className="flex-1 sm:flex-none"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    {tCommon('copied')}
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    {tCommon('copy')}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Options Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings2 className="h-5 w-5" />
              {t('options')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Length Slider */}
            <ToolSection title={t('length')} description={`${options.length} ${t('characters')}`}>
              <div className="pt-2">
                <Slider
                  value={[options.length]}
                  onValueChange={([value]) => updateOption('length', value)}
                  min={MIN_LENGTH}
                  max={MAX_LENGTH}
                  step={1}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{MIN_LENGTH}</span>
                  <span>{MAX_LENGTH}</span>
                </div>
              </div>
            </ToolSection>

            {/* Character Types */}
            <ToolSection title={t('character_types')}>
              <div className="grid gap-3 sm:grid-cols-2">
                <ToolOptionRow>
                  <Label htmlFor="uppercase" className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      id="uppercase"
                      checked={options.uppercase}
                      onCheckedChange={(checked) => updateOption('uppercase', checked === true)}
                    />
                    <span>{t('uppercase')}</span>
                  </Label>
                </ToolOptionRow>

                <ToolOptionRow>
                  <Label htmlFor="lowercase" className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      id="lowercase"
                      checked={options.lowercase}
                      onCheckedChange={(checked) => updateOption('lowercase', checked === true)}
                    />
                    <span>{t('lowercase')}</span>
                  </Label>
                </ToolOptionRow>

                <ToolOptionRow>
                  <Label htmlFor="numbers" className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      id="numbers"
                      checked={options.numbers}
                      onCheckedChange={(checked) => updateOption('numbers', checked === true)}
                    />
                    <span>{t('numbers')}</span>
                  </Label>
                </ToolOptionRow>

                <ToolOptionRow>
                  <Label htmlFor="symbols" className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      id="symbols"
                      checked={options.symbols}
                      onCheckedChange={(checked) => updateOption('symbols', checked === true)}
                    />
                    <span>{t('symbols')}</span>
                  </Label>
                </ToolOptionRow>
              </div>

              {!hasCharacterSet && (
                <p className="text-sm text-destructive mt-2">{t('select_at_least_one')}</p>
              )}
            </ToolSection>

            {/* Advanced Options Toggle */}
            <div className="border-t pt-4">
              <ToolOptionRow>
                <Label htmlFor="advanced" className="cursor-pointer">
                  {t('advanced_options')}
                </Label>
                <Switch id="advanced" checked={showAdvanced} onCheckedChange={setShowAdvanced} />
              </ToolOptionRow>
            </div>

            {/* Advanced Options */}
            {showAdvanced && (
              <div className="space-y-4 pl-4 border-l-2 border-muted">
                <ToolOptionRow>
                  <div>
                    <Label htmlFor="excludeAmbiguous">{t('exclude_ambiguous')}</Label>
                    <p className="text-xs text-muted-foreground">{t('exclude_ambiguous_desc')}</p>
                  </div>
                  <Switch
                    id="excludeAmbiguous"
                    checked={options.excludeAmbiguous}
                    onCheckedChange={(checked) => updateOption('excludeAmbiguous', checked)}
                  />
                </ToolOptionRow>

                <ToolOptionRow>
                  <div>
                    <Label htmlFor="excludeSimilar">{t('exclude_similar')}</Label>
                    <p className="text-xs text-muted-foreground">{t('exclude_similar_desc')}</p>
                  </div>
                  <Switch
                    id="excludeSimilar"
                    checked={options.excludeSimilar}
                    onCheckedChange={(checked) => updateOption('excludeSimilar', checked)}
                  />
                </ToolOptionRow>

                {options.symbols && (
                  <div className="space-y-2">
                    <Label htmlFor="customSymbols">{t('custom_symbols')}</Label>
                    <Input
                      id="customSymbols"
                      value={options.customSymbols}
                      onChange={(e) => updateOption('customSymbols', e.target.value)}
                      placeholder="!@#$%^&*()"
                      className="font-mono"
                    />
                  </div>
                )}

                {options.numbers && (
                  <div className="space-y-2">
                    <Label>
                      {t('min_numbers')}: {options.minNumbers}
                    </Label>
                    <Slider
                      value={[options.minNumbers]}
                      onValueChange={([value]) => updateOption('minNumbers', value)}
                      min={0}
                      max={Math.min(5, options.length - 2)}
                      step={1}
                    />
                  </div>
                )}

                {options.symbols && (
                  <div className="space-y-2">
                    <Label>
                      {t('min_symbols')}: {options.minSymbols}
                    </Label>
                    <Slider
                      value={[options.minSymbols]}
                      onValueChange={([value]) => updateOption('minSymbols', value)}
                      min={0}
                      max={Math.min(5, options.length - 2)}
                      step={1}
                    />
                  </div>
                )}

                <Button variant="outline" size="sm" onClick={handleReset}>
                  {t('reset_defaults')}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Password History */}
        {history.length > 1 && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">{t('recent_passwords')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {history.slice(1).map((item, index) => (
                  <div
                    key={item.timestamp}
                    className="flex items-center justify-between gap-2 p-2 bg-muted rounded text-sm"
                  >
                    <code className="font-mono truncate flex-1">{item.password}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={async () => {
                        await navigator.clipboard.writeText(item.password);
                        trackCopy({ fromHistory: true, index });
                      }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
}
