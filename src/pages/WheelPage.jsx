import React, { useState, useEffect } from "react";
import "./WheelPage.css";

const WheelPage = () => {
  const [items, setItems] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");
  const [spinImage, setSpinImage] = useState(null);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("wheelItems")) || [];
    setItems(storedItems);
    const storedImage = localStorage.getItem("spinImage");
    if (storedImage) {
      setSpinImage(storedImage);
    }
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

    const spinInterval = setInterval(() => {
      setResult(items[Math.floor(Math.random() * items.length)].name);
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);
      setResult(spinResult);
      setSpinning(false);
    }, 3000);
  };

  return (
    <div className="wheel-container">
      <div className="content">
        <h1 className="title">GACHAPON</h1>
        {spinImage && (
          <div className="uploaded-image-container">
            <img src={spinImage} alt="Uploaded" className="uploaded-image" />
          </div>
        )}
        <div className="result-container">
          <div className="result-box">
            <p className="result">{result || "???"}</p>
          </div>
        </div>
        <button
          className="spin-button"
          onClick={handleSpin}
          disabled={spinning}
        >
          {spinning ? "Gachaing..." : "Spin"}
        </button>
      </div>
    </div>
  );
};

export default WheelPage;
