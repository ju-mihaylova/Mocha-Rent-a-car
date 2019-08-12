<template>
  <nav>
    <v-app-bar app dark class="brown">
      <router-link to="/"
      tag="v-toolbar-title" class="headline toolbar-title" :style="{ cursor: 'pointer'}">
          <span class="mr-1">Mocha</span>
          <span class="font-weight-light">Rent-a-car</span>
      </router-link>
      <v-spacer></v-spacer>
      <template v-if="isAuthorized">
        <v-btn text to="/carcreate">
          <span class="mx-1">Create Car</span>
        </v-btn>
        <v-btn text to="/logout">
          <span class="mx-1">Log out</span>
        </v-btn>
      </template>
      <template v-else>
        <v-btn text to="/about">
          <span class="mx-1">About</span>
        </v-btn>
        <v-btn text to="/contacts">
          <span class="mx-1">Contacts</span>
        </v-btn>
        <v-btn text to="/login">
          <span class="mx-1">Log in</span>
        </v-btn>
        <v-btn text to="/signup">
          <span class="mx-1">Sign Up</span>
        </v-btn>
      </template>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
data() {
  return {
    isAuthorized: false
  }
}
};
</script>

<style scoped>

</style>