<template>
  <nav>
    <v-app-bar app dark class="brown">
      <!-- <router-link to="/"
        tag="v-toolbar-title" 
        class="headline toolbar-title" 
        :style="{ cursor: 'pointer'}"
      > -->
      <v-toolbar-title
        class="headline toolbar-title" 
      >
        <span class="mr-1">Mocha</span>
        <span class="font-weight-light">Rent-a-car</span>
      <!-- </router-link> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <template v-if="isAuthorized"> -->
        <v-btn text to="/carcreate">
          <span class="mx-1">Create Car</span>
        </v-btn>
        <v-btn text to="/logout">
          <span class="mx-1">Log out</span>
        </v-btn>
      <!-- </template> -->
      <!-- <template v-else> -->
        <v-btn text to="/about">
          <span class="mx-1">About</span>
        </v-btn>
        <v-btn text to="/contacts">
          <span class="mx-1">Contacts</span>
        </v-btn>
        <!-- <v-btn text to="/login">
          <span class="mx-1">Log in</span>
        </v-btn> -->
        <login></login>
        <signup></signup>
      <!-- </template> -->
    </v-app-bar>
  </nav>
</template>

<script>
import Login from '@/components/authentication/Login';
import Signup from '@/components/authentication/Signup';
export default {
components: {
  Login,
  Signup
},
data() {
  return {
    isAuthorized: false
  }
}
};
</script>

<style scoped>

</style>