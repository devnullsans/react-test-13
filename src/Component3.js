import React from "react";

export default function Component3() {
  return (
    <section className="section">
      <div className="container">
        <form className="form-second">
          <div className="control-second">
            <label htmlFor="txt">Enter Countdown Time</label>
            <input
              id="txt"
              type="number"
              className="input-second"
              placeholder="Enter Here"
            />
          </div>
          <button className="btn">Start Timer</button>
        </form>
      </div>
    </section>
  );
}
