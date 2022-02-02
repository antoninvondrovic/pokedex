window.onload = async () => {
    const pokedexList = document.getElementById('pokedexList');
    const searchBar = document.getElementById('searchBar');
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener(); //! setup event listener
    const b = await fetch('https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/pokedex.json').then((response) => response.json());

    class Pokemon {
        constructor(name, description, hires) {
            this.name = name;
            this.description = description;
            this.hires = hires;
        }
    }

    const pokemons = [];

    for (let i = 0; i < 8; i++) {
        const e = b[i];
        pokemons[i] = new Pokemon(b[i].name.english, b[i].description, b[i].hires);
    }

    console.log(pokemons);

    for (let i = 0; i < pokemons.length; i++) {
        const e = pokemons[i];
        
        const tEntry = document.createElement('div');
        tEntry.classList.add('tEntry');

        const image = document.createElement('img');
        image.classList.add('tImage');
        image.src = `${e.hires}`;
        tEntry.appendChild(image);

        const name = document.createElement('div');
        name.classList.add('tEntryName');
        name.innerText = e.name;
        tEntry.appendChild(name);

        const desc = document.createElement('div');
        desc.classList.add('tEntryDesc');
        desc.innerText = e.description;
        tEntry.appendChild(desc);

        pokedexList.appendChild(tEntry);
    }

};