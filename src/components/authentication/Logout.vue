<template>
    <v-btn text @click="logout">
        <span class="mx-1">Log out</span>
    </v-btn>
</template>

<script>
import { auth } from '@/fb'
export default {
  methods: {
    logout() {
      auth.signOut();
      // this.$router.replace('/');
    }
  }
};
</script>