'use client';

import { useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { trackGA4Event } from '@/components/analytics';
import type { ActionType } from '@/lib/supabase';

// Generate or retrieve session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  
  let sessionId = sessionStorage.getItem('tool_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem('tool_session_id', sessionId);
  }
  return sessionId;
}

interface TrackActionParams {
  toolId: string;
  groupId: string;
  actionType: ActionType;
  actionData?: Record<string, unknown>;
  durationMs?: number;
}

interface UseToolTrackingOptions {
  toolId: string;
  groupId: string;
  trackView?: boolean;
}

export function useToolTracking({ toolId, groupId, trackView = true }: UseToolTrackingOptions) {
  const startTimeRef = useRef<number>(Date.now());
  const hasTrackedView = useRef(false);

  // Track tool view on mount
  useEffect(() => {
    if (trackView && !hasTrackedView.current) {
      hasTrackedView.current = true;
      trackAction({
        toolId,
        groupId,
        actionType: 'view',
      });
    }
    // Reset start time on mount
    startTimeRef.current = Date.now();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toolId, groupId, trackView]);

  // Core tracking function
  const trackAction = useCallback(async (params: TrackActionParams) => {
    try {
      const sessionId = getSessionId();
      const locale = typeof window !== 'undefined' 
        ? window.location.pathname.split('/')[1] || 'en' 
        : 'en';

      // Track to Supabase (only if configured)
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const insertData = {
          tool_id: params.toolId,
          group_id: params.groupId,
          action_type: params.actionType,
          action_data: params.actionData || null,
          session_id: sessionId,
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
          locale,
          referrer: typeof document !== 'undefined' ? document.referrer || null : null,
          duration_ms: params.durationMs || null,
        };
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await supabase.from('tool_actions').insert(insertData as any);

        if (error) {
          console.error('Tracking error:', error);
        }
      }

      // Track to Google Analytics
      trackGA4Event(`tool_${params.actionType}`, {
        tool_id: params.toolId,
        group_id: params.groupId,
        ...params.actionData,
      });
    } catch (error) {
      console.error('Failed to track action:', error);
    }
  }, []);

  // Convenience methods
  const trackGenerate = useCallback(
    (actionData?: Record<string, unknown>) => {
      trackAction({
        toolId,
        groupId,
        actionType: 'generate',
        actionData,
        durationMs: Date.now() - startTimeRef.current,
      });
    },
    [toolId, groupId, trackAction]
  );

  const trackCopy = useCallback(
    (actionData?: Record<string, unknown>) => {
      trackAction({
        toolId,
        groupId,
        actionType: 'copy',
        actionData,
      });
    },
    [toolId, groupId, trackAction]
  );

  const trackDownload = useCallback(
    (actionData?: Record<string, unknown>) => {
      trackAction({
        toolId,
        groupId,
        actionType: 'download',
        actionData,
      });
    },
    [toolId, groupId, trackAction]
  );

  const trackShare = useCallback(
    (actionData?: Record<string, unknown>) => {
      trackAction({
        toolId,
        groupId,
        actionType: 'share',
        actionData,
      });
    },
    [toolId, groupId, trackAction]
  );

  const trackConfigure = useCallback(
    (actionData?: Record<string, unknown>) => {
      trackAction({
        toolId,
        groupId,
        actionType: 'configure',
        actionData,
      });
    },
    [toolId, groupId, trackAction]
  );

  const trackReset = useCallback(() => {
    trackAction({
      toolId,
      groupId,
      actionType: 'reset',
    });
    startTimeRef.current = Date.now();
  }, [toolId, groupId, trackAction]);

  const trackError = useCallback(
    (error: string, actionData?: Record<string, unknown>) => {
      trackAction({
        toolId,
        groupId,
        actionType: 'error',
        actionData: { error, ...actionData },
      });
    },
    [toolId, groupId, trackAction]
  );

  const trackComplete = useCallback(
    (actionData?: Record<string, unknown>) => {
      trackAction({
        toolId,
        groupId,
        actionType: 'complete',
        actionData,
        durationMs: Date.now() - startTimeRef.current,
      });
    },
    [toolId, groupId, trackAction]
  );

  return {
    trackAction,
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
