import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { PokemonCard } from '../components/PokemonCard';
import { fetchPokemonList, getPokemonList } from '../utils/pokemonUtils';
import { Pokemon } from '../types/pokemon';

export function HomePage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortByName, setSortByName] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pokemonPerPage = 10;

  useEffect(() => {
    const loadPokemon = async () => {
      // Get total count first
      const { count } = await getPokemonList(0, 1);
      setTotalPages(Math.ceil(count / pokemonPerPage));

      const data = await fetchPokemonList((currentPage - 1) * pokemonPerPage, pokemonPerPage);
      setPokemon(data);
      setFilteredPokemon(data);
    };
    loadPokemon();
  }, [currentPage]);

  useEffect(() => {
    let filtered = [...pokemon];

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter(p =>
        p.types.some(t => t.type.name === selectedType)
      );
    }

    if (sortByName) {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, sortByName, pokemon]);

  const types = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic',
    'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];

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
        <h1 className="text-4xl font-bold text-center mb-8 text-white">Pokédex</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search Pokemon..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-3 text-gray-400" />
              <select
                className="pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-black text-white hover:bg-gray-800"
              onClick={() => setSortByName(!sortByName)}
            >
              <ArrowUpDown className="text-white" />
              Sort by Name
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPokemon.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>
          <span className="text-white font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}