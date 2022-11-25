import { useLocalStorage } from "./useLocalStorage";

export type Item = {
  id: string;
};

function getIndexOfItem<T extends Item>(items: T[], { id }: T): number {
  return items.findIndex((item) => item.id === id);
}

export function useItems<T extends Item>(key: string, initialItems: Array<T>) {
  const [items, setItems] = useLocalStorage<T>(key, initialItems);

  const addItem = (item: T) => {
    setItems([...items, item]);
  };

  const updateItem = (item: T) => {
    const index = getIndexOfItem<T>(items, item);
    if (index === -1) return;

    items[index] = item;
    setItems([...items]);
  };

  const removeItem = (item: T) => {
    const index = getIndexOfItem(items, item);
    if (index === -1) return;

    items.splice(index, 1);
    setItems([...items]);
  };

  return [items, addItem, updateItem, removeItem] as const;
}
