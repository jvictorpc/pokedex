const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input__search');


/**
 * função que busca pokemons na api
 */

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    /**
     * fetch é assincrono, e o await  faz com que o js não execute as proximas linhas antes de receber a resposta do fetch, é preciso informar que é uma função assíncrona
    */
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "loading..."
    const data = await fetchPokemon(pokemon);


    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    }else {
        pokemonName.innerHTML = 'Not Found :c';
        pokemonNumber.innerHTML = '';
    }

    inputSearch.value = '';
}


//o evento que vai ser escutado será o de submit,aciona ao apertar o enter
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(inputSearch.value);
});