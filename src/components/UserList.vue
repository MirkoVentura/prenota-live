<template>
    <div class="row">
        <div class="col-md-9">
            <table class="table table-striped">
                <thead>
                    <tr style="color:#fff">
                        <th>Surname</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in Users" :key="user.key" style="color:red">
                        <td>{{ user.surname }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                       
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-md-3">
            <div>
                <span>Per segnalare eventuali errori o richiedere una correzione al proprio inserimento rivlgersi a <a style="color:green" href="mailto:cc.potenza@camarillaitalia.it">CC Potenza </a>  </span> 
            </div>
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
            this.cronaca = this.$route.params.cronaca + '-10'
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
            
        }
    }
</script>

<style>
    .btn-primary {
        margin-right: 12px;
    }
</style>