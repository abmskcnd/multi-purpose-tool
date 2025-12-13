'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Copy, Check, Download, RotateCcw, RefreshCw } from 'lucide-react';
import { Button, Card, Badge, Textarea, Progress } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

// ============================================
// Tool Card Container
// ============================================
interface ToolCardProps {
  children: React.ReactNode;
  className?: string;
}

export function ToolCard({ children, className }: ToolCardProps) {
  return (
    <Card className={cn('', className)}>
      {children}
    </Card>
  );
}

// ============================================
// Tool Section with Title
// ============================================
interface ToolSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export function ToolSection({ title, description, children, className, actions }: ToolSectionProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {(title || description || actions) && (
        <div className="flex items-start justify-between gap-2">
          <div>
            {title && (
              <h3 className="text-sm font-medium text-foreground">{title}</h3>
            )}
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

// ============================================
// Tool Output Display
// ============================================
interface ToolOutputProps {
  value: string;
  label?: string;
  onCopy?: () => void;
  onDownload?: () => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  rows?: number;
  fontMono?: boolean;
  showActions?: boolean;
  copyLabel?: string;
  downloadLabel?: string;
  clearLabel?: string;
}

export function ToolOutput({
  value,
  label,
  onCopy,
  onDownload,
  onClear,
  placeholder,
  className,
  rows = 4,
  fontMono = true,
  showActions = true,
  copyLabel,
  downloadLabel,
  clearLabel,
}: ToolOutputProps) {
  const t = useTranslations('common');
  const [copied, setCopied] = React.useState(false);

  // Use translations if labels not provided
  const effectiveCopyLabel = copyLabel ?? t('copy');
  const effectiveDownloadLabel = downloadLabel ?? t('download');
  const effectiveClearLabel = clearLabel ?? t('clear');
  const effectivePlaceholder = placeholder ?? t('output_placeholder');

  const handleCopy = React.useCallback(async () => {
    if (!value) return;
    
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy?.();
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }, [value, onCopy]);

  const handleDownload = React.useCallback(() => {
    if (!value) return;
    
    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onDownload?.();
  }, [value, onDownload]);

  return (
    <ToolSection
      title={label}
      actions={
        showActions && value ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 px-2"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-1 text-green-500" />
                  <span className="text-green-500">{t('copied')}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  {effectiveCopyLabel}
                </>
              )}
            </Button>
            {onDownload && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="h-7 px-2"
              >
                <Download className="h-3.5 w-3.5 mr-1" />
                {effectiveDownloadLabel}
              </Button>
            )}
            {onClear && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="h-7 px-2"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                {effectiveClearLabel}
              </Button>
            )}
          </>
        ) : null
      }
    >
      <Textarea
        value={value}
        placeholder={effectivePlaceholder}
        readOnly
        rows={rows}
        className={cn(
          'resize-none',
          fontMono && 'font-mono text-sm',
          !value && 'text-muted-foreground',
          className
        )}
      />
    </ToolSection>
  );
}

// ============================================
// Tool Input with Label
// ============================================
interface ToolInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  description?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
  fontMono?: boolean;
  onClear?: () => void;
  maxLength?: number;
  showCharCount?: boolean;
}

export function ToolInput({
  value,
  onChange,
  label,
  description,
  placeholder,
  rows = 4,
  className,
  fontMono = false,
  onClear,
  maxLength,
  showCharCount = false,
}: ToolInputProps) {
  return (
    <ToolSection
      title={label}
      description={description}
      actions={
        onClear && value ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-7 px-2"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            Clear
          </Button>
        ) : null
      }
    >
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className={cn(
            'resize-none',
            fontMono && 'font-mono text-sm',
            className
          )}
        />
        {showCharCount && (
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {value.length}{maxLength ? `/${maxLength}` : ''}
          </div>
        )}
      </div>
    </ToolSection>
  );
}

// ============================================
// Tool Action Buttons
// ============================================
interface ToolActionsProps {
  children: React.ReactNode;
  className?: string;
}

export function ToolActions({ children, className }: ToolActionsProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {children}
    </div>
  );
}

// ============================================
// Tool Primary Action Button
// ============================================
interface ToolPrimaryActionProps {
  onClick: () => void;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function ToolPrimaryAction({
  onClick,
  children,
  loading,
  disabled,
  icon,
  className,
}: ToolPrimaryActionProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      loading={loading}
      size="lg"
      className={cn('min-w-[140px]', className)}
    >
      {!loading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </Button>
  );
}

// ============================================
// Tool Strength Meter
// ============================================
interface ToolStrengthMeterProps {
  score: number;
  maxScore: number;
  label: string;
  className?: string;
}

export function ToolStrengthMeter({
  score,
  maxScore,
  label,
  className,
}: ToolStrengthMeterProps) {
  const percentage = (score / maxScore) * 100;
  
  const getColor = () => {
    if (percentage <= 25) return 'bg-red-500';
    if (percentage <= 50) return 'bg-yellow-500';
    if (percentage <= 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getVariant = (): 'destructive' | 'warning' | 'secondary' | 'success' => {
    if (percentage <= 25) return 'destructive';
    if (percentage <= 50) return 'warning';
    if (percentage <= 75) return 'secondary';
    return 'success';
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Strength</span>
        <Badge variant={getVariant()}>{label}</Badge>
      </div>
      <Progress
        value={percentage}
        className="h-2"
        indicatorClassName={getColor()}
      />
    </div>
  );
}

// ============================================
// Tool Option Row (for checkboxes/switches)
// ============================================
interface ToolOptionRowProps {
  children: React.ReactNode;
  className?: string;
}

export function ToolOptionRow({ children, className }: ToolOptionRowProps) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      {children}
    </div>
  );
}

// ============================================
// Tool Generate Button (common pattern)
// ============================================
interface ToolGenerateButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function ToolGenerateButton({
  onClick,
  loading,
  disabled,
  children = 'Generate',
}: ToolGenerateButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      loading={loading}
      size="lg"
      className="w-full sm:w-auto min-w-[160px]"
    >
      {!loading && <RefreshCw className="mr-2 h-4 w-4" />}
      {children}
    </Button>
  );
}
