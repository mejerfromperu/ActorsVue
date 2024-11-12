const baseurl = 'https://actorone.azurewebsites.net/api/actor'

const app = Vue.createApp({
    data() {
        return {
            actors:[],
            sortedactors:[],
            
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
            errormsg: '',
        }

    },
    mounted() {
        this.Get()
    },

    methods: { 
        Get() {
            axios.get(baseurl)
            .then(response => {this.actors = response.data})
            .catch(error => {
                console.error("Error getting the data:", error);
            });
            
            
        },

        Update() {
            const UpdateActor = {
                name: this.UpdatenewName,
                birthDay: this.UpdatenewBirthday,
                id: this.updateById
            };
            axios.put(`https://actorone.azurewebsites.net/api/actor/${this.updateById}`, UpdateActor)
                .then(response => {
                    const index = this.actors.findIndex(actor => actor.id === response.data.id);
                if (index !== -1) {
                    this.actors.splice(index, 1, response.data);  
                    this.updateById = null,
                    this.UpdatenewName = '',
                    this.UpdatenewBirthday = null


                .catch(error => {
                    console.error("error trying to update!", error)
                })    
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
            axios.post(baseurl, newActor)
                .then(response => {
                    
                    this.actors.push(response.data);
                    
                })
                .catch(error => {
                    console.error("error trying to add new object")
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
                console.log("succes actor deleted")
                this.IdDelete = null
                
                
            })
            .catch(error => {
                console.error("Error deleting actor!!", error);
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
                    console.error("Error sorry: invalid id ", error); 
                    this.errormsg = "Sorrry invalid id";
                });
        },

        Sort() {
            axios.get(`https://actorone.azurewebsites.net/api/actor/sort/`)
                .then(response => {this.sortedactors = response.data
                    
                    console.log("success:", response.data)
                
                    
                })
                .catch (error => {
                    console.log(error.response.data)
                    console.log("fail")
                })
        },

        UnSort() {
            axios.get(baseurl)
            .then(response => { 
                this.actors = response.data;
                this.sortedactors = [];
            })
            .catch(error => {
                console.error("Error getting the data:", error);
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
