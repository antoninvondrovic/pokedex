window.onload = async () => {
    const theMiddle = document.getElementById('middle');
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('keypress', function(e) {if(e.key === 'Enter') doPokestuff();});
    document.getElementById('searchBtn').addEventListener('click', doPokestuff);
    const b = await fetch('https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/pokedex.json').then((response) => response.json());

    let pokedexList = document.getElementById('pokedexList');
    class Pokemon {
        constructor(name, description, hires, id, nextev) {
            this.name = name;
            this.description = description;
            this.hires = hires;
            this.id = id;
            this.nextev = nextev;
            
        }
    }
    
    doPokestuff(); // Pulls up the pokemons on page load (Shows from 001 to 008)

    function doPokestuff() {
        pokedexList.remove();
        const poke = document.createElement('div');
        poke.classList.add('pokedexList');
        poke.id = 'pokedexList';
        theMiddle.appendChild(poke);
        
        const pokemons = [];
        const pokeAmount = 16;

        let howmany = 0;
        for (let i = 0; i < b.length; i++) {
            const e = b[i];
            if (e.name.english.toLowerCase().includes(searchBar.value.toLowerCase()) || e.id.toString().startsWith(searchBar.value) || e.id.toString().padStart(3, '0').startsWith(searchBar.value) && howmany < pokeAmount) {
                pokemons[howmany] = new Pokemon(b[i].name.english, b[i].description, b[i].hires, b[i].id, b[i].evolution.next);
                howmany++;
            }
        }

        for (let i = 0; i < pokeAmount; i++) {
            const e = pokemons[i];
            console.log(e);
            
            const pEntry = document.createElement('div');
            pEntry.classList.add('pEntry');
    
            const image = document.createElement('img');
            image.classList.add('pImage');
            image.src = e.hires;
            pEntry.appendChild(image);
    
            const name = document.createElement('div');
            name.classList.add('pEntryName');
            name.innerText = `${e.name} - ${e.id.toString().padStart(3, '0')}`;
            pEntry.appendChild(name);

            const nextEv = document.createElement('div');
            nextEv.classList.add('pNextEv');
            if(e.nextev) {
                const nev = e.nextev.toString().split(',')[0] - 1;
                nextEv.innerHTML = `Evolves to ${b[nev].name.english}`;
            }
            else {
                nextEv.innerHTML = 'Final Evolution';
            }
            
            pEntry.appendChild(nextEv);
    
            const desc = document.createElement('div');
            desc.classList.add('pEntryDesc');
            desc.innerText = e.description;
            pEntry.appendChild(desc);
    
            pokedexList = document.getElementById('pokedexList');
            pokedexList.appendChild(pEntry);
        }
    }
};