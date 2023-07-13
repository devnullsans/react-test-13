// import { useReducer, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AlertContainer, useAlert } from "./Alerts";
// import Loading from "./Loading";
import Layout from "./Layout";
import Missing from "./Missing";
import Component1 from "./Component1";
import Component2 from "./Component2";
import Component3 from "./Component3";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Navigate to="/component-1" />}
          />
          <Route
            path="/component-1"
            element={<Component1 />}
          />
          <Route
            path="/component-2"
            element={<Component2 />}
          />
          <Route
            path="/component-3"
            element={<Component3 />}
          />

          <Route
            path="*"
            element={<Missing />}
          />
        </Route>
      </Routes>
      {/* <AlertContainer alerts={alerts} /> */}
      {/* {isLoading && <Loading />} */}
    </BrowserRouter>
  );
}

export default App;
