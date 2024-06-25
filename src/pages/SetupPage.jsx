import React, { useState, useEffect } from "react";

const SetupPage = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [chance, setChance] = useState("");
  const maxItems = 8;

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("wheelItems")) || [];
    setItems(storedItems);
  }, []);

  const handleAddItem = () => {
    if (items.length < maxItems && itemName !== "" && chance !== "") {
      const newItem = {
        name: itemName,
        chance: parseFloat(chance),
      };
      setItems([...items, newItem]);
      setItemName("");
      setChance("");
      saveItemsToLocalStorage([...items, newItem]);
    }
  };

  const saveItemsToLocalStorage = (items) => {
    localStorage.setItem("wheelItems", JSON.stringify(items));
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
    saveItemsToLocalStorage(updatedItems);
  };

  return (
    <div>
      <h1>Setup Wheel Items</h1>
      <div>
        <label>Item Name:</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <label>Chance (%):</label>
        <input
          type="number"
          value={chance}
          onChange={(e) => setChance(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.chance}%
            <button onClick={() => handleDeleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SetupPage;
