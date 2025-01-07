import React from 'react';
import RecipeListItem from '../RecipeListItem';
import { useContext } from 'react';
import { GlobalContext } from '../../Context';

export default function Favorites() {
const {favList} = useContext(GlobalContext);
console.log('favList->', favList);

  if (favList.length === 0) {
    return (
      <div
        style={{
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Nothing in favorites...</h1>
      </div>
    );
  }

  return (
    <div className="home">
      <h1>Favorites</h1>

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
        {favList && favList.length > 0 ? (
          favList.map((recipe, index) => (
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
            <h1>Nothing in favorites...</h1>
          </div>
        )}
      </div>
    </div>
  );
}