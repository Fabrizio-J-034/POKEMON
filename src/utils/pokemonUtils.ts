const BASE_URL = 'https://pokeapi.co/api/v2';

export function getTypeColor(type: string): string {
  const colors: { [key: string]: string } = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-500',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };
  return colors[type] || 'bg-gray-400';
}

export async function fetchPokemonList(offset: number, limit: number) {
  const { results } = await getPokemonList(offset, limit);
  
  const pokemonDetails = await Promise.all(
    results.map(async (pokemon: { url: string }) => {
      const res = await fetch(pokemon.url);
      return res.json();
    })
  );
  
  return pokemonDetails;
}

export async function fetchPokemonById(id: string) {
  return getPokemon(id);
}

export async function fetchSimilarPokemon(types: string[]) {
  const responses = await Promise.all(
    types.map(type => getPokemonByType(type))
  );

  const pokemonByType = responses.map(data => 
    data.pokemon.map((p: { pokemon: { name: string; url: string } }) => p.pokemon)
  );

  const commonPokemon = pokemonByType.reduce((acc, curr) => 
    acc.filter(pokemon => 
      curr.some(p => p.name === pokemon.name)
    )
  );

  const limitedPokemon = commonPokemon.slice(0, 5);
  
  const pokemonDetails = await Promise.all(
    limitedPokemon.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return res.json();
    })
  );

  return pokemonDetails;
}

// New API functions
export async function getPokemonList(offset = 0, limit = 10) {
  const response = await fetch(
    `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  const data = await response.json();
  return data;
}

export async function getPokemon(id: string | number) {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  const data = await response.json();
  return data;
}

export async function getPokemonByType(type: string) {
  const response = await fetch(`${BASE_URL}/type/${type}`);
  const data = await response.json();
  return data;
}