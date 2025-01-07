import React from "react";
import { GlobalContext } from "../../Context";
import RecipeListItem from "../RecipeListItem";

export default function Home() {
  const { recipeList, loading } = React.useContext(GlobalContext);
  console.log(recipeList, loading);

  if (loading) {
    return (
      <div
        style={{
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="home">
      <h1>Home</h1>

      <div
        className="recipe-list"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",  
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {recipeList && recipeList.length > 0 ? (
          recipeList.map((recipe, index) => (
            <RecipeListItem key={index} item={recipe} />
          ))
        ): (
          <div
            style={{
              height: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>Search Something...</h1>
          </div>
        )}
      </div>
    </div>
  );
}
