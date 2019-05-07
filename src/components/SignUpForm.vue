<template>
  <b-card class="text-center" title="First time on WebChat?" sub-title="Sign up for WebChat">
    <b-alert :show="getError1" variant="warning" class="text-left">{{ getError1 }}</b-alert>
    <b-form @submit.prevent="signUp" class="text-left mt-4" novalidate>
      <b-form-group
        id="signup-group-name"
        description="Let us know your name"    
      >
        <b-form-input 
          id = "signupName" 
          v-model = "Name" 
          type = "text"
          name = "signupName"
          placeholder="Your name"  
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        id="signup-group-email"
      >
        <b-form-input
          id = "signupEmail" 
          v-model = "signupEmail" 
          type = "email"
          name = "signupEmail"
          placeholder="Enter email" 
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="signup-group-password"
      >
        <b-form-input
          id = "signupPassword" 
          v-model = "signupPassword" 
          type = "password"
          name = "signupPassword"
          placeholder="Enter password"                   
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" :disabled="getProcess">Register</b-button>
    </b-form>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      Name: '',
      signupEmail: '',
      signupPassword: ''  
    }   
  },
  methods: {
    signUp() {
      this.$store.dispatch('SIGNUP', {email: this.signupEmail, password: this.signupPassword, name: this.Name})
    }
  },
  computed: {
    ...mapGetters(['userOnline', 'getError1', 'getProcess'])

  },
  watch: {
    userOnline(val) {
      if(val === true) {
        this.$router.push('/chat')
      }
    }
  }
}
</script>
