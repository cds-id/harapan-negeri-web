import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface LoaderState {
  isLoading: boolean;
  progress?: number;
  message?: string;
  id?: string;
}

interface GlobalLoaderContextType {
  loaders: Record<string, LoaderState>;
  showLoader: (id?: string, message?: string) => void;
  hideLoader: (id?: string) => void;
  updateProgress: (progress: number, id?: string) => void;
  updateMessage: (message: string, id?: string) => void;
  isAnyLoading: boolean;
  getCurrentLoader: () => LoaderState | null;
}

const GlobalLoaderContext = createContext<GlobalLoaderContextType | undefined>(undefined);

const DEFAULT_LOADER_ID = 'default';

export const GlobalLoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loaders, setLoaders] = useState<Record<string, LoaderState>>({});

  const showLoader = useCallback((id: string = DEFAULT_LOADER_ID, message?: string) => {
    setLoaders(prev => ({
      ...prev,
      [id]: {
        isLoading: true,
        progress: 0,
        message: message || 'Memuat...',
        id,
      },
    }));
  }, []);

  const hideLoader = useCallback((id: string = DEFAULT_LOADER_ID) => {
    setLoaders(prev => {
      const newLoaders = { ...prev };
      delete newLoaders[id];
      return newLoaders;
    });
  }, []);

  const updateProgress = useCallback((progress: number, id: string = DEFAULT_LOADER_ID) => {
    setLoaders(prev => {
      if (!prev[id]) return prev;

      return {
        ...prev,
        [id]: {
          ...prev[id],
          progress: Math.min(100, Math.max(0, progress)),
        },
      };
    });
  }, []);

  const updateMessage = useCallback((message: string, id: string = DEFAULT_LOADER_ID) => {
    setLoaders(prev => {
      if (!prev[id]) return prev;

      return {
        ...prev,
        [id]: {
          ...prev[id],
          message,
        },
      };
    });
  }, []);

  const isAnyLoading = Object.keys(loaders).length > 0;

  const getCurrentLoader = useCallback((): LoaderState | null => {
    const loaderIds = Object.keys(loaders);
    if (loaderIds.length === 0) return null;

    // Return the most recently added loader or default loader if exists
    const defaultLoader = loaders[DEFAULT_LOADER_ID];
    if (defaultLoader) return defaultLoader;

    return loaders[loaderIds[0]];
  }, [loaders]);

  const contextValue: GlobalLoaderContextType = {
    loaders,
    showLoader,
    hideLoader,
    updateProgress,
    updateMessage,
    isAnyLoading,
    getCurrentLoader,
  };

  return (
    <GlobalLoaderContext.Provider value={contextValue}>
      {children}
    </GlobalLoaderContext.Provider>
  );
};

export const useGlobalLoader = () => {
  const context = useContext(GlobalLoaderContext);

  if (context === undefined) {
    throw new Error('useGlobalLoader must be used within a GlobalLoaderProvider');
  }

  return context;
};

// Convenience hooks for common use cases
export const useSimpleLoader = () => {
  const { showLoader, hideLoader, updateProgress, updateMessage, isAnyLoading, getCurrentLoader } = useGlobalLoader();

  return {
    show: (message?: string) => showLoader(DEFAULT_LOADER_ID, message),
    hide: () => hideLoader(DEFAULT_LOADER_ID),
    setProgress: (progress: number) => updateProgress(progress, DEFAULT_LOADER_ID),
    setMessage: (message: string) => updateMessage(message, DEFAULT_LOADER_ID),
    isLoading: isAnyLoading,
    currentLoader: getCurrentLoader(),
  };
};

// Hook for async operations with automatic loading management
export const useAsyncLoader = () => {
  const { show, hide, setProgress, setMessage } = useSimpleLoader();

  const executeWithLoader = useCallback(async <T,>(
    asyncFn: (updateProgress: (progress: number) => void, updateMessage: (message: string) => void) => Promise<T>,
    initialMessage?: string
  ): Promise<T> => {
    try {
      show(initialMessage);
      const result = await asyncFn(setProgress, setMessage);
      return result;
    } finally {
      hide();
    }
  }, [show, hide, setProgress, setMessage]);

  return {
    executeWithLoader,
    show,
    hide,
    setProgress,
    setMessage,
  };
};

// Hook for route-based loading
export const useRouteLoader = () => {
  const { showLoader, hideLoader, updateMessage } = useGlobalLoader();

  const showRouteLoader = useCallback((routeName?: string) => {
    const message = routeName ? `Memuat halaman ${routeName}...` : 'Memuat halaman...';
    showLoader('route', message);
  }, [showLoader]);

  const hideRouteLoader = useCallback(() => {
    hideLoader('route');
  }, [hideLoader]);

  const updateRouteMessage = useCallback((message: string) => {
    updateMessage(message, 'route');
  }, [updateMessage]);

  return {
    showRouteLoader,
    hideRouteLoader,
    updateRouteMessage,
  };
};
