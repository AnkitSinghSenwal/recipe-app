import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../Context/index";

export default function Navbar() {

  const {searchPara, setSearchPara, handleSubmit, placeholder} = useContext(GlobalContext);

  return (
    
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
    }}
  >  
  
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      width:"250px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#000000",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow for depth
      textAlign: "center",
    }}
  >
    {/* Logo */}
    <h1 style={{ margin: 0, fontSize: "32px", color: "#007bff" }}>
      <NavLink
        to="/recipe-app/"
        style={{
          textDecoration: "none",
          fontWeight: "bold",
          color: "#007bff", // Primary color for the logo
        }}
      >
        Food Recipe
      </NavLink>
    </h1>

    {/* Search Bar */}
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "500px",
        margin: "20px 0", // Space below the search bar
      }}
    >
      <input
        value={searchPara}
        onChange={(e) => setSearchPara(e.target.value)}
        className="search-bar"
        type="text"
        placeholder={placeholder ? `Result for: ${placeholder}` : "Search for recipes"}
        style={{
          flex: 1,
          padding: "12px 15px",
          border: "1px solid #ccc",
          borderRadius: "7px",
          outline: "none",
          fontSize: "16px",
        }}
      />
      {/* <button
        type="submit"
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          padding: "12px 20px",
          borderRadius: "0 4px 4px 0",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Search
      </button> */}
    </form>

    {/* Navigation Links */}
    <ul
      style={{
        display: "flex",
        listStyle: "none",
        margin: 0,
        padding: 0,
        gap: "15px",
      }}
    >

      {["Home", "Favorites"].map((link, index) => (

        <li key={index}>
          <NavLink
            to={ link === 'Home' ? '/recipe-app/' : `/recipe-app/${link.toLowerCase()}`}
            style={{
              color:"rgb(192 192 192)",
              textDecoration: "none",
              fontSize: "16px",
              padding: "10px 15px",
              border: '1px solid #007bff',  
              borderRadius: "5px",
              transition: "all 0.3s ease",
            }}
            activeStyle={{
              color: "#fff",
              backgroundColor: "#007bff",
              fontWeight: "bold",
            }}
          >
            {link}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
  
  </div>
  );
}
