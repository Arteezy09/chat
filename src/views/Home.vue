<template>
  <b-container class="mt-5">
    <b-card-group deck>
      <b-card>
        <b-alert show variant="warning">{{ error }}</b-alert>
        <b-form @submit.prevent ="signUp" novalidate >
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              v-model="signUp.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Password:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="signUp.password"
              required
              type="password"
              placeholder="password"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary" :disabled="process">Log in</b-button>
        </b-form>
      </b-card>
      <b-card>
        <b-form @submit.prevent ="signIn">
          <b-form-group
            id="input-group-3"
            label="Email address:"
            label-for="input-3"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-3"
              v-model="signIn.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-4" label="Password:" label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="signIn.password"
              required
              type="password"
              placeholder="password"
            ></b-form-input>
          </b-form-group>



          <b-button type="submit" variant="primary">Submit</b-button>
          
        
        </b-form>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      }   
    },
    methods: {
      signUp() {
        this.$store.dispatch('SIGNUP', {email: this.signUp.email, password: this.signUp.password})
      },
      signIn() {
        this.$store.dispatch('SIGNIN', {email: this.signIn.email, password: this.signIn.password})
      },

    },
    computed: {
      userOnline() {
        return this.$store.getters.userOnline
      },
      error() {
        return this.$store.getters.getError
      },
      process() {
        return this.$store.getters.getProcess
      }
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
