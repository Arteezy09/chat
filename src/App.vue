<template>
  <div id="app" class="bg-light">
    <Navbar/>
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  components: { 
    Navbar
  },
  name: 'App',
  data () {
    return {
      
    }
  }
}
</script>

