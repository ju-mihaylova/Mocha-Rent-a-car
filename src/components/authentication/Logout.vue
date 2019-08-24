<template>
    <v-btn text @click="logout">
        <span class="mx-1">Log out</span>
    </v-btn>
</template>

<script>
import { userAuthService } from '@/services/userAuthService'
export default {
  mixins: [
    userAuthService
  ],

  methods: {
    logout() {
      this.logoutUser();        
    }
  }
};
</script>