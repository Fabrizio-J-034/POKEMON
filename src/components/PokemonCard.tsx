import React from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../types/pokemon';
import { getTypeColor } from '../utils/pokemonUtils';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className="transform hover:scale-105 transition-transform">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="w-48 h-48 mx-auto"
        />
        <div className="mt-4">
          <p className="text-gray-500 text-sm">#{String(pokemon.id).padStart(3, '0')}</p>
          <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
          <div className="flex gap-2 mt-2">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className={`px-3 py-1 rounded-full text-white text-sm ${getTypeColor(type.type.name)}`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}