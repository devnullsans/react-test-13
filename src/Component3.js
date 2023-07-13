import React, { useEffect, useState } from "react";
import { useAlert, Notification } from "./Alert";

export default function Component3() {
  const [time, setTime] = useState("");
  const [showCountries, setShowCountries] = useState(false);
  const [alerts, addAlert] = useAlert();

  const handleSubmit = (e) => {
    e.preventDefault();
    const intTime = parseInt(time);
    if (!time) alert("Please enter a timeout value");
    else if (isNaN(intTime)) alert("Please enter numeric value for timeout");
    else addAlert(intTime, () => setShowCountries(true));
  };

  return (
    <>
      <section className="section">
        <div className={`${showCountries ? "country-" : ""}container`}>
          {showCountries ? (
            <Countries />
          ) : (
            <form
              className="form-second"
              onSubmit={handleSubmit}>
              <div className="control-second">
                <label htmlFor="txt">Enter Countdown Time</label>
                <input
                  id="txt"
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="input-second"
                  placeholder="Enter Here"
                />
              </div>
              <button
                className="btn"
                disabled={alerts.length > 0}>
                Start Timer
              </button>
            </form>
          )}
        </div>
      </section>
      <Notification alerts={alerts} />
    </>
  );
}

const url = "https://api.knowmee.co/api/v1/master/get-country-list";

function Countries() {
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    (async () => {
      const res = await fetch(url, { signal: controller.signal });
      const { responseData } = await res.json();
      if (!res.ok || !responseData) throw new Error("Error Fetching Data !");
      setCountries(responseData);
      setLoading(false);
    })().catch((error) => setError(controller.signal.aborted ? "" : error.message));
    return () => {
      if (controller.signal.aborted) controller.abort();
    };
  }, [setLoading, setCountries, setError, url]);

  return loading ? (
    <p
      className="country-loading"
      style={error ? { color: "red" } : null}>
      {error ? error : "Fetching Data, Please wait..."}
    </p>
  ) : (
    <>
      <div className="country-wrapper">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="country-btn">
          Previous
        </button>
        <button
          disabled={Math.ceil(countries.length / 5) === page}
          onClick={() => setPage((p) => p + 1)}
          className="country-btn">
          Next
        </button>
      </div>
      <ul className="country-list">
        {countries.slice((page - 1) * 5, page * 5).map(({ country_id, country_name }) => (
          <li
            key={country_id}
            className="country-item">
            {country_name}
          </li>
        ))}
      </ul>
    </>
  );
}
