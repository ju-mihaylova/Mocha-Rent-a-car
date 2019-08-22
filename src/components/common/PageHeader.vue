<template>
  <nav>
    <v-app-bar app dark class="brown">
      <router-link to="/"
        tag="v-toolbar-title" 
        class="headline toolbar-title" 
        :style="{ cursor: 'pointer'}"
      >
      <!-- <v-toolbar-title
        class="headline toolbar-title" 
      > -->
        <span class="mr-1">Mocha</span>
        <span class="font-weight-light">Rent-a-car</span>
      </router-link>
      <!-- </v-toolbar-title> -->
      <v-spacer></v-spacer>
      <template v-if="isAdmin">
        <v-btn text to="/car-data-table">
          <span class="mx-1">Cars</span>
        </v-btn>
        <v-btn text to="/booking-data-table">
          <span class="mx-1">Booking</span>
        </v-btn>
        <make-admin></make-admin>
      </template>
        <v-btn text to="/about">
          <span class="mx-1">About</span>
        </v-btn>
        <v-btn text to="/contacts">
          <span class="mx-1">Contacts</span>
        </v-btn>
        <logout v-if="isLoggedin"></logout>
        <template v-else>
          <login></login>
          <signup></signup>
        </template>
    </v-app-bar>
  </nav>
</template>

<script>
import Signup from '@/components/authentication/Signup';
import Login from '@/components/authentication/Login';
import Logout from '@/components/authentication/Logout';
import MakeAdmin from '@/components/admin/MakeAdmin'

export default {
components: {
  Login,
  Signup,
  Logout,
  MakeAdmin
},
data() {
  return {

  }
}
};
</script>

<style scoped>

</style>