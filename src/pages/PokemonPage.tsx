import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Pokemon } from '../types/pokemon';
import { fetchPokemonById, fetchSimilarPokemon, getTypeColor } from '../utils/pokemonUtils';
import { PokemonCard } from '../components/PokemonCard';

export function PokemonPage() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [similarPokemon, setSimilarPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const loadPokemon = async () => {
      if (id) {
        const data = await fetchPokemonById(id);
        setPokemon(data);
        
        const types = data.types.map((t: { type: { name: string } }) => t.type.name);
        const similar = await fetchSimilarPokemon(types);
        setSimilarPokemon(similar.filter(p => p.id !== data.id));
      }
    };
    loadPokemon();
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div 
      className="min-h-screen p-8 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&q=80")',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-white hover:text-gray-200 mb-8">
          <ArrowLeft />
          Back to Pokédex
        </Link>

        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-full max-w-lg mx-auto"
              />
            </div>

            <div>
              <p className="text-gray-500 text-xl">#{String(pokemon.id).padStart(3, '0')}</p>
              <h1 className="text-4xl font-bold capitalize mb-4">{pokemon.name}</h1>

              <div className="flex gap-2 mb-6">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`px-4 py-1 rounded-full text-white text-lg ${getTypeColor(
                      type.type.name
                    )}`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-500">Height</p>
                  <p className="text-xl font-semibold">{pokemon.height / 10}m</p>
                </div>
                <div>
                  <p className="text-gray-500">Weight</p>
                  <p className="text-xl font-semibold">{pokemon.weight / 10}kg</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Stats</h2>
                <div className="space-y-4">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name}>
                      <div className="flex justify-between mb-1">
                        <span className="capitalize">{stat.stat.name.replace('-', ' ')}</span>
                        <span>{stat.base_stat}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full"
                          style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {similarPokemon.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Similar Pokemon</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {similarPokemon.map((p) => (
                <PokemonCard key={p.id} pokemon={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}