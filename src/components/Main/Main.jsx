import React from "react";
import "./Main.css";
import { mockLyrics } from "../../data/mockLyrics";
import ItemCard from "../ItemCard/ItemCard";

function Main({ likedSongs, onLike, handleCardClick }) {
  return (
    <main className="main">
      <h1 className="main__title">Main page headline goes here with words</h1>
      <h2 className="main__subtitle">
        Subtitle with instructions will go here with user guidance
      </h2>
      <div className="main__songs-list">
        {mockLyrics.map((song) => (
          <ItemCard
            key={song.id}
            title={song.title}
            lyrics={song.verses[0].text} // Display first verse as preview
            isLiked={!!likedSongs[song.id]}
            onLike={() => onLike(song.id)}
            onCardClick={() => handleCardClick(song)}
          />
        ))}
      </div>
    </main>
  );
}

export default Main;
