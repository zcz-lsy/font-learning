import { useState } from "react";
import PackingList from "./PackingList";
import Logo from "./Logo";
import Form from "./Form";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((curItems) => [...curItems, item]);
  }

  function handleDeleteItem(id) {
    setItems((curItems) => curItems.filter((item) => item.id !== id));
  }

  function handleToggle(id) {
    setItems((curItems) =>
      curItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearItem() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems(() => []);
  }

  return (
    <div className="app">
      <Logo></Logo>
      <Form onAddItems={handleAddItems}></Form>
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggle}
        onClearItem={handleClearItem}
      ></PackingList>
      <Stats items={items}></Stats>
    </div>
  );
}
