import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Sidebar.css';

// Import degli icone
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="brand">
                <img
        src="/logo.png"
        alt="Power Racing Logo"
        className="brand-logo"
        onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" fill="%233498db"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">PR</text></svg>';
        }}
        />
            <h2 className="brand-text">Power Racing</h2>
          </div>
          <button className="toggle-button" onClick={toggleSidebar}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <div className="sidebar-menu">
          <ul>
            <li className={isActive('/') ? 'active' : ''}>
              <Link to="/">
                <DashboardIcon />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className={isActive('/cars') ? 'active' : ''}>
              <Link to="/cars">
                <DirectionsCarIcon />
                <span>Gestione Auto</span>
              </Link>
            </li>
            <li className={isActive('/cars/new') ? 'active' : ''}>
              <Link to="/cars/new">
                <AddCircleOutlineIcon />
                <span>Aggiungi Auto</span>
              </Link>
            </li>
            <li className="separator">
              <span>Impostazioni</span>
            </li>
            <li>
              <Link to="/settings">
                <SettingsIcon />
                <span>Preferenze</span>
              </Link>
            </li>
            <li>
              <Link to="/maintenance">
                <BuildIcon />
                <span>Manutenzione</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <ExitToAppIcon />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {!isOpen && (
        <div className="mobile-toggle">
          <button onClick={toggleSidebar}>
            <MenuIcon />
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;