import { useState, useEffect } from "react";

export default function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const startValue = localStorage.getItem(key);
    return startValue ? JSON.parse(startValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return { value, setValue };
}
