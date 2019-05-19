<template> 
    <b-container>
        <b-card no-body class="mt-5">
            <ul style="max-height: 70vh; overflow: auto;" v-chat-scroll>
                <li v-for="message in messages" :key="message.id" class="my-2">
                    <b-img :src="message.avatar" v-bind="mainProps" rounded="circle" alt="Circle image"></b-img>
                    <span class="ml-2 text-dark font-weight-bolder" style="font-size: 20px">{{ message.name }}</span>
                    <span class="ml-2 text-muted text-lowercase" style="font-size: 12px">{{ message.timestamp }}</span>
                    <p style="font-size: 15px">{{ message.content }}</p>
                </li>
            </ul>
        </b-card>
        <b-form @submit.prevent="NewMessage" class="mt-2">
            <b-input-group class="mt-3">
                <b-form-input 
                    id="NewMessage"
                    v-model="newMessage"
                    type="text"
                    name="NewMessage"
                    placeholder="New message"
                ></b-form-input>
                <b-input-group-append>
                    <b-button type="submit" variant="secondary">Submit</b-button> 
                </b-input-group-append>
            </b-input-group>
        </b-form>
    </b-container> 
</template>

<script>
import db from '@/main'
import moment from 'moment'
import {mapGetters} from 'vuex'

export default {
    data() {
        return {
            messages: [],
            newMessage: '',
            mainProps: {  width: 25, height: 25}          
        }
    },
    methods: {
        NewMessage(){
            if(this.newMessage){
                db.collection('messages').add({
                    content: this.newMessage,
                    name: this.userName,
                    avatar: this.userPhoto,
                    timestamp: Date.now()
                })
                this.newMessage = null
            } 
        },
        chat() {
            db.collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type == 'added'){
                        this.messages.push({
                            id: change.doc.id,
                            content: change.doc.data().content,
                            name: change.doc.data().name,
                            avatar: change.doc.data().avatar,
                            timestamp: moment(change.doc.data().timestamp).format('lll')
                        })
                    }
                })
            })      
        }
    },
    computed: {
        ...mapGetters(['userName', 'userEmail', 'userPhoto'])
    },
    created() {   
        this.chat()
    }
}
</script>