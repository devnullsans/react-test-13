import React, { useState } from "react";

export default function Modal({ show = false, close = () => {}, pass = () => {} }) {
  const [time, setTime] = useState("");

  const closeModal = () => {
    setTime("");
    close();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const intTime = parseInt(time);
    if (!time) alert("Please enter a timeout value");
    else if (isNaN(intTime)) alert("Please enter numeric value for timeout");
    else {
      pass(intTime);
      closeModal();
    }
  };

  return (
    <div>
      {show && (
        <div
          className="modal-backdrop"
          onClick={closeModal}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={closeModal}>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path
                  stroke="none"
                  d="M0 0h24v24H0z"
                  fill="none"
                />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
            <form
              className="modal-form"
              onSubmit={handleSubmit}>
              <div className="modal-control">
                <label htmlFor="tim">Set timeout:</label>
                <input
                  id="tim"
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="modal-input"
                />
              </div>
              <button className="modal-btn">Confirm</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
