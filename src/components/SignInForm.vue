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
        <b-link class="ml-4 text-muted" v-b-modal.modal-prevent-closing style="font-size: 15px">Forgot your password?</b-link>

        <b-modal
          id="modal-prevent-closing"
          ref="modal"
          title="Enter your email"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
        >
          <b-alert :show="getError" variant="warning">{{ getError }}</b-alert>
          <form>
            <b-form-input
              id="email-input"
              v-model="email"
              placeholder="Email"
            ></b-form-input>
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
      email: ''
    }   
  },
  methods: {
    signIn() {
      this.$store.dispatch('SIGNIN', {email: this.signinEmail, password: this.signinPassword})
    },

    resetModal() {
      this.email = ''
      this.clear()
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.$store.dispatch('RESET_PASSWORD', {email: this.email})
      this.handleSubmit()
      
    },
    handleSubmit() {
      if (!this.getError) {
        return
      }
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    },

    ...mapMutations({ clear: 'CLEAR_ERROR' })

  },
  computed: {
    ...mapGetters(['userOnline', 'getError', 'getError2', 'getProcess'])
  },
  watch: {
    userOnline(val) {
      if(val === true) {
        this.$router.push('/about')
      }
    }
  }
}
</script>

