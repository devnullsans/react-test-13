import React, { useCallback, useEffect, useState } from "react";

export function useAlert() {
  const [counter, setCounter] = useState(1);
  const [list, setList] = useState([]);

  const addAlert = useCallback(
    (time, callback) => {
      const id = counter;
      const tid = setTimeout(() => {
        close();
        callback();
      }, time * 1e3 + 1e2);
      const close = () => {
        clearTimeout(tid);
        setList((l) => l.filter((a) => a.id !== id));
      };
      setCounter(id + 1);
      setList((l) => l.concat({ id, time, close }));
    },
    [counter, setCounter, setList]
  );

  return [list, addAlert];
}

function Toast({ id, time, close }) {
  const [timer, setTimer] = useState(time);

  useEffect(() => {
    const iid = setInterval(() => setTimer((t) => t - 1), 1e3);
    return () => clearInterval(iid);
  }, [setTimer]);

  return (
    <div className="toast">
      <span className="toast-text">
        {timer}: {id}
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
