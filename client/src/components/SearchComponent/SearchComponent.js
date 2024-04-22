import React from "react";
import { FaSearch } from "react-icons/fa";
import './SearchBar.css'
export const SearchComponent = (props) => {
  const { value, placeholder,onChange} = props;
  return (
      <div className="input-wrapper">
        <FaSearch id="search-icon"/>
        <input placeholder={placeholder} value={value} onChange={onChange}/>
      </div>
  );
};

