window.onload = async () => {
    const theMiddle = document.getElementById('middle');
    const searchBar = document.getElementById('searchBar');
    document.getElementById('searchBtn').addEventListener('click', doPokestuff);
    const b = await fetch('https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/pokedex.json').then((response) => response.json());

    let pokedexList = document.getElementById('pokedexList');
    class Pokemon {
        constructor(name, description, hires) {
            this.name = name;
            this.description = description;
            this.hires = hires;
        }
    }
    
    doPokestuff();

    function doPokestuff() {
        pokedexList.remove();
        const poke = document.createElement('div');
        poke.classList.add('pokedexList');
        poke.id = 'pokedexList';
        theMiddle.appendChild(poke);
        
        const pokemons = [];

        let howmany = 0;
        for (let i = 0; i < b.length; i++) {
            const e = b[i];
            if (e.name.english.toLowerCase().includes(searchBar.value.toLowerCase()) && howmany < 8) {
                pokemons[howmany] = new Pokemon(b[i].name.english, b[i].description, b[i].hires);
                howmany++;
            }
        }

        // console.log(pokemons);
        for (let i = 0; i < 8; i++) {
            const e = pokemons[i];
            console.log(e);
            
            const tEntry = document.createElement('div');
            tEntry.classList.add('tEntry');
    
            const image = document.createElement('img');
            image.classList.add('tImage');
            image.src = e.hires;
            tEntry.appendChild(image);
    
            const name = document.createElement('div');
            name.classList.add('tEntryName');
            name.innerText = e.name;
            tEntry.appendChild(name);
    
            const desc = document.createElement('div');
            desc.classList.add('tEntryDesc');
            desc.innerText = e.description;
            tEntry.appendChild(desc);
    
            pokedexList = document.getElementById('pokedexList');
            pokedexList.appendChild(tEntry);
        }
    }
};