const app = Vue.createApp({
    data() {
        return {
            actors:[],
            
            newName: '',
            newId: null,
            newBirthday: null
        }


    },
    mounted() {
        this.myMethod()
    },

    methods: { 
        myMethod() {
            axios.get('http://localhost:5154/Api/Actors').then(response => {this.actors = response.data})
            
            axios.post('http://localhost:5154/Api/Actors', newActor)
                .then(response => {
                    
                    this.actors.push(response.data);
                    
                })
        },

        addActor() {
            const newActor = {
                name: this.newName,
                birthYear: this.newBirthday,
                id: this.newId
            };
            this.actors.push(newActor);

            this.newName = "";
            this.newBirthday = null;

        }

        
    },
    computed: {
        myComputed() { 
            return ''; 
        }
    }
});

app.mount("#app")
