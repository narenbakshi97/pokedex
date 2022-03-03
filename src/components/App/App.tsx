import * as React from "react";
import Pokedex from "../Pokedex/Pokedex";
import "./App.css";
import { pokemonData } from "../../data/pokemonData";
import {
  PokemonSchema,
  PokemonSpritesSchema,
  UnpatchedPokemonSchema,
} from "../../types/PokemonSchema";

interface AppState {
  searchField: string;
  allPokemons: PokemonSchema[];
  searchedPokemons: PokemonSchema[];
  selectedPokemon: PokemonSchema | undefined;
}

class App extends React.Component<any, AppState> {
  state = {
    searchField: "",
    allPokemons: [],
    searchedPokemons: [],
    selectedPokemon: undefined,
  };

  patchPokemonData = (pokemons: UnpatchedPokemonSchema[]) => {
    const patchedPokemons = pokemons.map((pokemon) => {
      let parsedSprites: PokemonSpritesSchema = {
        normal: undefined,
        animated: undefined,
      };

      try {
        parsedSprites = pokemon.sprites && JSON.parse(pokemon.sprites);
      } catch (exception) {
        console.log("Exception occured while parsing the sprites: ", exception);
      }

      const patchedPokemon: PokemonSchema = {
        ...pokemon,
        sprites: parsedSprites,
      };

      return patchedPokemon;
    });

    return patchedPokemons;
  };

  componentDidMount() {
    const patchedPokemons: PokemonSchema[] = this.patchPokemonData(pokemonData);

    this.setState({
      allPokemons: patchedPokemons,
      searchedPokemons: patchedPokemons,
    });
  }

  handleInputChange = (inputValue: string) => {
    const { allPokemons } = this.state;

    const searchedPokemons = allPokemons.filter((pokemon: PokemonSchema) => {
      return (
        pokemon.name &&
        pokemon.name.toLowerCase().includes(inputValue.toLowerCase())
      );
    });

    this.setState({
      searchField: inputValue,
      searchedPokemons,
    });
  };

  handleClick = (pokemonName: string) => {
    const { allPokemons } = this.state;

    const selectedPokemon = allPokemons.find(
      (pokemon: PokemonSchema) => pokemon.name === pokemonName
    );

    this.setState({ selectedPokemon });
  };

  render() {
    return (
      <div className="App">
        <h1>Pokedex</h1>
        <Pokedex
          searchedPokemons={this.state.searchedPokemons}
          onInputChange={this.handleInputChange}
          selectedPokemon={this.state.selectedPokemon}
          onPokemonClick={this.handleClick}
        />
      </div>
    );
  }
}
export default App;
