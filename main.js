const pokeContainer = document.querySelector("#pokeContainer");
const form = document.querySelector('.buscarPoke');
const buscar = document.querySelector('.buscar');
const enviar = document.querySelector('.enviar');
const pokemonTotal = 150;
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

const mainTypes = Object.keys(colors);
let pokemonsData = [];

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonTotal; i++) {
    const data = await getPokemon(i);
    pokemonsData.push(data);
    criarPokemonCard(data);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const criarPokemonCard = (poke) => {
  const card = document.createElement('div');
  card.classList.add("pokemon");

  const name = poke.name[0].toUpperCase() + poke.name.slice(1);
  const id = poke.id.toString().padStart(3, '0');

  const pokeTipos = poke.types.map(type => type.type.name);
  const type = mainTypes.find(type => pokeTipos.indexOf(type) > -1);
  const color = colors[type];

  card.style.backgroundColor = color;

  const pokemonInnerHTML = `
    <div class="imagemContainer">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
    </div>
    <div class="info">
      <span class="number">#${id}</span>
      <h3 class="name">${name}</h3>
      <small class="type">Tipo: <span>${type}</span></small>
    </div>`;

  card.innerHTML = pokemonInnerHTML;
  pokeContainer.appendChild(card);
};

const searchPokemons = (searchValue) => {
  const searchRegex = new RegExp(`^${searchValue}`, 'i');
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

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchValue = buscar.value.trim();
  searchPokemons(searchValue);
});

fetchPokemons();
