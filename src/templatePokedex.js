import React, { useEffect, useState } from "react";

const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
};

const classList = {
  "*": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    fontFamily: "Roboto, sans-serif",
  },
  root: {
    backgroundRepeat: "no-repeat",
    background: "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(193,39,105,1) 0%, rgba(253,187,45,1) 97%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    fontFamily: "Roboto, sans-serif",
  },
  imagem: {
    width: "100%",
  },
  imagemLogo: {
    float: "right"
  },
  buscarPoke: {
    marginLeft: "25vw",
  },
  buscar: {
    height: "4vh",
    width: "8vw",
  },
  enviar: {
    height: "4vh",
    width: "6vw",
  },
  pokeContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "0 auto",
    maxWidth: "1200px",
  },
  pokemon: {
    backgroundColor: "#d4d3dd",
    borderRadius: 10,
    boxShadow: "0 3px 15px rgba(100, 100, 100, 0.5)",
    margin: 10,
    padding: 20,
    textAlign: "center",
  },
  imagemContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: "50%",
    height: 120,
    width: 120,
    textAlign: "center",
  },
  info: {
    marginTop: 20,
  },
  number: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: "2px 13px",
    borderRadius: 10,
    fontSize: "0.8rem",
  },
  name: {
    margin: "15px 0 7px",
    letterSpacing: 1.5,
  },
  infoPoke: {
    backgroundColor: "white",
    width: "19.5vw",
    textAlign: "center",
    height: "2.5vh",
    borderRadius: 10,
    border: "1px solid",
  },
  type: {
    display: "block",
    margin: "10px 0",
    fontSize: "0.9rem",
  }
};

const TemplatePokedex = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();

        if (data.results) {
          const pokemonPromises = data.results.map(async result => {
            const response = await fetch(result.url);
            return response.json();
          });

          const pokemonDataList = await Promise.all(pokemonPromises);
          setPokemons(pokemonDataList);
        }
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    };

    fetchPokemons();
  }, []);

  const searchPokemons = (searchValue) => {
    const searchRegex = new RegExp(`^#${searchValue}`, 'i');
    const pokemonCards = document.querySelectorAll('.pokemon');

    pokemonCards.forEach(card => {
      const numberElement = card.querySelector('.number');
      const number = numberElement.textContent;
      if (searchRegex.test(number)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.buscar.value.trim();
    searchPokemons(searchValue);
  };

  return (
    <div id="root" style={classList.root}>
      <nav>
        <form className="buscarPoke" style={classList.buscarPoke} onSubmit={handleFormSubmit}>
          <input type="text" className="buscar" name="buscar" placeholder="N: pokemon" style={classList.buscar} />
          <button type="submit" className="enviar" style={classList.enviar}>Pesquisar</button>
        </form>
      </nav>
      <div className="pokeContainer" style={classList.pokeContainer}>
        {pokemons.map(pokemon => {
          const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
          const id = pokemon.id.toString().padStart(3, '0');

          const pokeTypes = pokemon.types.map(type => type.type.name);
          const type = pokeTypes.find(type => Object.keys(colors).includes(type));
          const color = colors[type] || '#fff'; // Default to white if color not found

          return (
            <div key={pokemon.id} className="pokemon" style={{ ...classList.pokemon, backgroundColor: color }}>
              <div className="imagemContainer" style={classList.imagemContainer}>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={name} />
              </div>
              <div className="info" style={classList.info}>
                <span className="number" style={classList.number}>#{id}</span>
                <h3 className="name" style={classList.name}>{name}</h3>
                {pokeTypes.map((type, index) => (
                  <small key={index} className="type" style={classList.type}>
                    Tipo: <span>{type}</span>
                  </small>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TemplatePokedex;
