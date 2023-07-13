import React, { useCallback, useState } from "react";

export function useAlert() {
  const [counter, setCounter] = useState(1);
  const [timer, setTimer] = useState(7);
  const [list, setList] = useState([]);

  const addAlert = useCallback(
    (text) => {
      const id = counter;
      const time = timer * 1e3;
      let tid = setTimeout(() => close(), time);
      const close = () => setList((l) => l.filter((a) => a.id !== id));
      const cancel = () => clearTimeout(tid);
      const reinit = () => setTimeout(() => close(), time);
      setCounter(id + 1);
      setList((l) => l.concat({ id, text, close, cancel, reinit }));
    },
    [counter, timer, setCounter, setList]
  );

  return [list, addAlert, setTimer];
}

function Toast({ id, text, close, cancel, reinit }) {
  return (
    <div
      className="toast"
      onMouseEnter={cancel}
      onMouseLeave={reinit}>
      <span className="toast-text">
        {text}: {id}
      </span>{" "}
      <button
        className="toast-close"
        onClick={close}>
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
    </div>
  );
}

export function Notification({ alerts }) {
  return (
    <div>
      <ul className="notification-list">
        {alerts.map((alert) => (
          <Toast
            key={alert.id}
            {...alert}
          />
        ))}
      </ul>
    </div>
  );
}
