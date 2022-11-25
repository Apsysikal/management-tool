import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T[]) {
  const [localValue, setLocalValue] = useState<T[]>(() => {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T[]) : initialValue;
  });

  const setValue = (value: Array<T>) => {
    localStorage.setItem(key, JSON.stringify(value));
    setLocalValue([...value]);
  };

  return [localValue, setValue] as const;
}
