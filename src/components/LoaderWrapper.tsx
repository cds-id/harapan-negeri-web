import React, { ReactNode } from 'react';
import { GlobalLoaderProvider, useGlobalLoader } from '@/hooks/useGlobalLoader';
import GlobalLoader from '@/components/GlobalLoader';

interface LoaderWrapperProps {
  children: ReactNode;
}

const LoaderContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAnyLoading, getCurrentLoader } = useGlobalLoader();
  const currentLoader = getCurrentLoader();

  return (
    <>
      {children}
      {isAnyLoading && currentLoader && (
        <GlobalLoader
          isLoading={currentLoader.isLoading}
          progress={currentLoader.progress}
          message={currentLoader.message}
        />
      )}
    </>
  );
};

const LoaderWrapper: React.FC<LoaderWrapperProps> = ({ children }) => {
  return (
    <GlobalLoaderProvider>
      <LoaderContent>{children}</LoaderContent>
    </GlobalLoaderProvider>
  );
};

export default LoaderWrapper;
