<template>
    <v-btn text @click="logout">
        <span class="mx-1">Log out</span>
    </v-btn>
</template>

<script>
import { userLogoutService } from '@/services/userLogoutService'
export default {
  mixins: [
    userLogoutService
  ],

  methods: {
    logout() {
      this.logoutUser();        
    }
  }
};
</script>