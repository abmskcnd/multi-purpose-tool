'use client';

import { useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { trackGA4Event } from '@/components/analytics';
import type { ActionType, TrackingMetadata } from '@/lib/supabase';

// Generate or retrieve session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  
  let sessionId = sessionStorage.getItem('tool_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    sessionStorage.setItem('tool_session_id', sessionId);
  }
  return sessionId;
}

// Get current locale from URL
function getLocale(): string {
  if (typeof window === 'undefined') return 'en';
  return window.location.pathname.split('/')[1] || 'en';
}

interface UseToolTrackingOptions {
  toolId: string;
  groupId: string;
  trackView?: boolean;
}

interface TrackOptions {
  actionData?: Record<string, unknown>;
  durationMs?: number;
}

export function useToolTracking({ toolId, groupId, trackView = true }: UseToolTrackingOptions) {
  const startTimeRef = useRef<number>(Date.now());
  const hasTrackedView = useRef(false);

  // Track tool view on mount
  useEffect(() => {
    if (trackView && !hasTrackedView.current) {
      hasTrackedView.current = true;
      trackToSupabase('view');
    }
    startTimeRef.current = Date.now();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toolId, groupId, trackView]);

  // Core tracking function - optimized for new schema
  const trackToSupabase = useCallback(async (
    actionType: ActionType,
    options?: TrackOptions
  ) => {
    // Skip if Supabase not configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return;
    }

    try {
      const sessionId = getSessionId();
      
      // Build metadata object (consolidated to save space)
      const metadata: TrackingMetadata = {
        locale: getLocale(),
      };

      // Only add optional fields if they have values
      if (options?.durationMs) {
        metadata.duration_ms = options.durationMs;
      }
      if (options?.actionData && Object.keys(options.actionData).length > 0) {
        metadata.action_data = options.actionData;
      }
      // Only add user_agent on first view (save space)
      if (actionType === 'view' && typeof navigator !== 'undefined') {
        metadata.user_agent = navigator.userAgent;
      }
      if (actionType === 'view' && typeof document !== 'undefined' && document.referrer) {
        metadata.referrer = document.referrer;
      }

      // Insert with minimal columns
      const insertData = {
        tool_id: toolId,
        group_id: groupId,
        action_type: actionType,
        session_id: sessionId,
        metadata: Object.keys(metadata).length > 0 ? metadata : null,
      } as const;

      const { error } = await supabase
        .from('tool_actions')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .insert(insertData as any); // Type assertion needed due to Supabase type inference

      if (error) {
        console.error('[Tracking] Supabase error:', error.message);
      }
    } catch (error) {
      // Silent fail - don't break user experience
      console.error('[Tracking] Error:', error);
    }

    // Also track to GA4 (fire and forget)
    trackGA4Event(`tool_${actionType}`, {
      tool_id: toolId,
      group_id: groupId,
      ...options?.actionData,
    });
  }, [toolId, groupId]);

  // Convenience methods
  const trackGenerate = useCallback(
    (actionData?: Record<string, unknown>) => {
      trackToSupabase('generate', {
        actionData,
        durationMs: Date.now() - startTimeRef.current,
      });
    },
    [trackToSupabase]
  );

  const trackCopy = useCallback(
    (actionData?: Record<string, unknown>) => {
      trackToSupabase('copy', { actionData });
    },
    [trackToSupabase]
  );

  const trackDownload = useCallback(
    (actionData?: Record<string, unknown>) => {
      trackToSupabase('download', { actionData });
    },
    [trackToSupabase]
  );

  const trackShare = useCallback(
    (actionData?: Record<string, unknown>) => {
      trackToSupabase('share', { actionData });
    },
    [trackToSupabase]
  );

  const trackConfigure = useCallback(
    (actionData?: Record<string, unknown>) => {
      trackToSupabase('configure', { actionData });
    },
    [trackToSupabase]
  );

  const trackReset = useCallback(() => {
    trackToSupabase('reset');
    startTimeRef.current = Date.now();
  }, [trackToSupabase]);

  const trackError = useCallback(
    (error: string, actionData?: Record<string, unknown>) => {
      trackToSupabase('error', {
        actionData: { error, ...actionData },
      });
    },
    [trackToSupabase]
  );

  const trackComplete = useCallback(
    (actionData?: Record<string, unknown>) => {
      trackToSupabase('complete', {
        actionData,
        durationMs: Date.now() - startTimeRef.current,
      });
    },
    [trackToSupabase]
  );

  return {
    trackGenerate,
    trackCopy,
    trackDownload,
    trackShare,
    trackConfigure,
    trackReset,
    trackError,
    trackComplete,
  };
}
