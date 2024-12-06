
import React, { useState } from 'react';
import s from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  const [active, setActive] = useState(false);

  const toggleBurger = () => {
    setActive(!active);
  };

  const closeMenu = () => {
    setActive(false)
  }

  return (
    <div className={s.header}>
      <div className="container">
        <nav className={s.nav}>
          <Link onClick={closeMenu} to={'/'} className={s.logo}>
            <img src="/logo.svg" alt="" className={s.logo_img} />
            <h3>ANALOGUE &copy; 2024</h3>
          </Link>

          <div className={`${s.links} ${active ? s.active : ''}`}>
            <Link onClick={closeMenu} to={'/'}>WORK</Link>
            <Link onClick={closeMenu} to={'/'}>SERVICES</Link>
            <Link onClick={closeMenu} to={'/'}>STUDIO</Link>
            <Link onClick={closeMenu} to={'/'}>SHOP</Link>
          </div>

          <div className={s.connect}>
            <button className={s.playful_btn}>CONNECT</button>
          </div>

          <div className={s.burger}>
            <button
              onClick={toggleBurger}
              className={`${s.playful_btn} ${active ? s.active : ''}`}
            >
              {active ? 'close' : 'menu'}
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
