import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      const handleKeyDown = (e) => {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      };
      document.addEventListener("keydown", handleKeyDown);

      return function () {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [action, key]
  );
}
