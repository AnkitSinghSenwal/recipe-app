// By : Samujjwal Ghosh
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import React from "react";
import { GlobalContext } from "../../Context";

export default function Details() {
  const prams = useParams();
  const { recipeDetailsData, setRecipeDetailsData, handleAddToFav, favList } = useContext(GlobalContext);

  useEffect(() => {
    async function getDetails() {
      try {
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${prams.id}`
        );
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched data:", data); // Log fetched data to the console
          setRecipeDetailsData(data.data.recipe);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getDetails();
  }, [prams.id]);

  useEffect(() => {
    if (recipeDetailsData && recipeDetailsData.title && !recipeDetailsData.titleParsed) {
      const parser = new DOMParser();
      const parsedHtml = parser.parseFromString(recipeDetailsData.title, 'text/html');
      setRecipeDetailsData(prevData => ({ ...prevData, title: parsedHtml.body.textContent, titleParsed: true, }));
    }
  }, [recipeDetailsData]);  // Re-run this effect when recipeDetailsData changes
  

  if (!recipeDetailsData || !recipeDetailsData.title) {
    return <h1>Loading...</h1>;
  }

  // Destructure the recipe data for ease of use
  const { title, image_url, cooking_time, ingredients, publisher, source_url, id,} =
    recipeDetailsData;

  return (

<div
  style={{
    border: "none",
    borderRadius: "16px",
    padding: "24px",
    // maxWidth: "800px",
    margin: "40px auto",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    gap: "24px",
    backgroundColor: "#2c3e50",  // Dark background
  }}
>
  <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
    
    {/* Image */}
    <img
      src={image_url}
      alt={title}
      style={{
        width: "100%",
        height: "250px",
        borderRadius: "16px",
        objectFit: "cover",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    />

    {/* Title */}
    <h2
      style={{
        fontSize: "26px",
        color: "#ecf0f1",  // Light text for dark background
        marginBottom: "12px",
        fontWeight: "700",
        lineHeight: "1.4",
      }}
    >
      {title}
    </h2>

    {/* Publisher and Cooking Time */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <p
        style={{
          color: "#bdc3c7",  // Light gray text
          fontSize: "16px",
          margin:"10px",
        }}
      >
        Published by:{" "}
        <strong style={{ color: "#ecf0f1" }}>{publisher}</strong>
      </p>

      <p
        style={{
          color: "#bdc3c7",  // Light gray text
          fontSize: "16px",
          margin:"10px",
        }}
      >
        Cooking Time:{" "}
        <strong style={{ color: "#e67e22" }}>{cooking_time} mins</strong>
      </p>
    </div>

    {/* Call-to-Action Buttons */}
    <div style={{ display: "flex", gap: "12px" }}>
      <button
        onClick={() => {
          handleAddToFav(recipeDetailsData);
        }}
        style={{
          flex: 1,
          padding: "12px 20px",
          fontSize: "16px",
          fontWeight: "600",
          color: "#ffffff",
          backgroundColor: favList.findIndex( item => item.id === id) !== -1 ? '#E63946': "#3498db",
          border: "none",
          borderRadius: "12px",
          boxShadow: "0 6px 12px rgba(52, 152, 219, 0.3)",
          transition: "background-color 0.3s ease, transform 0.2s ease",
          cursor: "pointer",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        { favList.findIndex( item => item.id === id) !== -1 ? 'Remove form favorites': 'Add to favorites'}
      </button>

      <a
        href={source_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          textAlign: "center",
          padding: "12px 20px",
          fontSize: "16px",
          fontWeight: "600",
          color: "#ffffff",
          backgroundColor: "#2ecc71",
          border: "none",
          borderRadius: "12px",
          boxShadow: "0 6px 12px rgba(46, 204, 113, 0.3)",
          textDecoration: "none",
          display: "inline-block",
          transition: "background-color 0.3s ease, transform 0.2s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        More Details
      </a>
    </div>  

    {/* Ingredients */}
    <h3
      style={{
        fontSize: "20px",
        color: "#ecf0f1",  // Light text for dark background
        marginTop: "16px",
        borderBottom: "2px solid #34495e",
        paddingBottom: "6px",
        textAlign: "left",
      }}
    >
      Ingredients
    </h3>
    <ul
      style={{
        listStyleType: "disc",
        paddingLeft: "20px",
        color: "#bdc3c7",  // Light gray text
        fontSize: "16px",
        lineHeight: "1.8",
        textAlign: "left",

        display:"grid",
        gridTemplateColumns:"1fr",
      }}
    >
      {ingredients.map((ingredient, index) => (
        <li
          key={index}
        >
          {ingredient.quantity || ""} {ingredient.unit || ""}{" "}
          {ingredient.description}
        </li>
      ))}
    </ul>
  </div>
</div>




  );
}
