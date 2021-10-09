<template>
    <div class="row">
        <div class="col-md-12">
            <p>Partecipanti iscritti per la sessione di {{cronaca}} </p>
            <table class="table table-striped" style="color:#fff">
                <thead>
                    <tr>
                        <th>Surname</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in Users" :key="user.key" style="color:red">
                        <td>{{ user.surname }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <router-link :to="{name: 'edit', params: { id: user.key , cronaca: cronaca}}" class="btn btn-primary">Edit
                            </router-link>
                            <button @click.prevent="deleteUser(user.key)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { db } from '../firebaseDb';
    
    export default {
        data() {
            return {
                Users: [],
                cronaca: ""
            }
        },
        created() {
            this.cronaca = this.$route.params.cronaca+'-10'
            
            db.collection(this.cronaca).onSnapshot((snapshotChange) => {
                this.Users = [];
                snapshotChange.forEach((doc) => {
                    this.Users.push({
                        key: doc.id,
                        name: doc.data().name,
                        email: doc.data().email,
                        surname: doc.data().surname
                    })
                });
            })
        },
        methods: {
            deleteUser(id){
              if (window.confirm("Do you really want to delete?")) {
                db.collection(this.cronaca).doc(id).delete().then(() => {
                    console.log("Document deleted!");
                })
                .catch((error) => {
                    console.error(error);
                })
              }
            }
        }
    }
</script>

<style>
    .btn-primary {
        margin-right: 12px;
    }
</style>