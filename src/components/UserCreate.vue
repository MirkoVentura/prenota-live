<template>
    <div class="row justify-content-center" >
        <div class="col-md-5">
            <h3 class="text-center">Prenota ora</h3>
            <p>Inserisci i tuoi dati per segnalare la tua presenza ad uno dei due live. </p>
            <form @submit.prevent="onFormSubmit">
               <select v-model="selected">
                   <option disabled value="">Scegli la continuty</option>
                   <option>V5 - 15 Luglio</option>
                   <option>Mage - 23 Luglio</option>
                </select>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="user.name" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="user.email" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Salva</button>
                </div>
                
            </form>
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
                Mage: [],
                Vampire: [],
                user: {
                   name: '',
                   email: '',
                },
                selected: '',
                dbName: '',
                actualCount: 0
            }
        },
        created() {
            db.collection('mage').onSnapshot((snapshotChange) => {
                this.Users = [];
                snapshotChange.forEach((doc) => {
                    this.Mage.push({
                        key: doc.id,
                        name: doc.data().name,
                        email: doc.data().email,
                    })
                });
            })
            db.collection('vampire').onSnapshot((snapshotChange) => {
                this.Users = [];
                snapshotChange.forEach((doc) => {
                    this.Vampire.push({
                        key: doc.id,
                        name: doc.data().name,
                        email: doc.data().email,
                    })
                });
            })
            
        },
        methods: {
            onFormSubmit(event) {
                event.preventDefault()
                
                if (this.selected === 'V5 - 15 Luglio') {
                    this.dbName = 'vampire'
                    this.actualCount = this.Vampire.length
                    if (this.search(this.user.email,this.Vampire)) {
                        alert ('Risulti già iscritto contatta il coordinamento per maggiori dettagli');
                        return
                    }

                }

                if (this.selected === 'Mage - 23 Luglio') {
                    this.dbName = 'mage'
                    this.actualCount = this.Mage.length
                    if (this.search(this.user.email,this.Mage)) {
                        alert ('Risulti già iscritto contatta il coordinamento per maggiori dettagli');
                        return
                    }
                }

                if (this.selected === "") {
                    alert('Seleziona uno degli eventi disponibili')
                    return
                }
                

                db.collection(this.dbName).add(this.user).then(() => {
                    this.user.name = ''
                    this.user.email = ''
                    if(this.actualCount >= 25) {
                        alert('Purtroppo non potrai partecipare a questo evento! contatta il coordinamento per venire prenotato automaticamente al prossimo!')
                    }else {
                        alert('Prenotazione raccolta con successo ci vediamo per '+this.selected)
                    }
                    this.$forceUpdate();
                }).catch((error) => {
                    console.log(error);
                });
            },
             search(nameKey, myArray){
                 for (var i=0; i < myArray.length; i++) {
                     if (myArray[i].email === nameKey) {
                         return myArray[i];
                    }
                }
            }
        }
    }
</script>