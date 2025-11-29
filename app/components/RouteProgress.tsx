'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface ToastState {
  message: string;
  visible: boolean;
}

export default function RouteProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [toast, setToast] = useState<ToastState>({ message: '', visible: false });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2000);
  };

  const startProgress = () => {
    setVisible(true);
    setProgress(10);
    showToast('Loading page...');

    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + Math.random() * 15));
    }, 200);

    const completeTimeout = setTimeout(() => {
      setProgress(100);
      showToast('Page loaded');
      setTimeout(() => setVisible(false), 300);
      setTimeout(() => setProgress(0), 600);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(completeTimeout);
    };
  };

  useEffect(() => {
    // Trigger when pathname changes
    const cleanup = startProgress();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    // Also trigger when ANY link is clicked
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('a')) {
        startProgress();
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (!visible) {
    return (
      <>
        {toast.visible && (
          <div
            style={{
              position: 'fixed',
              bottom: '1.5rem',
              right: '1.5rem',
              zIndex: 1100,
            }}
          >
            <div className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm shadow-soft-lg border border-blue-500/40">
              {toast.message}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '3px',
          zIndex: 1000,
        }}
      >
        <div
          style={{
            width: `${Math.min(progress, 100)}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #3B82F6, #1D4ED8)',
            boxShadow: '0 0 10px rgba(37,99,235,0.6)',
            transition: 'width 200ms ease-out',
          }}
        />
      </div>

      {toast.visible && (
        <div
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 1100,
          }}
        >
          <div className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm shadow-soft-lg border border-blue-500/40">
            {toast.message}
          </div>
        </div>
      )}
    </>
  );
}


