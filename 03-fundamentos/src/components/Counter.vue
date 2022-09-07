<template>
    <h1>{{ customTitle }}</h1>
    <p data-tstid="counter">{{ counter}}</p>
    <p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>
    <div class="buton-container">
        <button v-on:click="increase">+1</button>
        <button v-on:click="decrease">-1</button>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        start: {
            type: Number,
            default: 100,
            validator(value){
                return value >= 0
            }
        },
    },

    data() {
        return {
            counter: this.start
        }
    },
    methods: {
        getsquareValue() {
            return this.counter * this.counter
        },
        increase() {
            this.counter++
        },
        decrease() {
            this.counter--
        }
    },
    computed: {
        squareCounter() {
            return this.counter * this.counter
        },
        customTitle() {
            return this.title || "Counter!"
        }
    }
}
</script>

<style>
button {
    background-color: #64BB87;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    margin: 0 5px;
    padding: 5px 15px;
    transition: 0.3s ease-in-out;
}

button:hover {
    background-color: #5aa67b;
    transition: 03.s ease-in-out
}
</style>