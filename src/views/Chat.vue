<template> 
    <b-container>
        <b-row class="mt-2">
            <b-col cols="12" sm="5" offset-sm="2">
                <b-card no-body>
                    <ul style="max-height: 80vh; overflow: auto;" v-chat-scroll>
                        <li v-for="message in messages" :key="message.id" class="my-2">
                            <b-img :src="message.avatar" v-bind="mainProps" rounded="circle" alt="Circle image"></b-img>
                            <span class="ml-2 text-dark font-weight-bolder" style="font-size: 20px">{{ message.name }}</span>
                            <span class="ml-2 text-muted text-lowercase" style="font-size: 12px">{{ message.timestamp }}</span>
                            <p style="font-size: 15px">{{ message.content }}</p>
                        </li>
                    </ul>
                </b-card>
                <b-form @submit.prevent="NewMessage" class="mt-2">
                    <b-input-group prepend="@name" class="mt-3">
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
            </b-col> 
            <b-col cols="12" sm="3" class="d-none d-sm-block">
                <b-card no-body>
                    <b-list-group>
                        <ul style="max-height: 80vh; overflow: auto; margin-left: 0; padding-left: 0;" v-chat-scroll>
                            <li v-for="user in users" :key="user.id" style="list-style-type: none;">
                                <b-list-group-item href="#" class="flex-column align-items-start">
                                    <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Welcome!</h5>
                                    <small class="text-muted">@chat</small>
                                    </div>
                                    <p class="mb-1">{{ user.name }}</p>
                                    <small class="text-muted">{{ user.timestamp }}</small>
                                </b-list-group-item>
                            </li>
                        </ul>   
                    </b-list-group>   
                </b-card>   
            </b-col> 
        </b-row>
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
            users: [],
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
        },
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
    computed: {
        ...mapGetters(['userName', 'userEmail', 'userPhoto'])
    },
    created() {   
        this.chat()
        this.users_reg()
    }
}
</script>