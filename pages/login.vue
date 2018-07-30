<template lang="pug">
.container
  h1 login
  input(type='button'
        value='Login in with Google'
        @click='doLogin')
</template>
<script>
import firebase from '@/plugins/firebase'
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'login',
      'setUser'
    ]),

    doLogin () {
      this.login()
    }
  },

  async mounted () {
    let authUser = await new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
          resolve(user)
      })
    })

    // setUser is mapped action from vuex
    // strict mode is set to false to prevent vuex mutation handler error
    // @link https://vuex.vuejs.org/ja/guide/strict.html
    this.setUser(authUser)

    if (authUser) {
      this.$router.push('/')
    }
  }

}
</script>
<style scoped>
</style>