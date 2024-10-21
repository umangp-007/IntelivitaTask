import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchBar.css'; 

const SearchBar = ({ setSearchQuery }) => {
  return (
    <div className="search-bar-container">
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control search-input" 
          placeholder="Search by ID, Name, or Email" 
          onKeyUp={(e) => setSearchQuery(e.target.value)} 
        />
        <span className="input-group-text">
          search
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
