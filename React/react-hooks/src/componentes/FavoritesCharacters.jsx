import React from 'react'

const FavoritesCharacters = ({favorites, favoritesRef}) =>{
    console.log("Render FavoritesCharacters");
    console.table(favorites.favorites);
    return (
        <div ref={favoritesRef}>
          <h1>FAVORITES</h1>
          <ul>
            {favorites?.favorites?.map((f) => (
              <li key={f.id}>{f.name}</li>
            ))}
          </ul>
        </div>
    )
}

export {FavoritesCharacters}