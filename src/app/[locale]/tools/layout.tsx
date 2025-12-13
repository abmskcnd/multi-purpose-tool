'use client';

import { useState } from 'react';
import { Header, Footer, ToolsSidebar } from '@/components/layout';

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <>
      <Header />
      <div className="flex flex-1">
        <ToolsSidebar 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
      <Footer />
    </>
  );
}
