'use client';

import { useState } from 'react';
import { PasswordGenerator } from './password-generator/PasswordGenerator';
import { useAnalytics } from '@/hooks/useAnalytics';

interface ToolInterfaceProps {
  toolId: string;
}

export function ToolInterface({ toolId }: ToolInterfaceProps) {
  const { trackToolView } = useAnalytics();

  // Track tool view on mount
  useState(() => {
    trackToolView(toolId);
  });

  // Render the appropriate tool component based on toolId
  switch (toolId) {
    case 'password-generator':
      return <PasswordGenerator />;
    
    case 'qr-code-generator':
      return (
        <div className="text-center py-8 text-muted-foreground">
          QR Code Generator coming soon...
        </div>
      );
    
    case 'image-converter':
      return (
        <div className="text-center py-8 text-muted-foreground">
          Image Converter coming soon...
        </div>
      );
    
    case 'image-compressor':
      return (
        <div className="text-center py-8 text-muted-foreground">
          Image Compressor coming soon...
        </div>
      );
    
    case 'pdf-merger':
      return (
        <div className="text-center py-8 text-muted-foreground">
          PDF Merger coming soon...
        </div>
      );
    
    case 'json-formatter':
      return (
        <div className="text-center py-8 text-muted-foreground">
          JSON Formatter coming soon...
        </div>
      );
    
    case 'base64-encoder':
      return (
        <div className="text-center py-8 text-muted-foreground">
          Base64 Encoder/Decoder coming soon...
        </div>
      );
    
    case 'hash-generator':
      return (
        <div className="text-center py-8 text-muted-foreground">
          Hash Generator coming soon...
        </div>
      );
    
    default:
      return (
        <div className="text-center py-8 text-muted-foreground">
          Tool not implemented yet. Check back soon!
        </div>
      );
  }
}
