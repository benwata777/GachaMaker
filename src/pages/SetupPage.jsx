import React, { useState, useEffect } from "react";

const SetupPage = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [chance, setChance] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const maxItems = 8;

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("wheelItems")) || [];
    setItems(storedItems);
  }, []);

  const handleAddItem = () => {
    if (
      items.length < maxItems &&
      itemName !== "" &&
      chance !== "" &&
      validateImageSize(imageFile)
    ) {
      const newItem = {
        name: itemName,
        chance: parseFloat(chance),
      };
      setItems([...items, newItem]);
      setItemName("");
      setChance("");
      saveItemsToLocalStorage([...items, newItem]);
    } else {
      alert("หากภาพมีขนาดใหญ่เกิน 1000x459px อาจทำให้แสดงผลผิดพลาด");
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (validateImageSize(file)) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = function (e) {
        const imageUrl = e.target.result;
        localStorage.setItem("spinImage", imageUrl);
      };
      reader.readAsDataURL(file);
    } else {
      alert("หากภาพมีขนาดใหญ่เกิน 1000x459px อาจทำให้แสดงผลผิดพลาด");
    }
  };

  const validateImageSize = (file) => {
    if (!file) return true;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    const screenWidth = window.innerWidth;

    return img.width <= screenWidth;
  };

  return (
    <div className="setup-container">
      <h1>Setup Gacha Items</h1>
      <div className="input-container">
        <div>
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imageFile && (
            <p style={{ fontSize: "14px", color: "red" }}>
              (หากภาพมีขนาดใหญ่เกิน 1000x459px อาจทำให้แสดงผลผิดพลาด)
            </p>
          )}
          {localStorage.getItem("spinImage") && (
            <div className="uploaded-image-container">
              <img
                src={localStorage.getItem("spinImage")}
                alt="Uploaded"
                className="uploaded-image"
              />
            </div>
          )}
        </div>
        <div>
          <label>Item Name:</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div>
          <label>Chance (%):</label>
          <input
            type="number"
            value={chance}
            onChange={(e) => setChance(e.target.value)}
          />
        </div>
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.chance}%
            <div className="delbutton">
              <button onClick={() => handleDeleteItem(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SetupPage;
