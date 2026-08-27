import { useCallback, useState } from 'react';

type UseCustomizationSidebarProps = {
  onSidebarOpen?: () => void;
  onSidebarClose?: () => void;
};

const useCustomizationSidebar = ({
  onSidebarOpen,
  onSidebarClose,
}: UseCustomizationSidebarProps) => {
  const [isCustomizationSidebarOpen, setIsCustomizationSidebarOpen] = useState<boolean>(false);

  const handleSidebarOpen = useCallback(() => {
    setIsCustomizationSidebarOpen(true);
    onSidebarOpen?.();
  }, [onSidebarOpen]);

  const handleSidebarClose = useCallback(() => {
    setIsCustomizationSidebarOpen(false);
    onSidebarClose?.();
  }, [onSidebarClose]);

  return {
    isCustomizationSidebarOpen,
    handleSidebarOpen,
    handleSidebarClose,
  };
};

export default useCustomizationSidebar;
