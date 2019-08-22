<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
                <span class="mx-1">Make Admin</span>
            </v-btn>
      </template>
      <v-card ref="card">
        <v-card-title>
          <span class="headline">Make Admin</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="px-3"
          >
            <v-text-field
              color="brown"
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-layout justify-end>
            <v-btn
              dark
              color="brown"
              class="mr-4 mt-5"
              @click="cancel"
            >
              Cancel
            </v-btn>

            <v-btn
              :disabled="!valid"
              class="teal white--text mt-5"
              @click="makeAdmin"
            >
              Make Admin
            </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>


<script>
import { functions } from '@/fb'

  export default {
    data: () => ({
      dialog: false,
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
    }),

    methods: {
      cancel () {
        this.dialog = false;
        this.$refs.form.reset();
      },
      makeAdmin () {
          const adminEmail = this.email;
          const addAdminRole = functions.httpsCallable('addAdminRole');
          addAdminRole({ email: adminEmail }).then(result => {
              console.log(result);
              this.dialog = false;
              this.$refs.form.reset();
          });
      }
    },
  }
</script>