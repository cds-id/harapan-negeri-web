import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useRouteLoader } from '@/hooks/useGlobalLoader';

interface RouteLoaderProps {
  children: React.ReactNode;
  loadingDuration?: number;
  showOnFirstLoad?: boolean;
}

const RouteLoader: React.FC<RouteLoaderProps> = ({
  children,
  loadingDuration = 800,
  showOnFirstLoad = true
}) => {
  const location = useLocation();
  const { showRouteLoader, hideRouteLoader, updateRouteMessage } = useRouteLoader();
  const isFirstLoad = useRef(true);
  const loadingTimeoutRef = useRef<NodeJS.Timeout>();

  // Route name mapping for better UX
  const getRouteDisplayName = (pathname: string): string => {
    const routeNames: Record<string, string> = {
      '/': 'Beranda',
      '/about': 'Tentang Kami',
      '/programs': 'Program',
      '/events': 'Kegiatan',
      '/news': 'Berita',
      
      '/contact': 'Kontak',
      '/donate': 'Donasi',
    };

    return routeNames[pathname] || 'Halaman';
  };

  useEffect(() => {
    // Skip loading on first mount if disabled
    if (isFirstLoad.current && !showOnFirstLoad) {
      isFirstLoad.current = false;
      return;
    }

    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    const routeName = getRouteDisplayName(location.pathname);

    // Show loader immediately
    if (isFirstLoad.current) {
      showRouteLoader(`${routeName}`);
      updateRouteMessage(`Memuat ${routeName}...`);
    } else {
      showRouteLoader(`${routeName}`);
      updateRouteMessage(`Beralih ke ${routeName}...`);
    }

    // Simulate loading time with progressive messages
    const progressSteps = [
      { time: 200, message: `Menyiapkan ${routeName}...`, progress: 30 },
      { time: 400, message: `Memuat konten ${routeName}...`, progress: 60 },
      { time: 600, message: `Menyelesaikan...`, progress: 90 },
    ];

    progressSteps.forEach(({ time, message }) => {
      setTimeout(() => {
        updateRouteMessage(message);
      }, time);
    });

    // Hide loader after duration
    loadingTimeoutRef.current = setTimeout(() => {
      hideRouteLoader();
      isFirstLoad.current = false;
    }, loadingDuration);

    // Cleanup function
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [location.pathname, showRouteLoader, hideRouteLoader, updateRouteMessage, loadingDuration, showOnFirstLoad]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      hideRouteLoader();
    };
  }, [hideRouteLoader]);

  return <>{children}</>;
};

export default RouteLoader;
