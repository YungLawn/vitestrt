import React, { useState } from "react";

const ToggleButtonList = ({ elements }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [buttons, setButtons] = useState(
    Array.from({ length: elements.length }, (_, i) => ({
      id: elements[i].id,
      isOn: false,
      x: elements[i].x,
      y: elements[i].y
    }))
  );

  const handleButtonToggle = id => {
    setButtons(prevButtons =>
      prevButtons.map(button => {
        if (button.id === id) {
          return { ...button, isOn: !button.isOn };
        }
        return button;
      })
    );
  };

  const handleSelectAll = e => {
    setSelectAll(e.target.checked);
    setButtons(prevButtons =>
      prevButtons.map(button => ({ ...button, isOn: e.target.checked }))
    );
  };

  return (
    <>
    <div className="dropdowntoggle">
        <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close Control Panel" : "Open Control Panel"}
      </button>
      <div className="select-all">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <label>Select All</label>
          </div>
    </div>
    <div className="dropdown-area">
      {isOpen && (
        <>
          <div className="toggle-buttons">
            {buttons.map((button, i) => (
              <div
                key={button.id}
                className="toggle-button"
                style={{ gridColumn: elements[i].x , gridRow: elements[i].y }}
              >
                <button
                  className={`square-button ${button.isOn ? "on" : "off"}`}
                  onClick={() => handleButtonToggle(button.id)}
                >
                  {button.id}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default ToggleButtonList;
