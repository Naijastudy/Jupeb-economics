import { useState, useCallback } from "react";

export default function useToast() {
  const [toast, setToast] = useState(null);
  
  const [timerId, setTimerId] = useState(null);

  const showToast = useCallback((message, type = "info", duration = 3000) => {
    
    if (timerId) clearTimeout(timerId);

    setToast({ message, type });

    const id = setTimeout(() => {
      setToast(null);
    }, duration);

    setTimerId(id);
  }, [timerId]);

  const hideToast = useCallback(() => {
    if (timerId) clearTimeout(timerId);
    setToast(null);
  }, [timerId]);

  return { toast, showToast, hideToast };
}
