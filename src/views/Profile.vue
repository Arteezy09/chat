<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="12" md="8" lg="6">   
        <b-card 
          :img-src="userPhoto"
          img-alt="Image"
          img-top
          title="Your profile" 
          class="mt-5"
        >
          <b-form class="mt-4">
            <b-form-group
              id="group-current-name"
              label="Your current name:"
              label-for="currentName"   
            >
              <b-form-input 
                id="currentName"
                v-model="userName" 
                type="text"
                name="currentName"
                disabled	
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="group-current-email"
              label="Your current email:"
              label-for="currentEmail"
            >
              <b-form-input
                id="currentEmail"
                v-model="userEmail" 
                type="email"
                name="currentEmail"
                disabled	
              ></b-form-input>
            </b-form-group>
          </b-form>
        </b-card>

        <b-card title="You can change the settings here" class="mt-4">
          <b-alert :show="getError" variant="warning">{{ getError }}</b-alert>
          <b-form @submit.prevent="changeUserData" class="mt-4">
            <b-form-group
              id="group-email"
              label="Enter current email"
              label-for="email"
            >
              <b-form-input
                id="email" 
                v-model="email" 
                type="email"
                name="email"
                placeholder="email"
                oninvalid="alert('The email address is badly formatted!');" 
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="group-password"
              label="Enter current password"
              label-for="password"
            >
              <b-form-input
                id="password" 
                v-model="password" 
                type="password"
                name="password"
                placeholder="password"  
                oninvalid="alert('Password should be at least 6 characters!');" 
                pattern=".{6,}"
                required                   
              ></b-form-input>
            </b-form-group>
            <b-form-radio-group id="radio" v-model="changeType" name="radio">
              <b-form-radio value="name">Name</b-form-radio>
              <b-form-radio value="email">Email</b-form-radio>
              <b-form-radio value="password">Password</b-form-radio>
              <b-form-radio value="photo">Photo</b-form-radio>
              <b-form-input 
                v-if="changeType=='name'" 
                v-model="newName" 
                type="text"
                placeholder="New name" 
                class="mt-3"
                oninvalid="alert('New name should be at least 2 characters!');" 
                pattern=".{2,}"
                required
              ></b-form-input>
              <b-form-input 
                v-if="changeType=='email'" 
                v-model="newEmail" 
                type="email"
                placeholder="New email" 
                class="mt-3"
                oninvalid="alert('The new email address is badly formatted!');" 
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
              ></b-form-input>
              <b-form-input 
                v-if="changeType=='password'" 
                v-model="newPassword" 
                type="password"
                placeholder="New password" 
                class="mt-3"
                oninvalid="alert('New password should be at least 6 characters!');" 
                pattern=".{6,}"
                required  
              ></b-form-input>
              <b-form-input 
                v-if="changeType=='photo'" 
                v-model="newPhoto" 
                type="url"
                placeholder="New photo (url)" 
                class="mt-3"
                oninvalid="alert('The new photo address is badly formatted!');" 
                pattern="https?://.+"
                required
              ></b-form-input>
            </b-form-radio-group>
            <b-button type="submit" variant="primary" class="mt-3" :disabled="getProcess">Update</b-button>
          </b-form>
        </b-card>

        <b-card title="You can delete your account here" class="mt-4">
          <b-alert :show="getError1" variant="warning">{{ getError1 }}</b-alert>
          <b-form @submit.prevent="deleteUser" class="mt-4" novalidate>
            <b-form-group
              id="group-email-delete"
              label="Enter current email"
              label-for="emailDelete"
            >
              <b-form-input
                id="emailDelete" 
                v-model="emailDelete" 
                type="email"
                name="emailDelete"
                placeholder="email"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="group-password-delete"
              label="Enter current password"
              label-for="passwordDelete"
            >
              <b-form-input
                id="passwordDelete" 
                v-model="passwordDelete" 
                type="password"
                name="passwordDelete"
                placeholder="password"                   
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="danger" class="mt-3" :disabled="getProcess">Delete</b-button>
          </b-form>
        </b-card>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      newName: '',
      newPassword: '',
      newEmail: '',
      newPhoto: '',
      changeType: 'name',
      emailDelete: '',
      passwordDelete: ''
    }   
  },
  methods: {
    changeUserData() {
      this.$store.dispatch('CHANGE_USER_PROFILE_DATA', {
          email: this.email,
          password: this.password,
          newName: this.newName,
          newPassword: this.newPassword,
          newEmail: this.newEmail,
          newPhoto: this.newPhoto,
          changeType: this.changeType
      })
      this.newName = '',
      this.newEmail = '',
      this.newPassword= '',
      this.newPhoto= ''
    },  
    deleteUser() {
      this.$store.dispatch('DELETE', {
          email: this.emailDelete,
          password: this.passwordDelete,
      })
    }
  },
  computed: {
    ...mapGetters(['userName', 'userEmail', 'getError', 'getError1', 'getProcess', 'userPhoto'])
  }
}
</script>
