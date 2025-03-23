import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import './Topbar.css';

const Topbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="topbar">
      <div className="topbar-search">
        <input type="text" placeholder="Cerca..." />
      </div>
      
      <div className="topbar-right">
        <div className="topbar-notifications">
          <button className="icon-button">
            <NotificationsIcon />
            <span className="badge">3</span>
          </button>
        </div>
        
        <div className="topbar-user">
          <div className="user-info">
            <span className="user-name">{user?.name || 'Admin'}</span>
            <span className="user-role">{user?.role || 'Amministratore'}</span>
          </div>
          
          <div className="user-avatar">
            <PersonIcon />
          </div>
          
          <div className="user-dropdown">
            <ul>
              <li>
                <a href="#">
                  <PersonIcon />
                  <span>Profilo</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <SettingsIcon />
                  <span>Impostazioni</span>
                </a>
              </li>
              <li className="divider"></li>
              <li>
                <button onClick={handleLogout}>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;