const app = Vue.createApp({
    data() {
        return {
            actors:[],
            
            newName: '',
            newId: null,
            newBirthday: null,
            IdDelete: null,
            api: 'https://actorone.azurewebsites.net/api/actor',
            getId: null,
            actor: null,
            updateById: null,
            UpdatenewName: '',
            UpdatenewBirthday: null,
            UpdatenewId: null,
        }

    },
    mounted() {
        this.Get()
    },

    methods: { 
        Get() {
            axios.get('https://actorone.azurewebsites.net/api/actor')
            .then(response => {this.actors = response.data})
            
            
        },

        Update() {
            const UpdateActor = {
                name: this.UpdatenewName,
                birthDay: this.UpdatenewBirthday,
                id: this.updateById
            };
            axios.put(`https://actorone.azurewebsites.net/api/actor/${this.updateById}`, UpdateActor)
                .then(response => {
                    this.actors.push(response.data)
                    const index = this.actors.findIndex(actor => actor.id === response.data.id);
                if (index !== -1) {
                    this.actors.splice(index, 1, response.data);  
                    
                } else {
                    this.actors.push(response.data);  // If actor not found, add to the list
                }
                    
                })


        },

        addActor() {
            const newActor = {
                name: this.newName,
                birthDay: this.newBirthday,
                id: this.newId
            };
            // this.actors.push(newActor);
            axios.post('https://actorone.azurewebsites.net/api/actor/', newActor)
                .then(response => {
                    
                    this.actors.push(response.data);
                    
                })
            this.newName = "";
            this.newBirthday = null;
            this.newId = null;

        },

        deleteActor() {
            const deletionId = this.IdDelete
            console.log("id set")
            axios.delete('https://actorone.azurewebsites.net/api/actor/' + deletionId)
            .then(response => {
                console.log("succes")
                this.IdDelete = null
                
                
            })
            .catch(error => {
                console.error("Error deleting actor:", error);
            });
            
        },

        GetById() {
            const getbyid = this.getId;
            
            if (!getbyid) {
                console.error("ID is required");
                return;
            }
        
            axios.get(`https://actorone.azurewebsites.net/api/actor/${getbyid}`)
                .then(response => {
                    console.log("Success:", response.data); 
                    this.getId = null; 
                    this.actor = response.data;
                })
                .catch(error => {
                    console.error("Error fetching actor:", error); // Error handling
                });
        }
        

        
    },
    computed: {
        myComputed() { 
            return ''; 
        }
    }
});

app.mount("#app")
