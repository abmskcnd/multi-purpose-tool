'use client';

import { useCallback } from 'react';
import { ANALYTICS_EVENTS } from '@/config/constants';

interface TrackEventParams {
  name: string;
  params?: Record<string, unknown>;
}

export function useAnalytics() {
  const trackEvent = useCallback(async ({ name, params }: TrackEventParams) => {
    try {
      // Send to our API
      await fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          params,
          timestamp: new Date().toISOString(),
        }),
      });

      // Also send to Google Analytics if available
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', name, params);
      }
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }, []);

  const trackToolView = useCallback(
    (toolId: string) => {
      trackEvent({
        name: ANALYTICS_EVENTS.TOOL_VIEW,
        params: { tool_id: toolId },
      });
    },
    [trackEvent]
  );

  const trackToolUse = useCallback(
    (toolId: string, action?: string) => {
      trackEvent({
        name: ANALYTICS_EVENTS.TOOL_USE,
        params: { tool_id: toolId, action },
      });
    },
    [trackEvent]
  );

  const trackToolComplete = useCallback(
    (toolId: string, duration?: number) => {
      trackEvent({
        name: ANALYTICS_EVENTS.TOOL_COMPLETE,
        params: { tool_id: toolId, duration_ms: duration },
      });
    },
    [trackEvent]
  );

  const trackError = useCallback(
    (toolId: string, error: string) => {
      trackEvent({
        name: ANALYTICS_EVENTS.TOOL_ERROR,
        params: { tool_id: toolId, error },
      });
    },
    [trackEvent]
  );

  return {
    trackEvent,
    trackToolView,
    trackToolUse,
    trackToolComplete,
    trackError,
  };
}
