<template>
  <v-footer dark padless>
    <v-card flat tile class="brown white--text text-center flex">
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-spacer></v-spacer>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <v-caption><strong>Mocha</strong> Rent-a-car</v-caption>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram',
      ],
    }),
  }
</script>