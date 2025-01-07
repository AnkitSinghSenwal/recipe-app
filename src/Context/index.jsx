import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Create a context
export const GlobalContext = createContext();

function GlobalState({ children }) {
  const [recipeList, setRecipeList] = useState([]);
  const [searchPara, setSearchPara] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favList, setFavList] = useState(()=>{
    // Get the favList from local storage
    const localData = localStorage.getItem("favList");
    return localData ? JSON.parse(localData) : [];
  });
  const navigate = useNavigate();
  const [placeholder, setPlaceholder] = useState("");


  useEffect(() => { 
    // Save the favList to local storage
    localStorage.setItem("favList", JSON.stringify(favList));
    console.log("FavList", favList);

  }, [favList]);

  function handleAddToFav(currentRecipe) {
    let newFavList = [...favList,];
    const existingIndex = newFavList.findIndex((item) => item.id === currentRecipe.id);
    if (existingIndex === -1) {
      newFavList.push(currentRecipe);
    } else {
      newFavList.splice(existingIndex, 1);
    }
    setFavList(newFavList);
    console.log("FavList", favList);
  }

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true

    try {
      // Fetch data from the API using the search parameter
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchPara}`
      );

      // Check if the response status is OK (status 2xx)
      if (res.ok) {
        const data = await res.json();

        // Ensure data is in the expected structure
        if (data && data.data && data.data.recipes) {
          setRecipeList(data.data.recipes); // Update recipe list with results
          
          navigate("/recipe-app/"); // Navigate to the home page
        } else {
          console.error("Unexpected API response format", data);
          setRecipeList([]); // Reset recipe list if data is invalid
        }
      } else {
        console.error(`Error: ${res.status} ${res.statusText}`);
        setRecipeList([]); // Reset recipe list if no recipes are found
      }
    } catch (error) {
      console.error("An error occurred while fetching recipes:", error);
      setRecipeList([]); // Reset recipe list on error
    } finally {
      setLoading(false); // Always reset loading state
      setPlaceholder(searchPara); // Set the placeholder to the search parameter
      setSearchPara(""); // Clear the search parameter after submission
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        searchPara,
        setSearchPara,
        handleSubmit,
        recipeList,
        setRecipeList,
        loading,
        setLoading,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFav,
        favList,
        placeholder,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;