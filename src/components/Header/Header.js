import React, { useState, useEffect } from 'react';
import './Header.css';
import { IoSearch, IoClose, IoHeartOutline, IoSunny, IoMoon, IoLogoYoutube } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import themeService from '../../services/themeService';

const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(themeService.isDark());
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = themeService.addListener(() => {
      setIsDark(themeService.isDark());
    });
    return unsubscribe;
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log('Searching for:', searchValue);
      setIsSearchOpen(false);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchValue('');
    }
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchValue('');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className={`header-container ${isSearchOpen ? 'search-active' : ''}`}>
        <div className="header-normal">
          <div className="header-left">
            <IoLogoYoutube className="header-logo" onClick={handleLogoClick} />
          </div>

          <div className="header-center">
            <form className="search-form" onSubmit={handleSearch}>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <IoSearch size={24} />
                </button>
              </div>
            </form>
          </div>

          <div className="header-right">
            <button className="mobile-search-button" onClick={handleSearchToggle}>
              <IoSearch size={24} />
            </button>

            <button className="theme-button" onClick={() => themeService.toggleTheme()}>
              {isDark ? <IoMoon size={20} /> : <IoSunny size={20} />}
            </button>

            <button className="sponsor-button">
              <IoHeartOutline size={24} />
              <span>Sponsor</span>
            </button>
          </div>
        </div>

        <div className="mobile-search-overlay">
          <button className="mobile-search-close" onClick={handleCloseSearch}>
            <IoClose size={24} />
          </button>
          <form className="mobile-search-form" onSubmit={handleSearch}>
            <div className="mobile-search-container">
              <input
                type="text"
                placeholder="Search YouTube"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="mobile-search-input"
                autoFocus={isSearchOpen}
              />
              <button type="submit" className="mobile-search-submit">
                <IoSearch size={24} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header; 