import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/', label: '首页' },
  { to: '/services', label: '服务' },
  { to: '/about', label: '关于我们' },
  { to: '/contact', label: '联系我们' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <span className="navbar-logo-mark">晨</span>
          <span>晨曦科技</span>
        </NavLink>

        <nav className={`navbar-links ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `navbar-link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/contact" className="btn btn-primary navbar-cta" onClick={() => setOpen(false)}>
            免费咨询
          </NavLink>
        </nav>

        <button
          className="navbar-toggle"
          aria-label="打开菜单"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
