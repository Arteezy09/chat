<template> 
    <b-container>        
        <b-card-group columns class="mt-5">
            <b-card v-for="user in users" :key="user.id">    
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Welcome!</h5>
                    <small class="text-muted">@chat</small>
                </div>
                <p class="mb-1">{{ user.name }}</p>
                <small class="text-muted">{{ user.timestamp }}</small> 
            </b-card>
        </b-card-group>
    </b-container> 
</template>

<script>
import db from '@/main'
import moment from 'moment'

export default {
    data() {
        return {
            users: []       
        }
    },
    methods: {
        users_reg() {
            db.collection('users').orderBy('timestamp').onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type == 'added'){
                        this.users.push({
                            id: change.doc.id,
                            name: change.doc.data().name,
                            timestamp: moment(change.doc.data().timestamp).format('llll')
                        })
                    }
                })
            })   
        }
    },
    created() {   
        this.users_reg()
    }
}
</script>