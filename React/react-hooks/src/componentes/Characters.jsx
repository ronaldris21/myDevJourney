import React, { useEffect, useState, useReducer, useMemo, useRef } from "react";
import "./Characters.css";
import { FavoritesCharacters } from "./FavoritesCharacters";

const initialState = {
  favorites: [],
};

const favoriteReducer = (state, action) => {
  const isObjectExist = state.favorites.some(
    (obj) => obj.id === action.payload.id
  );

  if (isObjectExist) action.type = null;

  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

const Characters = () => {
  const favoritesRef = useRef(null);
  const [search, setSearch] = useState("");
  const [hideStatus, setHideStatus] = useState("Ocultar favoritos");
  const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/")
      .then((res) => res.json())
      .then((data) => setCharacters(data.results));
  }, []);

  const handleClickAddToFavorite = (characterSelected) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: characterSelected });
  };

  const handleHideShowFavorited = () => {
    if (hideStatus === "Ocultar favoritos") {
      favoritesRef.current.style.display = "none";
      setHideStatus("Mostrar favoritos");
    } else {
      favoritesRef.current.style.display = "block";
      setHideStatus("Ocultar favoritos");
    }
  };

  // const filteredUserd = characters.filter(c=>{
  //     return c.name.toLowerCase().includes(search.toLowerCase());
  // })

  const filteredUserd = useMemo(() => {
    let users = characters.filter((c) => {
      return c.name.toLowerCase().includes(search.toLowerCase());
    });
    console.log("UseMemo");
    return users;
  }, [search, characters]);

  return (
    <div className="characters">
      <div className="searchComponent">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <p>{search}</p>
        <button onClick={handleHideShowFavorited}>{hideStatus}</button>
      </div>

      <div className="container">
        <FavoritesCharacters
          favorites={favorites}
          favoritesRef={favoritesRef}
        />

        <div className="">
          <h1>TODO</h1>
          {filteredUserd?.map((c) => (
            <div className="item" key={c.id}>
              <p>{c.name}</p>
              <button onClick={() => handleClickAddToFavorite(c)}>
                Agregar a favoritos
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Characters };
