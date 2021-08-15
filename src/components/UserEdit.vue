<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Modifica dati</h3>
            <form @submit.prevent="onUpdateForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="user.name" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="user.email" required>
                </div>


                <div class="form-group">
                    <label>Codice segreto Modifica</label>
                    <input type="text" class="form-control" v-model="secret.code" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Conferma</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { db } from '../firebaseDb';

    export default {
        data() {
            return {
                user: {
                },
                secret:{
                    code : ''
                },
                cronaca:''
            }
        },
        created() {
            this.cronaca = this.$route.params.cronaca + '-08';
            let dbRef = db.collection(this.cronaca).doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.user = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {


                event.preventDefault()

                if(this.secret.code == "CCsuperPower") {
                    db.collection(this.cronaca).doc(this.$route.params.id)
                .update(this.user).then(() => {
                    console.log("Ok Aggiornato!");
                    this.$router.push('/admin/'+this.cronaca)
                }).catch((error) => {
                    console.log(error);
                });
                }else{
                    alert("C'hai provato, non hai i superpoteri mi spiace");
                }

                
            }
        }
    }
</script>