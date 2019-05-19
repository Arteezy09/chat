<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">
      <img src="https://firebasestorage.googleapis.com/v0/b/chat-55a5b.appspot.com/o/Hangouts-Logo.png?alt=media&token=7cef1315-d2c2-45a5-bbed-da901f2f3352" v-bind="mainProps" class="d-inline-block align-top">
      WebChat
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav> 
      <b-navbar-nav class="ml-auto">
        <b-nav-item href='#' @click="chat" v-bind:class="{ invisible: !userOnline }">Chat</b-nav-item>
        <b-nav-item href='#' @click="users" v-bind:class="{ invisible: !userOnline }">Users</b-nav-item>
        <b-nav-item-dropdown right v-bind:class="{ invisible: !userOnline }" class="mr-2">
          <template slot="button-content">User</template>
          <b-dropdown-item @click="toProfile" class="text-b">Profile</b-dropdown-item>
          <b-dropdown-item @click="signout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      mainProps: {  width: 30, height: 30}
    }
  },
  computed: {
    userOnline() {
      return this.$store.getters.userOnline
    }
  },
  methods: {
    signout() {
      this.$store.dispatch('SIGNOUT')
    },
    toProfile() {
      this.$router.push('/profile')
    },
    chat() {
      this.$router.push('/chat')
    },
    users() {
      this.$router.push('/users')
    }
  },
  watch: {
    userOnline(val) {
      if(val === false) {
        this.$router.push('/')
      }
    }
  }  
}
</script>