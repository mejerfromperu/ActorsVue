const app = Vue.createApp({
    data() {
        return {
            actors:[],
            
            newName: '',
            newId: null,
            newBirthday: null,
            IdDelete: null
        }


    },
    mounted() {
        this.Get()
    },

    methods: { 
        Get() {
            axios.get('http://localhost:5154/Api/Actors')
            .then(response => {this.actors = response.data})
            
            
        },

        addActor() {
            const newActor = {
                name: this.newName,
                birthDay: this.newBirthday,
                id: this.newId
            };
            // this.actors.push(newActor);
            axios.post('http://localhost:5154/Api/Actors', newActor)
                .then(response => {
                    
                    this.actors.push(response.data);
                    
                })
            this.newName = "";
            this.newBirthday = null;
            this.newId = null;

        },

        deleteActor() {
            const deletionId = {
                id: this.IdDelete
            }

            axios.Delete('http://localhost:5154/Api/Actors', deletionId)
            .then(response => {
                this.IdDelete.push(response.data)
            })
            this.IdDelete = null;
        }

        
    },
    computed: {
        myComputed() { 
            return ''; 
        }
    }
});

app.mount("#app")
