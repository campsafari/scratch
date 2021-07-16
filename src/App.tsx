import React from 'react';
import './App.css';
import UserSearch from 'modules/user-search/user-search';

function App() {
  return (
    <div className="app">
      <UserSearch />
      <p>Find Github users by username.</p>
    </div>
  );
}

export default App;
