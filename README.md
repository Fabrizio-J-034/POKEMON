# Pokémon Explorer

A comprehensive Pokémon exploration application featuring detailed information about Pokémon, their stats, and similar Pokémon suggestions.

## Features

### Home Page
- List of Pokémon with ID, image, name, and type
- Search functionality by Pokémon name
- Filter Pokémon by type
- Sort Pokémon by name
- Pagination (10 Pokémon per page)
- Click-through to detailed Pokémon pages

### Pokémon Detail Page
- Detailed Pokémon information (ID, image, name, type, height, weight)
- Comprehensive stats (HP, Attack, Defense, Special Attack, Special Defense)
- Similar Pokémon suggestions based on type matching

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons

### Backend/Database
- Supabase for database and API
- PostgreSQL (provided by Supabase)

## Prerequisites

- Node.js 18+
- NPM or Yarn package manager
- Supabase account (free tier)
- Modern web browser
- Code editor (VS Code recommended)

## Migration & Seed Database steps

### Schema Creation

```sql
/*
  # Pokemon Database Schema
  
  1. New Tables
    - `pokemon`
      - `id` (integer, primary key)
      - `name` (text, unique)
      - `image_url` (text)
      - `height` (integer)
      - `weight` (integer)
      - `types` (text[])
      - `created_at` (timestamp)
    
    - `pokemon_stats`
      - `id` (uuid, primary key)
      - `pokemon_id` (integer, foreign key)
      - `hp` (integer)
      - `attack` (integer)
      - `defense` (integer)
      - `special_attack` (integer)
      - `special_defense` (integer)
      - `speed` (integer)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
*/

-- Create pokemon table
CREATE TABLE IF NOT EXISTS pokemon (
  id integer PRIMARY KEY,
  name text UNIQUE NOT NULL,
  image_url text NOT NULL,
  height integer NOT NULL,
  weight integer NOT NULL,
  types text[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create pokemon stats table
CREATE TABLE IF NOT EXISTS pokemon_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pokemon_id integer REFERENCES pokemon(id) ON DELETE CASCADE,
  hp integer NOT NULL,
  attack integer NOT NULL,
  defense integer NOT NULL,
  special_attack integer NOT NULL,
  special_defense integer NOT NULL,
  speed integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE pokemon ENABLE ROW LEVEL SECURITY;
ALTER TABLE pokemon_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access for pokemon"
  ON pokemon
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access for pokemon stats"
  ON pokemon_stats
  FOR SELECT
  TO public
  USING (true);
```

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```
## Live Demo

Check out the live demo: [Pokémon Explorer](https://capable-smakager-c37faf.netlify.app)

