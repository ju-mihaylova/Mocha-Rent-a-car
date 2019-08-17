<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
                <span class="mx-1">Sign Up</span>
            </v-btn>
      </template>
      <v-card ref="card">
        <v-card-title>
          <span class="headline">Sign Up</span>
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
              v-model="name"
              :counter="50"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

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
              @click="submit"
            >
              Submit
            </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>


<script>
import { db, auth, functions } from '@/fb'

export default {
    data: () => ({
      dialog: false,
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters',
      ],
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

    methods: {
      cancel () {
        this.dialog = false;
        this.$refs.form.reset();
      },
      submit () {
        if (!this.$refs.form.validate()) {
          this.snackbar = true;
        } else {
        // get user info
        const name = this.name;
        const email = this.email;
        const password = this.password;

        // sign up the user
        auth.createUserWithEmailAndPassword(email, password)
            .then(cred => {
                return db.collection('users').doc(cred.user.uid).set({
                    name
                });
            }).then(() => {
                this.dialog = false;
                this.$refs.form.reset();
            }).catch(err => {
                console.log(err.message);
            });
        }
      }
    },
  }
</script>