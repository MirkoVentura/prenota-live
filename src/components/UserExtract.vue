<template>
    <div class="row">
        <div class="col-md-9">
            <table class="table table-striped">
                <thead>
                    <tr style="color:#fff">
                        <th>Sender mail</th>
                        <th>Secret name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in Users" :key="user.key" style="color:red">
                        <td>{{ user.sender }}</td>
                        <td>{{ user.email }}</td>
                        <td><button @click.prevent="send(user)" class="btn btn-danger">Send</button></td>
                       
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-md-3">
            <div>
                <span>Per segnalare eventuali errori o richiedere una correzione al proprio inserimento rivlgersi a <a style="color:green" href="mailto:cc.potenza@camarillaitalia.it">CC Potenza </a>  </span> 
            </div>
            <span>Ogni lamentela va fatta inviando una mail ai noti <a style="color:green" href="mailto:bulli@camarillaitalia.it">BULLI </a> </span>
        </div>
    </div>
    
</template>

<script>
    import { db } from '../firebaseDb';
    
    export default {
        data() {
            return {
                Users: []
            }
        },
        created() {
            var exceptions = [{
                sender : 'nallo458@gmail.com',
                recivers: ['nallo458@gmail.com']
            },{
                sender : 'antoniotomasco@libero.it',
                recivers: ['antoniotomasco@libero.it']
            },{
                sender : 'danilo.liscio@me.com',
                recivers: ['danilo.liscio@me.com']
            }]
            var extracted = [];
            db.collection('pentiti').onSnapshot((snapshotChange) => {
                this.Users = [];
                var allDocs = snapshotChange.docs;
                snapshotChange.forEach((doc) => {
                    var sender = doc.data().email;
                    var rand =Math.floor( Math.random() * (allDocs.length - 0));
                    console.log('rand'+rand);
                    var extract = allDocs[rand];
                    if (!extracted.includes(extract.data().email)) {
                        var result = exceptions.filter(obj => {
                            console.log(obj)
                            return obj.sender === sender});
                        console.log('result',result);
                        if(result.length > 0) {
                            if(!(result[0].recivers.includes(extract.data().email))) {
                            extracted.push(extract.data().email);
                            allDocs.splice(rand, 1);
                            }else{
                                rand =Math.floor( Math.random() * (allDocs.length - 0));
                                extract = allDocs[rand];
                                extracted.push(extract.data().email);
                                allDocs.splice((rand), 1);
                            }
                        }else{
                            extracted.push(extract.data().email);
                            allDocs.splice(rand, 1);
                        }    
                    } else{
                        rand = Math.random() * (allDocs.length - 0);
                        extract = allDocs[rand];
                        extracted.push(extract.data().email);
                        allDocs.splice(rand, 1);
                    }
                    
                    this.Users.push({
                        senderName :  doc.data().name,
                        sender : sender,
                        extractName: extract.data().name,
                        email: extract.data().email,
                        indirizzo: extract.data().indirizzo
                    })
                });
            })
        },
        methods: {
            send(user){
                var info = {
                    from: '"Secret Camarilla Santa 🎅🏾" <mirko.ventura87@gmail.com>', // sender address
                    to: user.sender, // list of receivers
                    subject: "Babbo natale segreto ✔", // Subject line
                    text: "Ciao "+user.senderName+" questa mail è per farti sapere"+
                    " che sei il babbo natale segreto di "+user.extractName+" !"+" Compragli un pensierino ed invialo a "+user.indirizzo+" BUONE SPESE!", // plain text body
                    html: "Ciao <b>"+user.senderName+"</b> questa mail è per farti sapere"+
                    " che sei il babbonatale segreto di <b>"+user.extractName+" !</b>"+" Compragli un pensierino ed invialo a <b>"+user.indirizzo+"</b>", // html body
                }
                alert ('sending for '+user.sender+' his secret '+info.text)
            }
        }
    }
</script>

<style>
    .btn-primary {
        margin-right: 12px;
    }
</style>