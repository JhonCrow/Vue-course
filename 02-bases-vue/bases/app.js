const app = Vue.createApp({
/*     template: `
` */
/* options api
methods: {},
watch:{},

composition api
setup(){} */

data() {
        return {
           quote: "Im Batman",
           author: "Bruce wAYNE"
        }
    },
    methods:{
        changeQuote(){
            console.log("hola mundo")
            this.author = "Camilo Cuervo"

            this.capitalize()
        },
        capitalize(){
            this.quote = this.quote.toUpperCase()
        }
    }
})

app.mount("#myApp")