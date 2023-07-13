import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  const [active, setActive] = useState(1);

  return (
    <>
      <header className="header">
        <a
          className="header-logo"
          href="/">
          Header
        </a>
        <nav>
          <ul className="header-nav">
            <li className="header-nav-item">
              <Link
                className={`header-nav-link${active === 1 ? " active" : ""}`}
                to="/component-1"
                onClick={() => setActive(1)}>
                First Component
              </Link>
            </li>
            <li className="header-nav-item">
              <Link
                className={`header-nav-link${active === 2 ? " active" : ""}`}
                to="/component-2"
                onClick={() => setActive(2)}>
                Second Component
              </Link>
            </li>
            <li className="header-nav-item">
              <Link
                className={`header-nav-link${active === 3 ? " active" : ""}`}
                to="/component-3"
                onClick={() => setActive(3)}>
                Third Component
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">Footer</footer>
    </>
  );
}
