import React, { useState, useEffect } from "react";
import "./WheelPage.css"; // Import CSS for styling

const WheelPage = () => {
  const [items, setItems] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("wheelItems")) || [];
    setItems(storedItems);
  }, []);

  const handleSpin = () => {
    if (items.length === 0) {
      alert("Please add items in setup first.");
      return;
    }

    setSpinning(true);
    setResult("");

    const totalChance = items.reduce((acc, item) => acc + item.chance, 0);
    let spinResult = "";
    let accumulatedChance = 0;
    const randomNumber = Math.random();

    items.forEach((item) => {
      accumulatedChance += item.chance / totalChance;
      if (randomNumber < accumulatedChance && spinResult === "") {
        spinResult = item.name;
      }
    });

    // Simulate spinning animation
    const spinInterval = setInterval(() => {
      setResult(items[Math.floor(Math.random() * items.length)].name);
    }, 100);

    // Stop spinning after some time (e.g., 3 seconds)
    setTimeout(() => {
      clearInterval(spinInterval);
      setResult(spinResult);
      setSpinning(false);
    }, 3000);
  };

  return (
    <div className="wheel-container">
      <div className="content">
        <h1 className="title">Spin the Wheel</h1>
        <div className="result-container">
          {result && <p className="result">Result: {result}</p>}
        </div>
        <button
          className="spin-button"
          onClick={handleSpin}
          disabled={spinning}
        >
          {spinning ? "Spinning..." : "Spin"}
        </button>
      </div>
    </div>
  );
};

export default WheelPage;
