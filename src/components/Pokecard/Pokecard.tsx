import * as React from "react";
import "./Pokecard.css";

interface PokecardProps {
  spriteUrl?: string;
  name: string;
  onPokemonClick: (pokemonName: string) => void;
}
const Pokecard = ({ spriteUrl, name, onPokemonClick }: PokecardProps) => {
  return (
    <div
      onClick={(e) => {
        onPokemonClick(name);
      }}
      className="pokecard"
    >
      {/* TODO: image */}
      <img src={spriteUrl} alt="pokemon" className="pokemon-sprite" />
      <p>{name}</p>
    </div>
  );
};
export default Pokecard;
