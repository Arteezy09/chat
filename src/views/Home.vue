<template>
  <b-container class="mt-5">
    <b-row> 
      <b-col cols="12" sm="6" md="8" class="d-none d-md-block">
        <b-card no-body>
          <b-img src="https://firebasestorage.googleapis.com/v0/b/chat-55a5b.appspot.com/o/ok.png?alt=media&token=ba5007e1-cfe8-4318-9c86-5ab5be3fa558" fluid alt="Responsive image"></b-img>
        </b-card> 
        <b-card text-variant="black" class="mt-4">
          <b-card-text>
            This project uses <b-link href="https://vuejs.org/" class="font-weight-bolder">Vue.js</b-link>, 
            <b-link href="https://vuex.vuejs.org/" class="font-weight-bolder">Vuex</b-link>, 
            <b-link href="https://router.vuejs.org/" class="font-weight-bolder">Vue Router</b-link>, 
            <b-link href="https://firebase.google.com/" class="font-weight-bolder">Firebase</b-link>, 
            <b-link href="https://momentjs.com/" class="font-weight-bolder">Moment.js</b-link>,
            <b-link href="https://bootstrap-vue.js.org/" class="font-weight-bolder">BootstrapVue</b-link>
          </b-card-text>
          <b-button href="#" variant="dark" :disabled="getProcess">Github code</b-button>
        </b-card>
      </b-col>    
      <b-col cols="12" sm="12" md="4">
        <SignInForm></SignInForm>
        <SignUpForm class="mt-4"></SignUpForm>
      </b-col>
    </b-row>

    <hr>

    <b-row class="text-center mt-5"> 
      <b-col cols="12" sm="6" md="4">
        <span style="font-size: 45px; color: Dodgerblue; " >
          <i class="fas fa-comment-alt"></i>
        </span>
        <h5>Communicate in real time</h5>
        <p class="text-justify">To start communication with other people you must register. If you forget your password, you can retrieve it by clicking on the Forgot your password?</p>
      </b-col>
      <b-col cols="12" sm="6" md="4">
        <span style="font-size: 45px; color: Dodgerblue;">
          <i class="fas fa-cogs"></i>
        </span>
        <h5>Change account settings</h5>
        <p class="text-justify">You can change user settings, such as: password, mail, username and user photo. You can also delete a user. Before these actions you need to re-authenticate the user.</p>
      </b-col>
      <b-col cols="12" sm="6" md="4">
        <span style="font-size: 45px; color: Dodgerblue;">
          <i class="fas fa-tablet-alt"></i>
        </span>
        <h5>Communicate using any device</h5>
        <p class="text-justify">This website is optimized to work on any device: communicate from your desktop, tablet or mobile phone.</p>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import SignInForm from '@/components/SignInForm'
import SignUpForm from '@/components/SignUpForm'
import { mapGetters } from 'vuex'

export default {
  components: { 
    SignInForm,
    SignUpForm
  },
  computed: {
    ...mapGetters(['getProcess'])
  } 
}  
</script>
