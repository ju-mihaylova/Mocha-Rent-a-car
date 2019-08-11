<template>
  <v-app>
    <page-header></page-header>
    <v-content>
      <router-view></router-view>
    </v-content>
    <page-footer></page-footer>
  </v-app>
</template>

<script>
import PageHeader from '@/components/common/PageHeader'
import PageFooter from '@/components/common/PageFooter'
export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter
  },
  data: () => ({
    //
  }),
};
</script>
