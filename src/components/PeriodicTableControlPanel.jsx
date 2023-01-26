import React, { useState } from 'react';

function ControlPanel({ elements }) {
  const [checkboxes, setCheckboxes] = useState(() => {
    return Array.from({ length: elements.length }, (_, i) => ({
      id: elements[i].id,
      isChecked: false,
      x: elements[i].x,
      y: elements[i].y
    }));
  });

  const [selectAll, setSelectAll] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  function handleCheckboxChange(id) {
    const updatedCheckboxes = checkboxes.map(checkbox => {
      if (checkbox.id === id) {
        return { ...checkbox, isChecked: !checkbox.isChecked };
      }
      return checkbox;
    });
    setCheckboxes(updatedCheckboxes);
  }

  function handleSelectAllChange() {
    setCheckboxes(checkboxes.map(checkbox => ({ ...checkbox, isChecked: !selectAll })));
    setSelectAll(!selectAll);
  }

  function handleMinimize() {
    setIsVisible(!isVisible);
  }

  return (
    <div 
    className="checkbox-list">
      <button className='controlpanbut' onClick={handleMinimize}>Control Panel</button>
      {isVisible && (
        <div>
          <label >
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
            Select All
          </label>
          <div className="checkboxes">
        {checkboxes.map(checkbox => (
          <div
            key={checkbox.id}
            className="checkbox"
            style={{
              position: "absolute",
              left: `${(checkbox.x * 40)}px`,
              bottom: `${(checkbox.y * 40) - 450}px`
            }}
          >
            <input
              type="checkbox"
              id={`checkbox-${checkbox.id}`}
              checked={checkbox.isChecked}
              onChange={() => handleCheckboxChange(checkbox.id)}
            />
            <label htmlFor={`checkbox-${checkbox.id}`}>
              {checkbox.id}
            </label>
          </div>
        ))}
      </div>
        </div>
      )}
    </div>
  );
}

export default ControlPanel;
