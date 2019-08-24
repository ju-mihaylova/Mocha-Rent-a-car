<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
                <span class="mx-1">Log In</span>
            </v-btn>
      </template>
      <v-card ref="card">
        <v-card-title>
          <span class="headline">Log In</span>
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

            <v-text-field
              color="brown"
              type="password"
              v-model="password"
              :rules="passwordRules"
              label="Password"
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
              @click="login"
            >
              Log In
            </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>


<script>
import { userLoginService } from '@/services/userLoginService'

  export default {
    data: () => ({
      dialog: false,
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) || 'Password must be at least 8 characters long and include at least one letter and one number',
      ],
    }),
    
    mixins: [
      userLoginService
    ],

    methods: {
      cancel () {
        this.dialog = false;
        this.$refs.form.reset();
      },
      login () {
        if (!this.$refs.form.validate()) {
          this.snackbar = true;
        } else {
          this.loginUser();         
        }
      }
    },
  }
</script>
