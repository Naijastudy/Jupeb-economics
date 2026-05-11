import { useEffect } from "react";
import { keyframes } from "../styles/animations";

export default function GlobalStyles() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = keyframes;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return null;
}
