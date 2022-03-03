import * as React from "react";
import { PokemonSchema } from "../../types/PokemonSchema";
import PokeList from "../PokeList/PokeList";
import PokeSearch from "../PokeSearch/PokeSearch";
import SearchBox from "../SearchBox/SearchBox";
import "./Pokedex.css";

interface PokedexProps {
  searchedPokemons: PokemonSchema[];
  onInputChange: (inputValue: string) => void;
  selectedPokemon: PokemonSchema | undefined;
  onPokemonClick: (pokemonName: string) => void;
}

const Pokedex = ({
  selectedPokemon,
  onPokemonClick,
  searchedPokemons,
  onInputChange,
}: PokedexProps) => {
  return (
    <div className="pokedex-container">
      <div className="pokelist-container">
        <SearchBox onInputChange={onInputChange} />
        <PokeList
          onPokemonClick={onPokemonClick}
          searchedPokemons={searchedPokemons}
        />
      </div>
      <div className="pokesearch-result-container">
        <PokeSearch selectedPokemon={selectedPokemon} />
      </div>
    </div>
  );
};
export default Pokedex;
