<template>
    <h1 v-if="!pokemon">Espere por favor...</h1>
    <div v-else>
        <h1>¿Cual es ese pokemon?</h1>

        <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
        <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer" />


        <div v-if="showAnswer">
            <h2 class="fade-in">{{ message }}</h2>
            <button @click="newGame">Nuevo Juego</button>
        </div>

    </div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture.vue';
import PokemonOptions from '@/components/PokemonOptions.vue';
import getPokemonOptions from '@/helpers/getPokemonOptions';

export default {
    components: { PokemonOptions, PokemonPicture },
    data() {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: '',
            message: '',
        }
    },
    methods: {
        async mixPokemonArray() {
            this.pokemonArr = await getPokemonOptions()
            const rndInt = Math.floor(Math.random() * 4)
            this.pokemon = this.pokemonArr[rndInt]
        },
        checkAnswer(selectedId) {
            this.showPokemon = true
            this.showAnswer = true
            if (selectedId === this.pokemonId) {
                this.message = `Correcto, era ${this.pokemon.name}`
            } else {
                this.message = `Oops, era ${this.pokemon.name}`
            }
        },
        newGame() {
            this.showAnswer = false,
                this.showPokemon = false,
                this.pokemonArr = [],
                this.pokemon = null
            this.mixPokemonArray()
        }
    },
    mounted() {
        this.mixPokemonArray()
    }
}
</script>

