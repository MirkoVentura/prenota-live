<template>
    <div class="row justify-content-center" >
        <div class="col-md-5">
            <h3 class="text-center">Prenota ora</h3>
            <p>Inserisci i tuoi dati per segnalare la tua presenza ad uno dei due live. </p>
            <form @submit.prevent="onFormSubmit">
                <label>Scegli la continuty </label>

                <div class="form-group">
                    
                    <input type="radio" id="yes" value="vampire-10" v-model="picked">
                    <label for="yes">V5</label>
                    <br />
                    <input type="radio" id="no" value="mage-10" v-model="picked">
                    <label for="no">Mage</label>
                </div>
                
                <div class="form-group">
                    <label>Nome</label>
                    <input type="text" class="form-control" v-model="user.name" required>
                </div>

                <div class="form-group">
                    <label>Cognome</label>
                    <input type="text" class="form-control" v-model="user.surname" required>
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
                picked: null,
                user: {
                   name: '',
                   email: '',
                   surname: '',
                },
                selected: '',
                dbName: '',
                actualCount: 0
            }
        },
        created() {
            db.collection('mage-10').onSnapshot((snapshotChange) => {
                this.Users = [];
                snapshotChange.forEach((doc) => {
                    this.Mage.push({
                        key: doc.id,
                        name: doc.data().name,
                        email: doc.data().email,
                        surname: doc.data().surname,
                    })
                });
            })
            db.collection('vampire-10').onSnapshot((snapshotChange) => {
                this.Users = [];
                snapshotChange.forEach((doc) => {
                    this.Vampire.push({
                        key: doc.id,
                        name: doc.data().name,
                        email: doc.data().email,
                        surname: doc.data().surname,
                    })
                });
            })
            
        },
        methods: {
            onFormSubmit(event) {
                event.preventDefault()
                
                if (this.picked === 'vampire-10') {
                    this.dbName = 'vampire-10'
                    this.selected = 'V5'
                    this.actualCount = this.Vampire.length
                    if (this.search(this.user.email,this.Vampire)) {
                        alert ('Risulti già iscritto contatta il coordinamento per maggiori dettagli');
                        return
                    }

                }

                if (this.picked === 'mage-10') {
                    this.dbName = 'mage-10'
                    this.selected = 'Mage'
                    this.actualCount = this.Mage.length
                    if (this.search(this.user.email,this.Mage)) {
                        alert ('Risulti già iscritto contatta il coordinamento per maggiori dettagli');
                        return
                    }
                }

                if (this.picked === null) {
                    alert('Seleziona uno degli eventi disponibili')
                    return
                }
                

                db.collection(this.dbName).add(this.user).then(() => {
                    this.user.name = ''
                    this.user.email = ''
                    this.user.surname = ''
                    this.picked = null
                    this.dbName = ''
                    if(this.actualCount >= 25) {
                        alert('Purtroppo non potrai partecipare a questo evento! contatta il coordinamento per venire prenotato automaticamente al prossimo!')
                    }else {
                        alert('Prenotazione raccolta con successo ci vediamo per '+this.selected)
                    }
                    this.selected = ''
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