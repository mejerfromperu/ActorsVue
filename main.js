const app = Vue.createApp({
    data() {
        return {
            actors:[]
            // actors: {
            //     name: '',
            //     id: '',
            //     birthday: '',
            // },
            // newName: null,
            // newId: null,
            // newBirthday: null
        }


    },
    mounted() {
        this.myMethod()
    },

    methods: { 
        myMethod() {
            axios.get('http://localhost:5154/Api/Actors').then(response => {this.actors = response.data})
        },

        
    },
    computed: {
        myComputed() { 
            return ''; 
        }
    }
});

app.mount("#app")
