<template>
  <div>
    <b-card>
      <b-alert :show="getError2" variant="warning">{{ getError2 }}</b-alert>
      <b-form @submit.prevent="signIn" novalidate>

        <b-form-group
          id="signin-group-email"
        >
          <b-form-input
            id = "signinEmail" 
            v-model = "signinEmail" 
            type = "email"
            name = "signinEmail"
            placeholder="Email"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="signin-group-password"
        >
          <b-form-input
            id = "signinPassword" 
            v-model = "signinPassword" 
            type = "password"
            name = "signinPassword"
            placeholder="Password"                    
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" :disabled="getProcess">Log in</b-button>
        <b-link class="ml-4 text-muted" @click="modalShow = !modalShow" style="font-size: 15px">Forgot your password?</b-link>

        <b-modal
          title="Enter your email"
          hide-footer
          v-model="modalShow"
        >
          <form @submit.prevent="submit" novalidate>
            <b-alert :show="getError" variant="warning">{{ getError }}</b-alert>
            <b-form-group
              label="Email"
              label-for="email-input"
            >
              <b-form-input
                id="email-input"
                v-model="email"
                type="text"
                name="email-input"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="dark" :disabled="getProcess">Send</b-button>
          </form>
        </b-modal>

      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      signinEmail: '',
      signinPassword: '',  
      modalShow: false,
      email: ''
    }   
  },
  methods: {
    signIn() {
      this.$store.dispatch('SIGNIN', {email: this.signinEmail, password: this.signinPassword})
    },
    submit() {
      this.$store.dispatch('RESET_PASSWORD', {email: this.email}).then(() => {
          if (!this.getError) {
            this.modalShow = false
          }
        }
      )
    },

    ...mapMutations({ clear: 'CLEAR_ERROR' })

  },
  computed: {
    ...mapGetters(['userOnline', 'getError', 'getError2', 'getProcess'])


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

